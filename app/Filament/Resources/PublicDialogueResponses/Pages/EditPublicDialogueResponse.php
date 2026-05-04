<?php

namespace App\Filament\Resources\PublicDialogueResponses\Pages;

use App\Filament\Resources\PublicDialogueResponses\PublicDialogueResponseResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditPublicDialogueResponse extends EditRecord
{
    protected static string $resource = PublicDialogueResponseResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
