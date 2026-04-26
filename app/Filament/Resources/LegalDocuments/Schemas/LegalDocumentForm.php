<?php

namespace App\Filament\Resources\LegalDocuments\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Schema;

class LegalDocumentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Judul Produk Hukum')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('document_number')
                    ->label('Nomor')
                    ->required(),
                Select::make('year')
                    ->label('Tahun')
                    ->options(array_combine(range(date('Y'), 1945), range(date('Y'), 1945)))
                    ->searchable()
                    ->required(),
            ]);
    }
}
