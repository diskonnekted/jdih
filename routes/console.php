<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Backup database otomatis setiap hari pukul 02:00 WIB (19:00 UTC)
Schedule::command('backup:database --label=harian')
    ->dailyAt('19:00') // 02:00 WIB = 19:00 UTC
    ->timezone('UTC')
    ->withoutOverlapping()
    ->runInBackground();

// Sinkronisasi otomatis ke JDIHN Pusat setiap 6 jam (00:00, 06:00, 12:00, 18:00 WIB)
Schedule::command('jdih:sync --type=full')
    ->cron('0 */6 * * *') // Setiap 6 jam UTC
    ->timezone('Asia/Jakarta')
    ->withoutOverlapping()
    ->runInBackground();

// Sinkronisasi dokumen otomatis setiap hari pukul 03:00 WIB (20:00 UTC)
Schedule::command('jdih:sync --type=document')
    ->dailyAt('20:00') // 03:00 WIB = 20:00 UTC
    ->timezone('UTC')
    ->withoutOverlapping()
    ->runInBackground();

