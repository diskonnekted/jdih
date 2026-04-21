<?php

namespace App\Filament\Resources\VideoContents\Pages;

use App\Filament\Resources\VideoContents\VideoContentResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditVideoContent extends EditRecord
{
    protected static string $resource = VideoContentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
