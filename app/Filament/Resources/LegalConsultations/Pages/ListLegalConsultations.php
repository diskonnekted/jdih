<?php

namespace App\Filament\Resources\LegalConsultations\Pages;

use App\Filament\Resources\LegalConsultations\LegalConsultationResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListLegalConsultations extends ListRecords
{
    protected static string $resource = LegalConsultationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
