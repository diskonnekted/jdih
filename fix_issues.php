<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\News;
use Illuminate\Support\Str;

echo "--- Fixing Slugs ---\n";
// Find news with weird slugs or specific title
$newsItems = News::all();
foreach ($newsItems as $news) {
    if (str_contains($news->slug, "'") || str_contains($news->slug, "/") || str_contains($news->slug, "\\")) {
        echo "Found bad slug: " . $news->slug . "\n";
        $newSlug = Str::slug($news->title);
        $news->slug = $newSlug;
        $news->save();
        echo "Updated to: " . $newSlug . "\n";
    }
}

// Specifically check the "Forum Satu Data" one just in case
$forumNews = News::where('title', 'like', '%Forum Satu Data%')->first();
if ($forumNews) {
    echo "Forum News Current Slug: " . $forumNews->slug . "\n";
    $cleanSlug = Str::slug($forumNews->title);
    if ($forumNews->slug !== $cleanSlug) {
        $forumNews->slug = $cleanSlug;
        $forumNews->save();
        echo "Forum News slug forced to: " . $cleanSlug . "\n";
    }
}

echo "\n--- Checking Image File ---\n";
$imageName = "WhatsApp Image 2025-11-28 at 08.25.44 (1).webp";
$imagePath = storage_path("app/public/berita/" . $imageName);

if (file_exists($imagePath)) {
    echo "File exists at: $imagePath\n";
    echo "Permissions: " . substr(sprintf('%o', fileperms($imagePath)), -4) . "\n";
    echo "Owner: " . fileowner($imagePath) . "\n";
} else {
    echo "File DOES NOT exist at: $imagePath\n";
    
    // Check if the original exists
    $origName = "WhatsApp Image 2025-11-28 at 08.25.44 (1).jpg"; // or .jpeg
    $origPaths = [
        storage_path("app/public/berita/" . $origName),
        storage_path("app/public/berita/WhatsApp Image 2025-11-28 at 08.25.44 (1).jpeg"),
        storage_path("app/public/berita/WhatsApp Image 2025-11-28 at 08.25.44 (1).png")
    ];
    foreach($origPaths as $op) {
        if (file_exists($op)) echo "Original might be at: $op\n";
    }
}
