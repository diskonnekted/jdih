<?php

use App\Models\LegalDocument;
use Illuminate\Support\Facades\Storage;

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$source = base_path('public/data/Permenkumham Nomor 8 Tahun 2019.pdf');

if (!file_exists($source)) {
    die("Source file not found: $source\n");
}

$docs = LegalDocument::all();

foreach ($docs as $doc) {
    $targetDir = 'legal-documents/' . $doc->year;
    
    if (!Storage::disk('public')->exists($targetDir)) {
        Storage::disk('public')->makeDirectory($targetDir);
    }
    
    $filename = 'dokumen_' . $doc->id . '.pdf';
    $targetPath = $targetDir . '/' . $filename;
    
    $fullTargetPath = storage_path('app/public/' . $targetPath);
    
    if (copy($source, $fullTargetPath)) {
        $doc->file_path = $targetPath;
        $doc->save();
        echo "Created dummy for ID {$doc->id} at {$targetPath}\n";
    } else {
        echo "Failed to copy to $fullTargetPath\n";
    }
}
