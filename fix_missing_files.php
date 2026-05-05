<?php
/**
 * Script: Fix dokumen dengan file_path tercatat tapi file tidak ada di disk
 * - Set file_path = NULL
 * - Set status_note = 'File tidak tersedia di server. Sedang dalam proses digitalisasi.'
 * 
 * Run: php scratch/fix_missing_files.php
 */
require __DIR__ . '/../vendor/autoload.php';
$app = require __DIR__ . '/../bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$allDocs = \App\Models\LegalDocument::whereNotNull('file_path')->where('file_path','!=','')->get();

$fixed = 0;
$skipped = 0;

foreach($allDocs as $doc) {
    $path = storage_path('app/public/' . $doc->file_path);
    
    if (!file_exists($path)) {
        $doc->update([
            'file_path'   => null,
            'status_note' => 'File dokumen belum tersedia. Sedang dalam proses digitalisasi.',
        ]);
        $fixed++;
        echo "FIXED No.{$doc->document_number}/{$doc->year} | {$doc->file_path}" . PHP_EOL;
    } else {
        $skipped++;
    }
}

echo PHP_EOL;
echo "=== SELESAI ===" . PHP_EOL;
echo "Diperbaiki : {$fixed}" . PHP_EOL;
echo "Skip (OK)  : {$skipped}" . PHP_EOL;

// Juga perbaiki 2 dokumen yang tidak ada abstract teks
$noAbstract = \App\Models\LegalDocument::where(function($q){ $q->whereNull('abstract')->orWhere('abstract',''); })->count();
echo "Dokumen tanpa abstrak teks: {$noAbstract}" . PHP_EOL;
