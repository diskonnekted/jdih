<?php

namespace App\Filament\Resources\Infographics\Schemas;

use Filament\Schemas\Schema;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;

class InfographicForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Infografis')
                    ->schema([
                        TextInput::make('title')
                            ->label('Judul Infografis')
                            ->required()
                            ->columnSpanFull(),
                        FileUpload::make('image_path')
                            ->label('File Gambar')
                            ->image()
                            ->disk('public')
                            ->directory('infographics')
                            ->imageResizeMode('cover')
                            ->imageResizeTargetWidth('1200')
                            ->required(),
                        TextInput::make('sort_order')
                            ->label('Urutan Tampil')
                            ->numeric()
                            ->default(0),
                        Toggle::make('is_active')
                            ->label('Status Aktif')
                            ->default(true),
                    ])->columns(2)
            ]);
    }
}
