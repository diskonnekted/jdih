<?php

namespace App\Filament\Resources\Banners\Schemas;

use Filament\Schemas\Schema;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Toggle;

class BannerForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Judul / Deskripsi')
                    ->required()
                    ->maxLength(255),
                
                FileUpload::make('image_path')
                    ->label('Gambar Utama (Hero)')
                    ->image()
                    ->disk('public')
                    ->directory('slider')
                    ->preserveFilenames()
                    ->imageResizeMode('cover')
                    ->imageResizeTargetWidth('1920')
                    ->imageResizeTargetHeight('1080')
                    ->required(),
                
                TextInput::make('url')
                    ->label('Tautan (Opsional)')
                    ->url()
                    ->maxLength(255),

                TextInput::make('sort_order')
                    ->label('Urutan Slider')
                    ->numeric()
                    ->default(0)
                    ->required(),
                
                Toggle::make('is_active')
                    ->label('Jadikan Banner Aktif')
                    ->default(true),
            ]);
    }
}
