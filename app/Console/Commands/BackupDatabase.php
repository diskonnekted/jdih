<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BackupDatabase extends Command
{
    protected $signature   = 'backup:database {--label= : Label/keterangan backup}';
    protected $description = 'Buat backup (snapshot) database MySQL ke storage/backups/';

    public function handle(): int
    {
        $label    = $this->option('label') ?? 'auto';
        $dbConfig = config('database.connections.mysql');
        $filename = sprintf('backup_%s_%s_%s.sql',
            $dbConfig['database'],
            now()->format('Ymd_His'),
            Str::slug($label)
        );

        $backupDir = storage_path('app/backups');
        if (!is_dir($backupDir)) mkdir($backupDir, 0755, true);
        $fullPath = $backupDir . DIRECTORY_SEPARATOR . $filename;

        // Build mysqldump command
        $host     = escapeshellarg($dbConfig['host']);
        $port     = escapeshellarg($dbConfig['port'] ?? '3306');
        $user     = escapeshellarg($dbConfig['username']);
        $password = $dbConfig['password'];
        $database = escapeshellarg($dbConfig['database']);

        $cmd = "mysqldump --host={$host} --port={$port} --user={$user}"
             . ($password ? " --password=" . escapeshellarg($password) : '')
             . " --single-transaction --routines --triggers --add-drop-table"
             . " {$database} > " . escapeshellarg($fullPath);

        $this->info("Membuat backup: {$filename}");
        exec($cmd, $output, $exitCode);

        if ($exitCode !== 0 || !file_exists($fullPath) || filesize($fullPath) < 100) {
            $this->error('Backup gagal! Pastikan mysqldump tersedia di PATH server.');
            return self::FAILURE;
        }

        // Compress ke .gz
        $gz = gzopen($fullPath . '.gz', 'wb9');
        $fh = fopen($fullPath, 'rb');
        while (!feof($fh)) gzwrite($gz, fread($fh, 524288));
        fclose($fh);
        gzclose($gz);
        unlink($fullPath); // hapus .sql mentah, simpan .gz saja

        $gzPath   = $fullPath . '.gz';
        $sizeMb   = round(filesize($gzPath) / 1024 / 1024, 2);

        // Catat activity log
        if (class_exists(\App\Models\ActivityLog::class)) {
            \App\Models\ActivityLog::log('backup', null,
                "Backup database berhasil: {$filename}.gz ({$sizeMb} MB)"
            );
        }

        // Hapus backup lebih lama dari 30 hari secara otomatis
        $this->pruneOldBackups($backupDir, 30);

        $this->info("✅ Backup selesai: {$filename}.gz ({$sizeMb} MB)");
        return self::SUCCESS;
    }

    private function pruneOldBackups(string $dir, int $days): void
    {
        $files = glob($dir . DIRECTORY_SEPARATOR . '*.gz') ?: [];
        $limit = now()->subDays($days)->timestamp;
        foreach ($files as $file) {
            if (filemtime($file) < $limit) {
                unlink($file);
                $this->line('🗑 Hapus backup lama: ' . basename($file));
            }
        }
    }
}
