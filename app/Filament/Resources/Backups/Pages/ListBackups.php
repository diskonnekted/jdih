<?php

namespace App\Filament\Resources\Backups\Pages;

use App\Filament\Resources\Backups\BackupResource;
use Filament\Resources\Pages\Page;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Artisan;

class ListBackups extends Page
{
    protected static string $resource = BackupResource::class;

    public function getView(): string
    {
        return 'filament.pages.backups';
    }

    public array $backups = [];

    public function mount(): void
    {
        $this->loadBackups();
    }

    public function loadBackups(): void
    {
        $dir   = storage_path('app/backups');
        $files = file_exists($dir) ? (glob($dir . '/*.gz') ?: []) : [];

        usort($files, fn($a, $b) => filemtime($b) - filemtime($a));

        $this->backups = array_map(function ($file) {
            $sizeMb = round(filesize($file) / 1024 / 1024, 2);
            return [
                'name'     => basename($file),
                'path'     => $file,
                'size'     => $sizeMb . ' MB',
                'created'  => date('d/m/Y H:i:s', filemtime($file)),
            ];
        }, $files);
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('create_backup')
                ->label('Buat Backup Sekarang')
                ->icon('heroicon-o-arrow-down-tray')
                ->color('success')
                ->requiresConfirmation()
                ->modalHeading('Buat Snapshot Database')
                ->modalDescription('Proses ini akan membuat backup database MySQL. Mungkin membutuhkan beberapa detik.')
                ->action(function () {
                    $exitCode = Artisan::call('backup:database', ['--label' => 'manual']);
                    if ($exitCode === 0) {
                        Notification::make()->title('✅ Backup berhasil dibuat!')->success()->send();
                        $this->loadBackups();
                    } else {
                        Notification::make()->title('❌ Backup gagal. Cek log server.')->danger()->send();
                    }
                }),
        ];
    }

    public function downloadBackup(string $name): \Symfony\Component\HttpFoundation\BinaryFileResponse
    {
        $path = storage_path('app/backups/' . $name);
        abort_unless(file_exists($path) && str_ends_with($name, '.gz'), 404);
        return response()->download($path);
    }

    public function deleteBackup(string $name): void
    {
        $path = storage_path('app/backups/' . $name);
        if (file_exists($path) && str_ends_with($name, '.gz')) {
            unlink($path);
            Notification::make()->title('Backup dihapus.')->warning()->send();
        }
        $this->loadBackups();
    }
}
