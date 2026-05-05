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

