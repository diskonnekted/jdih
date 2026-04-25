<?php

use App\Models\LegalDocument;

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$docs = LegalDocument::all();

foreach ($docs as $doc) {
    // Fill basic metadata
    $doc->teu = 'Kabupaten Banjarnegara';
    $doc->place_of_enactment = 'Banjarnegara';
    $doc->language = 'Indonesia';
    $doc->location = 'Bagian Hukum SETDA Kabupaten Banjarnegara';
    $doc->legal_field = 'Hukum Tata Negara';
    $doc->signer = 'Pj. Bupati Banjarnegara';
    $doc->document_type = 'Peraturan Perundang-undangan';
    
    // Fill conditional data
    if (!$doc->abbreviation && $doc->category) {
        $doc->abbreviation = $doc->category->code;
    }
    
    if (!$doc->published_at) {
        $doc->published_at = now()->subDays(rand(1, 365));
    }
    
    if (!$doc->promulgated_at) {
        $doc->promulgated_at = $doc->published_at;
    }
    
    if (!$doc->source) {
        $doc->source = "Lembar Daerah Kabupaten Banjarnegara Tahun {$doc->year} Nomor {$doc->document_number}";
    }
    
    if (!$doc->status) {
        $doc->status = 'Berlaku';
    }

    $doc->save();
    echo "Synced ID {$doc->id}\n";
}

echo "Done! Synced " . $docs->count() . " documents.\n";
