<?php

namespace App\Filament\Resources\KatalogDownloads\Pages;

use App\Filament\Resources\KatalogDownloads\KatalogDownloadResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditKatalogDownload extends EditRecord
{
    protected static string $resource = KatalogDownloadResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
