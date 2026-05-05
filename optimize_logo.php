<?php
// Script optimasi logo: resize + konversi ke WebP
$src  = __DIR__ . '/public/logo_jdih.png';
$dest = __DIR__ . '/public/logo_jdih.webp';

if (!file_exists($src)) {
    die("ERROR: File $src tidak ditemukan\n");
}

// Cek ukuran asli
[$w, $h] = getimagesize($src);
echo "Ukuran asli  : {$w}x{$h}px (" . round(filesize($src)/1024) . " KB)\n";

// Target lebar maksimal untuk logo sidebar (2x untuk retina display)
$targetW = 600;
$targetH = (int)round($h * ($targetW / $w));

// Load PNG
$original = imagecreatefrompng($src);
imagealphablending($original, true);
imagesavealpha($original, true);

// Resize
$resized = imagecreatetruecolor($targetW, $targetH);
imagealphablending($resized, false);
imagesavealpha($resized, true);
$transparent = imagecolorallocatealpha($resized, 0, 0, 0, 127);
imagefilledrectangle($resized, 0, 0, $targetW, $targetH, $transparent);
imagecopyresampled($resized, $original, 0, 0, 0, 0, $targetW, $targetH, $w, $h);

// Simpan sebagai WebP (kualitas 85)
if (function_exists('imagewebp')) {
    imagewebp($resized, $dest, 85);
    echo "WebP tersimpan: $dest (" . round(filesize($dest)/1024) . " KB)\n";
} else {
    // Fallback: simpan PNG yang sudah dioptimize
    $dest = __DIR__ . '/public/logo_jdih_opt.png';
    imagepng($resized, $dest, 7); // compression level 7
    echo "PNG tersimpan : $dest (" . round(filesize($dest)/1024) . " KB)\n";
}

imagedestroy($original);
imagedestroy($resized);
echo "Selesai!\n";
