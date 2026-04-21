<?php

namespace App\Filament\Resources\DasarHukums\Pages;

use App\Filament\Resources\DasarHukums\DasarHukumResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageDasarHukums extends ManageRecords
{
    protected static string $resource = DasarHukumResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
