<?php

namespace App\Filament\Resources\Banners\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Grid;

class BannerForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('subtitle')
                    ->label('Teks Kecil (Subtitle)')
                    ->placeholder('Misal: Jaringan Dokumentasi & Informasi Hukum')
                    ->maxLength(255),

                TextInput::make('title')
                    ->label('Judul Utama (Headline)')
                    ->placeholder('Misal: Portal Produk Hukum Kabupaten Banjarnegara')
                    ->required()
                    ->maxLength(255),

                Textarea::make('description')
                    ->label('Deskripsi')
                    ->placeholder('Akses mudah ke database Peraturan Daerah...')
                    ->rows(3),
                
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

                Grid::make(3)
                    ->schema([
                        TextInput::make('sort_order')
                            ->label('Urutan Slider')
                            ->numeric()
                            ->default(0)
                            ->required(),
                        
                        Toggle::make('show_stats')
                            ->label('Tampilkan Statistik')
                            ->default(true),

                        Toggle::make('is_active')
                            ->label('Banner Aktif')
                            ->default(true),
                    ]),
            ]);
    }
}
