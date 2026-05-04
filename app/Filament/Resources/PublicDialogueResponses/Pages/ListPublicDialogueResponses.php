<?php

namespace App\Filament\Resources\PublicDialogueResponses\Pages;

use App\Filament\Resources\PublicDialogueResponses\PublicDialogueResponseResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPublicDialogueResponses extends ListRecords
{
    protected static string $resource = PublicDialogueResponseResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
