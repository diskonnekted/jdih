<?php

namespace App\Filament\Resources\LegalConsultations\Schemas;

use Filament\Schemas\Schema;

class LegalConsultationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                \Filament\Forms\Components\TextInput::make('email')
                    ->email()
                    ->required()
                    ->maxLength(255),
                \Filament\Forms\Components\Select::make('topic')
                    ->options([
                        'perdata' => 'Hukum Perdata',
                        'pidana' => 'Hukum Pidana',
                        'tun' => 'Tata Usaha Negara',
                        'keluarga' => 'Hukum Keluarga / Waris',
                        'desa' => 'Hukum Desa',
                        'lainnya' => 'Lainnya',
                    ])
                    ->required(),
                \Filament\Forms\Components\Textarea::make('question')
                    ->required()
                    ->columnSpanFull(),
                \Filament\Forms\Components\Toggle::make('is_answered')
                    ->label('Sudah Dijawab?'),
                \Filament\Forms\Components\RichEditor::make('answer')
                    ->label('Jawaban')
                    ->columnSpanFull(),
            ]);
    }
}
