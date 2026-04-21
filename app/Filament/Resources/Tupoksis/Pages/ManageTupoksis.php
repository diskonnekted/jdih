<?php

namespace App\Filament\Resources\Tupoksis\Pages;

use App\Filament\Resources\Tupoksis\TupoksiResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageTupoksis extends ManageRecords
{
    protected static string $resource = TupoksiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
