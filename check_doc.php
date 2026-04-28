<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\LegalDocument;

$d = LegalDocument::find(266);
if ($d) {
    echo "ID 266 | Category: {$d->category_id} | Number: {$d->document_number} | Year: {$d->year} | Title: {$d->title}\n";
} else {
    echo "Doc 266 not found.\n";
}
