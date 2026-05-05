<?php

namespace App\Filament\Resources\KedudukanAlamats\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Repeater;
use Filament\Schemas\Schema;

class KedudukanAlamatForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                // === Informasi Kontak ===
                TextInput::make('content.instansi')
                    ->label('Nama Instansi')
                    ->required()
                    ->columnSpanFull(),

                Textarea::make('content.alamat')
                    ->label('Alamat Lengkap')
                    ->rows(2)
                    ->required()
                    ->columnSpanFull(),

                TextInput::make('content.telepon')
                    ->label('Nomor Telepon')
                    ->placeholder('(0286) 591218'),

                TextInput::make('content.fax')
                    ->label('Nomor Fax')
                    ->placeholder('(0286) 591187'),

                TextInput::make('content.email')
                    ->label('Alamat Email')
                    ->email()
                    ->placeholder('jdihbanjarnegara@gmail.com')
                    ->columnSpanFull(),

                // === Jam Layanan ===
                Repeater::make('content.jam_layanan')
                    ->label('Jam Layanan')
                    ->helperText('Tambahkan jadwal layanan harian.')
                    ->schema([
                        TextInput::make('hari')
                            ->label('Hari')
                            ->required()
                            ->placeholder('Senin – Jumat'),
                        TextInput::make('jam')
                            ->label('Jam')
                            ->required()
                            ->placeholder('08.00 – 11.00 WIB'),
                    ])
                    ->columns(2)
                    ->addActionLabel('+ Tambah Jadwal')
                    ->reorderable()
                    ->columnSpanFull(),

                // === Peta Lokasi ===
                Textarea::make('content.maps_url')
                    ->label('URL Embed Google Maps')
                    ->rows(3)
                    ->columnSpanFull()
                    ->helperText('Salin URL embed dari Google Maps (isi src="..." pada iframe yang digenerate Google Maps).'),

                TextInput::make('content.maps_link')
                    ->label('Link Buka di Google Maps')
                    ->url()
                    ->columnSpanFull()
                    ->placeholder('https://maps.google.com/?q=...'),
            ]);
    }
}
