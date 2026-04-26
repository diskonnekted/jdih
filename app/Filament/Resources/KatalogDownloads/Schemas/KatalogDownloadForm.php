<?php

namespace App\Filament\Resources\KatalogDownloads\Schemas;

use Filament\Schemas\Schema;

class KatalogDownloadForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Forms\Components\TextInput::make('no')
                    ->label('Nomor')
                    ->required()
                    ->maxLength(255),
                \Filament\Forms\Components\TextInput::make('title')
                    ->label('Judul File')
                    ->required()
                    ->maxLength(255),
                \Filament\Forms\Components\FileUpload::make('file_path')
                    ->label('Unggah File')
                    ->directory('katalog-downloads')
                    ->preserveFilenames()
                    ->openable()
                    ->downloadable(),
            ]);
    }
}
