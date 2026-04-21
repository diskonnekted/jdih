<?php

namespace App\Filament\Resources\News\Schemas;

use Filament\Schemas\Schema;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Set;
use Illuminate\Support\Str;

class NewsForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Judul Berita')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state ?? ''))),
                
                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true),
                
                Select::make('category')
                    ->label('Kategori')
                    ->options([
                        'Berita' => 'Berita',
                        'Infografis' => 'Infografis',
                        'Kegiatan' => 'Kegiatan',
                        'Kerja Sama' => 'Kerja Sama',
                        'Forum' => 'Forum',
                        'Pengumuman' => 'Pengumuman',
                    ])
                    ->required(),
                
                FileUpload::make('image')
                    ->label('Gambar Utama')
                    ->image()
                    ->directory('news-images')
                    ->nullable(),
                
                RichEditor::make('content')
                    ->label('Konten Berita')
                    ->nullable()
                    ->columnSpanFull(),
                
                DateTimePicker::make('published_at')
                    ->label('Tanggal Publikasi')
                    ->default(now()),
                
                Select::make('status')
                    ->label('Status')
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Dipublikasikan',
                        'archived' => 'Diarsipkan',
                    ])
                    ->default('published')
                    ->required(),
            ]);
    }
}
