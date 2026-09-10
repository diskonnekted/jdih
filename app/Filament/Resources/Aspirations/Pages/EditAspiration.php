<?php

namespace App\Filament\Resources\Aspirations\Pages;

use App\Filament\Resources\Aspirations\AspirationResource;
use Filament\Actions\Action;
use Filament\Resources\Pages\EditRecord;

class EditAspiration extends EditRecord
{
    protected static string $resource = AspirationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Action::make('kembali')
                ->label('Kembali')
                ->url(AspirationResource::getUrl('index'))
                ->color('gray')
                ->icon('heroicon-o-arrow-left'),
        ];
    }
}
