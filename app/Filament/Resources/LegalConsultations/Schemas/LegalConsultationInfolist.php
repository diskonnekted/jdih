<?php

namespace App\Filament\Resources\LegalConsultations\Schemas;

use Filament\Schemas\Schema;

class LegalConsultationInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Infolists\Components\TextEntry::make('name'),
                \Filament\Infolists\Components\TextEntry::make('email'),
                \Filament\Infolists\Components\TextEntry::make('topic'),
                \Filament\Infolists\Components\TextEntry::make('question')
                    ->columnSpanFull(),
                \Filament\Infolists\Components\IconEntry::make('is_answered')
                    ->boolean(),
                \Filament\Infolists\Components\TextEntry::make('answer')
                    ->html()
                    ->columnSpanFull(),
            ]);
    }
}
