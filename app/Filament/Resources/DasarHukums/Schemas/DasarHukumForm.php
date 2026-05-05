<?php

namespace App\Filament\Resources\DasarHukums\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Repeater;
use Filament\Schemas\Schema;

class DasarHukumForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Repeater::make('content.items')
                    ->label('Daftar Dasar Hukum')
                    ->schema([
                        TextInput::make('no')
                            ->label('No')
                            ->numeric()
                            ->required()
                            ->columnSpan(1),
                        TextInput::make('peraturan')
                            ->label('Nama Peraturan')
                            ->required()
                            ->placeholder('Contoh: Peraturan Presiden Nomor 33 Tahun 2012')
                            ->columnSpan(2),
                        TextInput::make('tentang')
                            ->label('Tentang')
                            ->required()
                            ->placeholder('Contoh: Jaringan Dokumentasi dan Informasi Hukum Nasional')
                            ->columnSpan(3),
                    ])
                    ->columns(6)
                    ->addActionLabel('+ Tambah Peraturan')
                    ->reorderable()
                    ->columnSpanFull()
                    ->helperText('Tambahkan setiap peraturan yang menjadi dasar hukum JDIH.'),
            ]);
    }
}
