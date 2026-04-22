<?php

namespace App\Filament\Resources\LegalDocuments\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Schema;

class LegalDocumentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Forms\Components\Tabs::make('Dokumen Hukum')
                    ->columnSpanFull()
                    ->tabs([
                        \Filament\Forms\Components\Tabs\Tab::make('Deskripsi Utama')
                            ->icon('heroicon-m-document-text')
                            ->schema([
                                TextInput::make('title')
                                    ->label('Judul Produk Hukum')
                                    ->required()
                                    ->columnSpanFull(),
                                TextInput::make('document_number')
                                    ->label('Nomor')
                                    ->required(),
                                TextInput::make('year')
                                    ->label('Tahun')
                                    ->required()
                                    ->numeric(),
                                Select::make('category_id')
                                    ->label('Jenis Produk Hukum')
                                    ->relationship('category', 'name')
                                    ->searchable()
                                    ->preload()
                                    ->required(),
                                TextInput::make('abbreviation')
                                    ->label('Singkatan Jenis')
                                    ->placeholder('Misal: PERDA'),
                                TextInput::make('document_type')
                                    ->label('Tipe Dokumen')
                                    ->default('Peraturan Perundang-undangan')
                                    ->required(),
                                TextInput::make('teu')
                                    ->label('T.E.U (Tanda Entri Utama)')
                                    ->default('Banjarnegara')
                                    ->required(),
                                Select::make('status')
                                    ->options([
                                        'Berlaku' => 'Berlaku',
                                        'Tidak Berlaku' => 'Tidak Berlaku',
                                        'Dicabut' => 'Dicabut',
                                        'Diubah' => 'Diubah',
                                    ])
                                    ->required()
                                    ->default('Berlaku'),
                                Textarea::make('status_note')
                                    ->label('Keterangan Status')
                                    ->placeholder('Misal: Mencabut Peraturan Daerah Nomor 5 Tahun 2018...')
                                    ->columnSpanFull(),
                            ])->columns(2),

                        \Filament\Forms\Components\Tabs\Tab::make('Metadata Detail')
                            ->icon('heroicon-m-list-bullet')
                            ->schema([
                                DatePicker::make('published_at')
                                    ->label('Tanggal Penetapan'),
                                DatePicker::make('promulgated_at')
                                    ->label('Tanggal Pengundangan'),
                                TextInput::make('place_of_enactment')
                                    ->label('Tempat Penetapan')
                                    ->default('Banjarnegara'),
                                TextInput::make('source')
                                    ->label('Sumber / Media Pengundangan')
                                    ->placeholder('Misal: Lembaran Daerah Tahun 2025 Nomor 16...'),
                                TextInput::make('govt_field')
                                    ->label('Bidang Hukum / Urusan'),
                                TextInput::make('language')
                                    ->label('Bahasa')
                                    ->default('Bahasa Indonesia'),
                                TextInput::make('location')
                                    ->label('Lokasi')
                                    ->default('Bagian Hukum SETDA Kabupaten Banjarnegara'),
                                TextInput::make('signer')
                                    ->label('Penandatangan'),
                                TextInput::make('initiator')
                                    ->label('Pemrakarsa'),
                                Textarea::make('judicial_review')
                                    ->label('Hasil Uji Materi')
                                    ->placeholder('-')
                                    ->columnSpanFull(),
                                \Filament\Forms\Components\TagsInput::make('subject')
                                    ->label('Subjek / Kata Kunci')
                                    ->placeholder('Tambah kata kunci...')
                                    ->columnSpanFull(),
                            ])->columns(2),

                        \Filament\Forms\Components\Tabs\Tab::make('Status & Hubungan')
                            ->icon('heroicon-m-arrows-right-left')
                            ->schema([
                                \Filament\Forms\Components\Repeater::make('relatedDocuments')
                                    ->label('Visual Hubungan Dokumen (Sistem)')
                                    ->relationship('relatedDocuments')
                                    ->schema([
                                        Select::make('related_document_id')
                                            ->label('Pilih Dokumen')
                                            ->options(fn () => \App\Models\LegalDocument::all()->pluck('title', 'id'))
                                            ->searchable()
                                            ->required(),
                                        Select::make('relation_type')
                                            ->label('Tipe Hubungan')
                                            ->options([
                                                'Mencabut' => 'Mencabut',
                                                'Dicabut Oleh' => 'Dicabut Oleh',
                                                'Mengubah' => 'Mengubah',
                                                'Diubah Oleh' => 'Diubah Oleh',
                                                'Mencabut Sebagian' => 'Mencabut Sebagian',
                                                'Mengatur' => 'Mengatur',
                                            ])
                                            ->required(),
                                    ])
                                    ->columns(2)
                                    ->columnSpanFull(),
                                Textarea::make('related_regulations_text')
                                    ->label('Peraturan Terkait (Teks)')
                                    ->placeholder('-'),
                                Textarea::make('implementing_regulations')
                                    ->label('Peraturan Pelaksana (Teks)')
                                    ->placeholder('-'),
                            ]),

                        \Filament\Forms\Components\Tabs\Tab::make('Abstrak & File')
                            ->icon('heroicon-m-paper-clip')
                            ->schema([
                                Textarea::make('abstract')
                                    ->label('Abstrak / Ringkasan')
                                    ->rows(5)
                                    ->columnSpanFull(),
                                FileUpload::make('file_path')
                                    ->label('File PDF Utama')
                                    ->directory('legal-documents')
                                    ->acceptedFileTypes(['application/pdf'])
                                    ->maxSize(51200) // 50MB
                                    ->columnSpanFull(),
                            ]),
                    ]),
            ]);
    }
}
