<?php

namespace App\Filament\Resources\VisiMisis\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Repeater;
use Filament\Schemas\Schema;

class VisiMisiForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Textarea::make('content.visi')
                    ->label('Teks Visi')
                    ->rows(3)
                    ->required()
                    ->columnSpanFull()
                    ->helperText('Tuliskan teks visi lengkap, tanpa tanda kutip.'),

                Repeater::make('content.misi')
                    ->label('Butir-Butir Misi')
                    ->schema([
                        Textarea::make('value')
                            ->label('Teks Misi')
                            ->rows(2)
                            ->required(),
                    ])
                    ->addActionLabel('+ Tambah Butir Misi')
                    ->reorderable()
                    ->columnSpanFull()
                    ->helperText('Tambahkan setiap butir misi secara terpisah.'),
            ]);
    }
}
