<?php

namespace App\Filament\Resources\ElectronicDocuments\Schemas;

use Filament\Schemas\Schema;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;

class ElectronicDocumentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Nama Dokumen Elektronik')
                    ->required(),
                FileUpload::make('file_path')
                    ->label('File (PDF/Lainnya)')
                    ->directory('electronic-docs')
                    ->required(),
                Textarea::make('description')
                    ->label('Keterangan')
                    ->columnSpanFull(),
            ]);
    }
}
