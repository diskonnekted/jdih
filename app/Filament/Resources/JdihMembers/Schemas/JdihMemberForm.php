<?php

namespace App\Filament\Resources\JdihMembers\Schemas;

use Filament\Schemas\Schema;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;

class JdihMemberForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nama Lengkap')
                    ->required(),
                TextInput::make('position')
                    ->label('Jabatan / Instansi')
                    ->required(),
                FileUpload::make('photo_path')
                    ->label('Foto Profil')
                    ->image()
                    ->disk('public')
                    ->directory('members')
                    ->required(),
            ]);
    }
}
