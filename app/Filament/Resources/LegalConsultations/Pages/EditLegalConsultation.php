<?php

namespace App\Filament\Resources\LegalConsultations\Pages;

use App\Filament\Resources\LegalConsultations\LegalConsultationResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditLegalConsultation extends EditRecord
{
    protected static string $resource = LegalConsultationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
