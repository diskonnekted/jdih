<?php

namespace App\Filament\Resources\StrukturOrganisasis\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Schema;

class StrukturOrganisasiForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Repeater::make('content.diagrams')
                    ->label('Bagan Struktur Organisasi')
                    ->helperText('Kelola bagan-bagan struktur yang ditampilkan di halaman publik.')
                    ->schema([
                        TextInput::make('title')
                            ->label('Judul Bagan')
                            ->required()
                            ->placeholder('Struktur Organisasi Bagian Hukum')
                            ->columnSpan(2),
                        TextInput::make('subtitle')
                            ->label('Sub Judul')
                            ->placeholder('Sekretariat Daerah Kabupaten Banjarnegara')
                            ->columnSpan(2),
                        FileUpload::make('image_path')
                            ->label('Gambar Bagan')
                            ->directory('profil/struktur')
                            ->image()
                            ->imagePreviewHeight('200')
                            ->columnSpanFull()
                            ->helperText('Upload gambar bagan. Tersimpan di storage/app/public/profil/struktur/'),
                        Textarea::make('description')
                            ->label('Deskripsi Bagan')
                            ->rows(3)
                            ->placeholder('Deskripsi singkat mengenai bagan ini...')
                            ->columnSpanFull(),
                        Repeater::make('highlights')
                            ->label('Komponen Utama (Highlight)')
                            ->schema([
                                TextInput::make('value')
                                    ->label('Item')
                                    ->placeholder('Kepala Bagian Hukum')
                                    ->required(),
                            ])
                            ->addActionLabel('+ Tambah Komponen')
                            ->reorderable()
                            ->columnSpanFull()
                            ->collapsed(),
                    ])
                    ->columns(4)
                    ->addActionLabel('+ Tambah Bagan')
                    ->reorderable()
                    ->columnSpanFull()
                    ->itemLabel(fn(array $state): ?string => $state['title'] ?? null),
            ]);
    }
}
