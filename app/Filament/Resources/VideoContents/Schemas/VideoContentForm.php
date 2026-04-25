<?php

namespace App\Filament\Resources\VideoContents\Schemas;

use Filament\Schemas\Schema;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;

class VideoContentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Judul Video')
                    ->required(),
                TextInput::make('video_url')
                    ->label('URL Video (Youtube/Lainnya)')
                    ->url()
                    ->required(),
                Textarea::make('description')
                    ->label('Keterangan / Deskripsi')
                    ->columnSpanFull(),
            ]);
    }
}
