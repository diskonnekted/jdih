<?php

namespace App\Filament\Resources\ElectronicDocuments\Pages;

use App\Filament\Resources\ElectronicDocuments\ElectronicDocumentResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditElectronicDocument extends EditRecord
{
    protected static string $resource = ElectronicDocumentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
