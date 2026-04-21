<?php

namespace App\Filament\Resources\JdihMembers\Pages;

use App\Filament\Resources\JdihMembers\JdihMemberResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditJdihMember extends EditRecord
{
    protected static string $resource = JdihMemberResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
