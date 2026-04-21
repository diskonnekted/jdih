<?php

namespace App\Filament\Resources\Categories\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class CategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nama Jenis Produk Hukum')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(function (Set $set, ?string $state) {
                        $set('slug', Str::slug($state ?? ''));
                        // Auto-generate code dari huruf kapital nama
                        $words = explode(' ', $state ?? '');
                        $code = '';
                        foreach ($words as $word) {
                            if (strlen($word) > 2) {
                                $code .= strtoupper(substr($word, 0, 3));
                            }
                        }
                        $set('code', strtoupper(substr($code, 0, 10)));
                    }),
                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),
                TextInput::make('code')
                    ->label('Kode (mis: PERDA, PERBUP)')
                    ->maxLength(50),
                Textarea::make('description')
                    ->label('Deskripsi / Keterangan')
                    ->rows(3)
                    ->columnSpanFull(),
            ]);
    }
}
