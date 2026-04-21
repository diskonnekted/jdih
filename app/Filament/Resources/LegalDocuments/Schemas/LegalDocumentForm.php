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
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('document_number')
                    ->label('Nomor')
                    ->required(),
                TextInput::make('year')
                    ->label('Tahun')
                    ->required()
                    ->numeric(),
                Select::make('category_id')
                    ->label('Jenis Produk Hukum')
                    ->relationship('category', 'name')
                    ->searchable()
                    ->preload()
                    ->required(),
                Select::make('status')
                    ->options([
                        'Berlaku' => 'Berlaku',
                        'Tidak Berlaku' => 'Tidak Berlaku',
                        'Dicabut' => 'Dicabut',
                        'Diubah' => 'Diubah',
                    ])
                    ->required()
                    ->default('Berlaku'),
                Textarea::make('abstract')
                    ->label('Abstrak / Ringkasan')
                    ->columnSpanFull(),
                FileUpload::make('file_path')
                    ->label('File PDF')
                    ->directory('legal-documents')
                    ->acceptedFileTypes(['application/pdf'])
                    ->maxSize(51200) // 50MB
                    ->columnSpanFull(),
                DatePicker::make('published_at')
                    ->label('Tanggal Penetapan'),
            ]);
    }
}
