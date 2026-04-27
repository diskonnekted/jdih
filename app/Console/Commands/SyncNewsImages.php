<?php

namespace App\Console\Commands;

use App\Models\News;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class SyncNewsImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news:sync-images';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync news images from live old portal to local storage';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $allNews = News::all();
        $this->info("Starting sync for " . $allNews->count() . " news articles...");
        
        $bar = $this->output->createProgressBar($allNews->count());
        $bar->start();

        // Ensure directory exists
        if (!Storage::disk('public')->exists('berita')) {
            Storage::disk('public')->makeDirectory('berita');
        }

        foreach ($allNews as $news) {
            if (!$news->slug) {
                $bar->advance();
                continue;
            }

            $url = "https://jdih.banjarnegarakab.go.id/artikel/detail/" . $news->slug;
            try {
                $response = Http::timeout(10)->get($url);
                if ($response->successful()) {
                    $html = $response->body();
                    
                    // Robust regex for old site structure
                    if (preg_match('/<img[^>]+src="([^"]*berita\/([^"]+))"/i', $html, $matches)) {
                        $imgUrl = $matches[1];
                        $filename = $matches[2];
                        
                        // Handle relative URLs
                        if (strpos($imgUrl, 'http') !== 0) {
                            $imgUrl = "https://jdih.banjarnegarakab.go.id/" . ltrim($imgUrl, '/');
                        }
                        
                        // Handle spaces in URLs
                        $imgUrl = str_replace(' ', '%20', $imgUrl);
                        
                        $imgResponse = Http::timeout(10)->get($imgUrl);
                        if ($imgResponse->successful()) {
                            $path = "berita/" . $filename;
                            Storage::disk('public')->put($path, $imgResponse->body());
                            
                            $news->image = $path;
                            $news->save();
                        }
                    }
                }
            } catch (\Exception $e) {
                // Silently skip
            }
            $bar->advance();
        }

        $bar->finish();
        $this->info("\nSync completed!");
        
        // Ensure symlink exists
        if (!file_exists(public_path('storage'))) {
            $this->call('storage:link');
        }
    }
}
