<?php

namespace App\Filament\Resources\LegalDecisions\Pages;

use App\Filament\Resources\LegalDecisions\LegalDecisionResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListLegalDecisions extends ListRecords
{
    protected static string $resource = LegalDecisionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
