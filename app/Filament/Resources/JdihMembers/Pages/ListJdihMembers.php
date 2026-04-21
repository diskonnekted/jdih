<?php

namespace App\Filament\Resources\JdihMembers\Pages;

use App\Filament\Resources\JdihMembers\JdihMemberResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListJdihMembers extends ListRecords
{
    protected static string $resource = JdihMemberResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
