<?php

namespace App\Filament\Resources\Aspirations\Pages;

use App\Filament\Resources\Aspirations\AspirationResource;
use Filament\Actions\Action;
use Filament\Resources\Pages\ListRecords;

class ListAspirations extends ListRecords
{
    protected static string $resource = AspirationResource::class;
}
