<?php

namespace App\Filament\Resources\PublicDialogueResponses\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Placeholder;
use Filament\Schemas\Schema;

class PublicDialogueResponseForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('public_dialogue_id')
                    ->label('Topik Dialog')
                    ->relationship('dialogue', 'title')
                    ->disabled()
                    ->required(),
                
                TextInput::make('full_name')
                    ->label('Nama Pengirim')
                    ->disabled()
                    ->required(),
                
                TextInput::make('email')
                    ->label('Email')
                    ->email()
                    ->disabled()
                    ->required(),
                
                Textarea::make('suggestion')
                    ->label('Saran / Aspirasi')
                    ->disabled()
                    ->rows(5)
                    ->columnSpanFull(),
                
                Textarea::make('admin_response')
                    ->label('Tanggapan Admin')
                    ->placeholder('Tulis tanggapan resmi di sini...')
                    ->rows(5)
                    ->columnSpanFull(),
                
                Select::make('status')
                    ->label('Status Moderasi')
                    ->options([
                        'pending' => 'Pending (Menunggu)',
                        'approved' => 'Disetujui (Tampil di Publik)',
                        'hidden' => 'Disembunyikan',
                    ])
                    ->default('pending')
                    ->required(),
            ]);
    }
}
