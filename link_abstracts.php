<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\LegalDocument;
use Illuminate\Support\Facades\File;

$abstrakDir = public_path('produk_hukum/abstrak');
if (!is_dir($abstrakDir)) {
    die("Directory not found: $abstrakDir\n");
}

$files = File::files($abstrakDir);
echo "Found " . count($files) . " abstract files.\n";

$categoryMap = [
    'perda' => 1,
    'perbup' => 2,
    'kepbup' => 3,
    'se' => 4, // Surat Edaran
    'instruksi' => 5, // Instruksi Bupati
    'naskah' => 7, // Naskah Akademik
    'raperda' => 9,
    'ranham' => 11,
    'risalah' => 12,
    'pks' => 15, // Kerja Sama Daerah
];

$linkedCount = 0;

foreach ($files as $file) {
    $filename = $file->getFilename();
    
    // Pattern: abstrak_{type}_{number}_th_{year}.pdf
    if (preg_match('/abstrak_([^_]+)_(\d+)_th_(\d+)\.pdf/i', $filename, $matches)) {
        $typeStr = strtolower($matches[1]);
        $number = (int)$matches[2];
        $year = $matches[3];
        
        $categoryId = $categoryMap[$typeStr] ?? null;
        
        if ($categoryId) {
            $doc = LegalDocument::where('document_number', $number)
                ->where('year', $year)
                ->where('category_id', $categoryId)
                ->first();
                
            if ($doc) {
                $relativePath = 'produk_hukum/abstrak/' . $filename;
                
                // Only update if it's empty or pointing to a non-existent file
                if (empty($doc->abstract_file_path) || !file_exists(public_path($doc->abstract_file_path))) {
                    $doc->abstract_file_path = $relativePath;
                    $doc->save();
                    $linkedCount++;
                    echo "Linked $filename to Doc ID: {$doc->id} ({$doc->title})\n";
                }
            }
        }
    }
}

echo "Done! Linked $linkedCount abstracts.\n";
