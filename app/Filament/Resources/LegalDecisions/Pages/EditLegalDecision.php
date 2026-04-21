<?php

namespace App\Filament\Resources\LegalDecisions\Pages;

use App\Filament\Resources\LegalDecisions\LegalDecisionResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditLegalDecision extends EditRecord
{
    protected static string $resource = LegalDecisionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
