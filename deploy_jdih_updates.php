<?php
/**
 * JDIH Banjarnegara - Production Deployment Utility
 * This script synchronizes file structures and populates missing abstract data.
 * Run this on the server after 'git pull' and 'composer install'.
 */

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\LegalDocument;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Smalot\PdfParser\Parser;

echo "--- JDIH DEPLOYMENT UTILITY ---\n\n";

// STEP 1: Move files from public to storage if they exist
$publicPath = base_path('public/produk_hukum');
$storagePath = storage_path('app/public/produk_hukum');

if (is_dir($publicPath)) {
    echo "1. Moving files from public to storage...\n";
    if (!is_dir($storagePath)) mkdir($storagePath, 0755, true);
    
    function moveRecursive($src, $dst) {
        if (!is_dir($src)) return;
        $dir = opendir($src);
        if (!is_dir($dst)) mkdir($dst, 0755, true);
        while(false !== ( $file = readdir($dir)) ) {
            if (( $file != '.' ) && ( $file != '..' )) {
                if ( is_dir($src . '/' . $file) ) {
                    moveRecursive($src . '/' . $file, $dst . '/' . $file);
                } else {
                    if (!file_exists($dst . '/' . $file)) {
                        rename($src . '/' . $file, $dst . '/' . $file);
                    } else {
                        unlink($src . '/' . $file); // Already exists in dest
                    }
                }
            }
        }
        closedir($dir);
        @rmdir($src);
    }
    moveRecursive($publicPath, $storagePath);
    echo "Done.\n\n";
}

// STEP 2: Migrate database paths to year-based structure
echo "2. Migrating database paths to year-based structure...\n";
$docs = LegalDocument::all();
$movedCount = 0;
foreach ($docs as $doc) {
    $fields = ['file_path', 'abstract_file_path'];
    foreach ($fields as $field) {
        $currentPath = $doc->$field;
        if (!$currentPath) continue;

        $filename = basename($currentPath);
        $year = $doc->year ?: date('Y');
        $correctPath = "produk_hukum/{$year}/{$filename}";

        if ($currentPath === $correctPath) continue;

        $sourcePath = null;
        if (Storage::disk('public')->exists($currentPath)) {
            $sourcePath = Storage::disk('public')->path($currentPath);
        }

        if ($sourcePath) {
            Storage::disk('public')->makeDirectory("produk_hukum/{$year}");
            $destPath = Storage::disk('public')->path($correctPath);
            if ($sourcePath !== $destPath) {
                if (!File::exists($destPath)) File::move($sourcePath, $destPath);
            }
            $doc->$field = $correctPath;
            $doc->save();
            $movedCount++;
        }
    }
}
echo "Migrated $movedCount records.\n\n";

// STEP 3: Populate abstracts from PDF
echo "3. Populating abstracts from PDF files...\n";
$parser = new Parser();
$abstractDocs = LegalDocument::where(function($q) {
    $q->whereNull('abstract')->orWhere('abstract', '');
})->whereNotNull('abstract_file_path')->get();

$absCount = 0;
foreach ($abstractDocs as $doc) {
    $path = storage_path('app/public/' . $doc->abstract_file_path);
    if (file_exists($path)) {
        try {
            $pdf = $parser->parseFile($path);
            $text = trim($pdf->getText());
            if ($text) {
                $doc->abstract = "<div>" . nl2br(e($text)) . "</div>";
                $doc->save();
                $absCount++;
            }
        } catch (\Exception $e) {}
    }
}
echo "Populated $absCount abstracts from PDFs.\n\n";

// STEP 4: Generate missing abstracts
echo "4. Generating fallback abstracts for remaining documents...\n";
$missingDocs = LegalDocument::where(function($q) {
    $q->whereNull('abstract')->orWhere('abstract', '');
})->with('category')->get();

$genCount = 0;
foreach ($missingDocs as $doc) {
    $catName = $doc->category ? $doc->category->name : 'Dokumen Hukum';
    $num = $doc->document_number ?: '-';
    $year = $doc->year ?: '-';
    
    if (stripos($catName, 'Kerja Sama') !== false || stripos($catName, 'PKS') !== false) {
        $text = "Dokumen ini merupakan {$catName} tentang {$doc->title}.";
    } else {
        $text = "Dokumen ini merupakan {$catName} Kabupaten Banjarnegara Nomor {$num} Tahun {$year} tentang {$doc->title}.";
    }
    
    $doc->abstract = "<div><p>{$text}</p></div>";
    $doc->save();
    $genCount++;
}
echo "Generated $genCount fallback abstracts.\n\n";

echo "--- DEPLOYMENT COMPLETED SUCCESSFULLY ---\n";
