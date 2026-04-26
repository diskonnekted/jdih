<?php

namespace App\Filament\Resources\DownloadItems\Schemas;

use Filament\Schemas\Schema;

class DownloadItemForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Forms\Components\TextInput::make('title')
                    ->label('Judul')
                    ->required()
                    ->maxLength(255),
                \Filament\Forms\Components\TextInput::make('category')
                    ->label('Kategori')
                    ->maxLength(255),
                \Filament\Forms\Components\FileUpload::make('file_path')
                    ->label('File')
                    ->directory('downloads')
                    ->required()
                    ->preserveFilenames()
                    ->openable()
                    ->downloadable(),
            ]);
    }
}
