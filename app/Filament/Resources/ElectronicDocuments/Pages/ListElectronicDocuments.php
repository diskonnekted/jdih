<?php

namespace App\Filament\Resources\ElectronicDocuments\Pages;

use App\Filament\Resources\ElectronicDocuments\ElectronicDocumentResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListElectronicDocuments extends ListRecords
{
    protected static string $resource = ElectronicDocumentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
