<?php

namespace App\Filament\Resources\GalleryItems\Schemas;

use Filament\Schemas\Schema;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\DatePicker;

class GalleryItemForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Judul Foto / Kegiatan')
                    ->required(),
                DatePicker::make('date')
                    ->label('Tanggal Kegiatan')
                    ->default(now()),
                FileUpload::make('image_path')
                    ->label('File Foto')
                    ->image()
                    ->disk('public')
                    ->directory('gallery')
                    ->required()
                    ->columnSpanFull(),
            ]);
    }
}
