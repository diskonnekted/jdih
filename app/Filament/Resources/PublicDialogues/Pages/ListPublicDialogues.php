<?php

namespace App\Filament\Resources\PublicDialogues\Pages;

use App\Filament\Resources\PublicDialogues\PublicDialogueResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPublicDialogues extends ListRecords
{
    protected static string $resource = PublicDialogueResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
