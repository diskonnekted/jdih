<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends StatsOverviewWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $totalDocs = \App\Models\LegalDocument::count();
        $totalNews = \App\Models\News::count();
        $totalCategories = \App\Models\Category::count();
        $totalBanners = \App\Models\Banner::where('is_active', true)->count();
        $totalMembers = \App\Models\JdihMember::count();
        $totalDownloads = \App\Models\DownloadItem::count();

        return [
            Stat::make('Total Produk Hukum', number_format($totalDocs))
                ->description('Dokumen hukum tercatat')
                ->descriptionIcon('heroicon-m-document-text')
                ->color('success')
                ->chart([7, 3, 4, 5, 6, 3, 5])
                ->chartColor('success')
                ->extraAttributes(['class' => 'stat-card stat-card--docs']),
            Stat::make('Total Berita', number_format($totalNews))
                ->description('Berita & artikel terbit')
                ->descriptionIcon('heroicon-m-newspaper')
                ->color('info')
                ->chart([3, 5, 2, 7, 4, 6, 5])
                ->chartColor('info')
                ->extraAttributes(['class' => 'stat-card stat-card--news']),
            Stat::make('Jenis Produk Hukum', number_format($totalCategories))
                ->description('Kategori peraturan')
                ->descriptionIcon('heroicon-m-tag')
                ->color('warning')
                ->chart([2, 3, 4, 5, 4, 3, 5])
                ->chartColor('warning')
                ->extraAttributes(['class' => 'stat-card stat-card--categories']),
            Stat::make('Banner Aktif', number_format($totalBanners))
                ->description('Banner hero aktif')
                ->descriptionIcon('heroicon-m-photo')
                ->color('danger')
                ->chart([1, 1, 2, 1, 2, 1, 1])
                ->chartColor('danger')
                ->extraAttributes(['class' => 'stat-card stat-card--banners']),
            Stat::make('Anggota JDIH', number_format($totalMembers))
                ->description('Anggota terdaftar')
                ->descriptionIcon('heroicon-m-users')
                ->color('success')
                ->chart([4, 5, 6, 7, 6, 8, 9])
                ->chartColor('success')
                ->extraAttributes(['class' => 'stat-card stat-card--members']),
            Stat::make('Total Unduhan', number_format($totalDownloads))
                ->description('File dapat diunduh')
                ->descriptionIcon('heroicon-m-arrow-down-tray')
                ->color('info')
                ->chart([5, 3, 4, 6, 5, 7, 8])
                ->chartColor('info')
                ->extraAttributes(['class' => 'stat-card stat-card--downloads']),
        ];
    }
}
