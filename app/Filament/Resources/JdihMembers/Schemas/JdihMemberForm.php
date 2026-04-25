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
                    ->label('Nama Lengkap / Instansi')
                    ->required(),
                TextInput::make('category')
                    ->label('Kategori')
                    ->placeholder('e.g. Perangkat Daerah, Legislatif, Kabupaten/Kota'),
                TextInput::make('url')
                    ->label('Website URL')
                    ->url(),
                TextInput::make('position')
                    ->label('Jabatan')
                    ->helperText('Hanya untuk profil staf'),
                FileUpload::make('photo_path')
                    ->label('Foto Profil')
                    ->image()
                    ->disk('public')
                    ->directory('members')
                    ->helperText('Hanya untuk profil staf'),
            ]);
    }
}
