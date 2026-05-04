<?php

namespace App\Filament\Resources\PublicDialogueResponses\Pages;

use App\Filament\Resources\PublicDialogueResponses\PublicDialogueResponseResource;
use Filament\Resources\Pages\CreateRecord;

class CreatePublicDialogueResponse extends CreateRecord
{
    protected static string $resource = PublicDialogueResponseResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
