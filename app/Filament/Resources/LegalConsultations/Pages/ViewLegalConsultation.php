<?php

namespace App\Filament\Resources\LegalConsultations\Pages;

use App\Filament\Resources\LegalConsultations\LegalConsultationResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewLegalConsultation extends ViewRecord
{
    protected static string $resource = LegalConsultationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
