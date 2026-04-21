<?php

namespace App\Filament\Resources\KedudukanAlamats\Pages;

use App\Filament\Resources\KedudukanAlamats\KedudukanAlamatResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageKedudukanAlamats extends ManageRecords
{
    protected static string $resource = KedudukanAlamatResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
