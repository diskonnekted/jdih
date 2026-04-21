<?php

namespace App\Filament\Resources\KatalogDownloads\Pages;

use App\Filament\Resources\KatalogDownloads\KatalogDownloadResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListKatalogDownloads extends ListRecords
{
    protected static string $resource = KatalogDownloadResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
