<?php

namespace App\Filament\Resources\PublicDialogues\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Utilities\Set;
use Illuminate\Support\Str;

class PublicDialogueForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Judul Dialog / Rancangan')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state ?? '')))
                    ->columnSpanFull(),
                
                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true),
                
                Select::make('document_type')
                    ->label('Jenis Dokumen')
                    ->options([
                        'Raperda' => 'Rancangan Peraturan Daerah (Raperda)',
                        'Raperbup' => 'Rancangan Peraturan Bupati (Raperbup)',
                        'Draft' => 'Draft Lainnya',
                    ])
                    ->required(),
                
                TextInput::make('year')
                    ->label('Tahun')
                    ->numeric()
                    ->default(date('Y')),
                
                Textarea::make('description')
                    ->label('Keterangan / Ringkasan')
                    ->rows(3)
                    ->columnSpanFull(),
                
                FileUpload::make('file_path')
                    ->label('Upload Draft Dokumen (PDF)')
                    ->acceptedFileTypes(['application/pdf'])
                    ->disk('public')
                    ->directory('dialog-publik')
                    ->preserveFilenames()
                    ->required()
                    ->columnSpanFull(),
                
                Toggle::make('is_active')
                    ->label('Status Aktif')
                    ->default(true),
            ]);
    }
}
