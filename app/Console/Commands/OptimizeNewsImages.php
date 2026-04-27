<?php

namespace App\Console\Commands;

use App\Models\News;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class OptimizeNewsImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news:optimize-images';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Optimize news images (resize and compress)';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $directory = 'berita';
        $files = Storage::disk('public')->files($directory);
        
        $this->info("Optimizing " . count($files) . " images in storage/app/public/berita...");
        $bar = $this->output->createProgressBar(count($files));
        $bar->start();

        foreach ($files as $file) {
            $fullPath = Storage::disk('public')->path($file);
            $extension = strtolower(pathinfo($fullPath, PATHINFO_EXTENSION));
            
            // Skip non-image files
            if (!in_array($extension, ['jpg', 'jpeg', 'png', 'webp'])) {
                $bar->advance();
                continue;
            }

            try {
                // Detect image type more reliably
                $imageInfo = @getimagesize($fullPath);
                if (!$imageInfo) {
                    $bar->advance();
                    continue;
                }

                $image = null;
                switch ($imageInfo[2]) {
                    case IMAGETYPE_JPEG:
                        $image = @imagecreatefromjpeg($fullPath);
                        break;
                    case IMAGETYPE_PNG:
                        $image = @imagecreatefrompng($fullPath);
                        if ($image) imagepalettetotruecolor($image);
                        break;
                    case IMAGETYPE_WEBP:
                        $image = @imagecreatefromwebp($fullPath);
                        break;
                }

                if (!$image) {
                    $bar->advance();
                    continue;
                }

                // Get original dimensions
                $origWidth = imagesx($image);
                $origHeight = imagesy($image);
                $maxWidth = 1200;

                // Resize if wider than maxWidth
                if ($origWidth > $maxWidth) {
                    $newWidth = $maxWidth;
                    $newHeight = (int)($origHeight * ($maxWidth / $origWidth));
                    
                    $newImage = imagecreatetruecolor($newWidth, $newHeight);
                    
                    // Handle transparency for PNG/WebP
                    imagealphablending($newImage, false);
                    imagesavealpha($newImage, true);
                    
                    imagecopyresampled($newImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $origWidth, $origHeight);
                    imagedestroy($image);
                    $image = $newImage;
                }

                // Prepare new filename (convert everything to .webp for consistency and size)
                $newFilename = pathinfo($file, PATHINFO_FILENAME) . '.webp';
                $newPath = $directory . '/' . $newFilename;
                $newFullPath = Storage::disk('public')->path($newPath);

                // Save as WebP with 75% quality
                imagewebp($image, $newFullPath, 75);
                imagedestroy($image);

                // If extension changed, delete old file and update DB
                if ($newPath !== $file) {
                    Storage::disk('public')->delete($file);
                    
                    // Update database records that point to the old file
                    News::where('image', $file)->update(['image' => $newPath]);
                }
            } catch (\Exception $e) {
                // Skip on error
            }
            
            $bar->advance();
        }

        $bar->finish();
        $this->info("\nOptimization completed! All images are now in WebP format and resized to max 1200px width.");
    }
}
