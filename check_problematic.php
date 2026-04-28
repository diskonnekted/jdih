<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\Http;

$slugs = [
    'infografis-peraturan-daerah-nomor-8-tahun-2025',
    'study-referensi-pelaksanaan-tugas-temanggung',
    'mou-kejaksaan-negeri-pidana-kerja-sosial',
    'forum-satu-data-indonesia-banjarnegara'
];

foreach ($slugs as $slug) {
    $url = "https://jdih.banjarnegarakab.go.id/artikel/detail/" . $slug;
    echo "\nChecking $slug...\n";
    $response = Http::get($url);
    if ($response->successful()) {
        $html = $response->body();
        preg_match_all('/<img[^>]+src="([^"]+)"/i', $html, $matches);
        print_r($matches[1]);
    } else {
        echo "Failed to fetch $url (Status: " . $response->status() . ")\n";
    }
}
