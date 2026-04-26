<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$colors = ['#0d9488', '#3b82f6', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444'];
$jenisCounts = [
    ['name' => 'A', 'jumlah' => 10],
    ['name' => 'B', 'jumlah' => 20],
    ['name' => 'C', 'jumlah' => 5],
];

$dataPie = collect($jenisCounts)->sortByDesc('jumlah')->take(5)->values()->map(function($item, $index) use ($colors) {
    return [
        'name' => $item['name'],
        'value' => $item['jumlah'],
        'color' => $colors[$index % count($colors)],
        'index_was' => $index,
    ];
})->toArray();

print_r($dataPie);
