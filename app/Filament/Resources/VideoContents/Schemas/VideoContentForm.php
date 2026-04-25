<?php

namespace App\Filament\Resources\VideoContents\Schemas;

use Filament\Schemas\Schema;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;

class VideoContentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Judul Video')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('video_url')
                    ->label('URL Video')
                    ->url()
                    ->required(),
                FileUpload::make('thumbnail_path')
                    ->label('Cover / Thumbnail')
                    ->image()
                    ->disk('public')
                    ->visibility('public')
                    ->directory('covers'),
                Select::make('platform')
                    ->options([
                        'TikTok' => 'TikTok',
                        'Instagram' => 'Instagram',
                        'Youtube' => 'Youtube',
                    ])
                    ->default('TikTok'),
                TextInput::make('duration')
                    ->label('Durasi (Contoh: 1:30)')
                    ->placeholder('1:30'),
                TextInput::make('year')
                    ->label('Tahun')
                    ->numeric()
                    ->default(date('Y')),
                Textarea::make('description')
                    ->label('Keterangan / Deskripsi')
                    ->columnSpanFull(),
            ]);
    }
}
