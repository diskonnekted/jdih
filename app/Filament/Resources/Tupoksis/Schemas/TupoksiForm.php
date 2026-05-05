<?php

namespace App\Filament\Resources\Tupoksis\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Repeater;
use Filament\Schemas\Schema;

class TupoksiForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Textarea::make('content.tugas_pokok')
                    ->label('Tugas Pokok')
                    ->rows(4)
                    ->required()
                    ->columnSpanFull()
                    ->helperText('Uraian tugas pokok Bagian Hukum.'),

                Repeater::make('content.fungsi')
                    ->label('Fungsi Utama')
                    ->schema([
                        Textarea::make('value')
                            ->label('Uraian Fungsi')
                            ->rows(2)
                            ->required(),
                    ])
                    ->addActionLabel('+ Tambah Fungsi')
                    ->reorderable()
                    ->columnSpanFull()
                    ->helperText('Tambahkan setiap fungsi utama secara terpisah.'),
            ]);
    }
}
