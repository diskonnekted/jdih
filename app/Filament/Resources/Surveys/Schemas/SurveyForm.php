<?php

namespace App\Filament\Resources\Surveys\Schemas;

use Filament\Schemas\Schema;

class SurveyForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Forms\Components\TextInput::make('name')
                    ->label('Nama Survey')
                    ->required()
                    ->placeholder('Misal: Survey Kepuasan Masyarakat 2026'),
                \Filament\Forms\Components\TextInput::make('url')
                    ->label('Link URL Survey (Google Form/Lainnya)')
                    ->required()
                    ->url()
                    ->placeholder('https://forms.gle/...'),
                \Filament\Forms\Components\Toggle::make('is_active')
                    ->label('Status Aktif')
                    ->default(true),
            ]);
    }
}
