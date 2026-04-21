<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Produk Hukum', \App\Models\LegalDocument::count())
                ->description('Total dokumen hukum yang terbit')
                ->descriptionIcon('heroicon-m-document-text')
                ->color('info'),
            Stat::make('Total Berita', \App\Models\News::count())
                ->description('Total berita terbaru')
                ->descriptionIcon('heroicon-m-newspaper')
                ->color('success'),
            Stat::make('Total Kategori', \App\Models\Category::count())
                ->description('Kategori produk hukum')
                ->descriptionIcon('heroicon-m-tag')
                ->color('warning'),
        ];
    }
}
