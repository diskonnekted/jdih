<?php

namespace App\Filament\Resources\Sops\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Schema;

class SopForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Repeater::make('content.groups')
                    ->label('Daftar SOP')
                    ->helperText('Tambahkan setiap SOP beserta halaman gambarnya.')
                    ->schema([
                        TextInput::make('nomorSop')
                            ->label('Nomor SOP')
                            ->required()
                            ->placeholder('100.3.8/32/Setda/2024')
                            ->columnSpan(2),
                        TextInput::make('namaSop')
                            ->label('Nama SOP')
                            ->required()
                            ->placeholder('Layanan Perpustakaan JDIH')
                            ->columnSpan(2),
                        TextInput::make('tanggalPengesahan')
                            ->label('Tanggal Pengesahan')
                            ->placeholder('31 Desember 2024')
                            ->columnSpan(1),
                        TextInput::make('disahkanOleh')
                            ->label('Disahkan Oleh')
                            ->placeholder('Kepala Bagian Hukum')
                            ->columnSpan(1),
                        Textarea::make('tujuan')
                            ->label('Tujuan / Peringatan')
                            ->rows(3)
                            ->required()
                            ->columnSpanFull(),

                        Repeater::make('pages')
                            ->label('Halaman SOP (Gambar)')
                            ->schema([
                                TextInput::make('src')
                                    ->label('Path Gambar')
                                    ->required()
                                    ->placeholder('/images/SOP_JDIH_001.webp')
                                    ->helperText('Path relatif dari public/, atau upload ke storage dan isi path-nya.'),
                                TextInput::make('label')
                                    ->label('Keterangan Halaman')
                                    ->placeholder('Halaman 1 – Prosedur Peminjaman'),
                            ])
                            ->columns(1)
                            ->addActionLabel('+ Tambah Halaman Gambar')
                            ->reorderable()
                            ->columnSpanFull()
                            ->collapsed(),
                    ])
                    ->columns(6)
                    ->addActionLabel('+ Tambah SOP Baru')
                    ->reorderable()
                    ->columnSpanFull()
                    ->itemLabel(fn(array $state): ?string => $state['namaSop'] ?? null),
            ]);
    }
}
