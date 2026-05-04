<?php

namespace App\Filament\Resources\PublicDialogues\Pages;

use App\Filament\Resources\PublicDialogues\PublicDialogueResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditPublicDialogue extends EditRecord
{
    protected static string $resource = PublicDialogueResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
