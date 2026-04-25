<?php

namespace App\Filament\Resources\Sops\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Schema;

class SopForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                RichEditor::make('content')
                    ->required()
                    ->columnSpanFull(),
                FileUpload::make('image_path')
                    ->label('Dokumen SOP (Gambar/PDF)')
                    ->directory('profil')
                    ->image()
                    ->columnSpanFull(),
            ]);
    }
}
