<?php

$files = [
    'storage/app/public/infographics/flow.png',
    'storage/app/public/infographics/stats.png',
    'storage/app/public/infographics/vision.png'
];

foreach ($files as $file) {
    if (file_exists($file)) {
        echo "Processing $file (as JPEG)...\n";
        $image = imagecreatefromjpeg($file);
        if ($image) {
            // Save as JPEG with 70% quality to reduce size significantly
            // Even though extension is .png, we save it as JPEG internally
            imagejpeg($image, $file, 70);
            echo "Compressed $file. New size: " . filesize($file) . " bytes\n";
            imagedestroy($image);
        } else {
            echo "Failed to create image from $file\n";
        }
    } else {
        echo "File $file not found.\n";
    }
}
