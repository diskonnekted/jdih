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
                \Filament\Schemas\Components\Tabs::make('Dokumen Hukum')
                    ->columnSpanFull()
                    ->tabs([
                        \Filament\Schemas\Components\Tabs\Tab::make('Deskripsi Utama')
                            ->icon('heroicon-m-document-text')
                            ->schema([
                                TextInput::make('title')
                                    ->label('Judul Produk Hukum')
                                    ->required()
                                    ->columnSpanFull(),
                                TextInput::make('document_number')
                                    ->label('Nomor')
                                    ->required(),
                                Select::make('year')
                                    ->label('Tahun')
                                    ->options(array_combine(range(date('Y'), 1945), range(date('Y'), 1945)))
                                    ->searchable()
                                    ->required(),
                                Select::make('category_id')
                                    ->label('Jenis Produk Hukum')
                                    ->relationship('category', 'name')
                                    ->searchable()
                                    ->preload()
                                    ->required(),
                                TextInput::make('abbreviation')
                                    ->label('Singkatan Jenis')
                                    ->placeholder('Misal: PERDA'),
                                Select::make('document_type')
                                    ->label('Tipe Dokumen')
                                    ->options([
                                        'Peraturan Perundang-undangan' => 'Peraturan Perundang-undangan',
                                        'Monografi Hukum' => 'Monografi Hukum',
                                        'Putusan Pengadilan' => 'Putusan Pengadilan',
                                        'Artikel Hukum' => 'Artikel Hukum',
                                    ])
                                    ->default('Peraturan Perundang-undangan')
                                    ->required(),
                                TextInput::make('teu')
                                    ->label('T.E.U (Tajuk Entri Utama)')
                                    ->placeholder('Misal: Pemerintah Kabupaten Banjarnegara')
                                    ->default('Pemerintah Kabupaten Banjarnegara')
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

                        \Filament\Schemas\Components\Tabs\Tab::make('Metadata Detail')
                            ->icon('heroicon-m-list-bullet')
                            ->schema([
                                DatePicker::make('published_at')
                                    ->label('Tanggal Penetapan')
                                    ->required(),
                                DatePicker::make('promulgated_at')
                                    ->label('Tanggal Pengundangan')
                                    ->required(),
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

                        \Filament\Schemas\Components\Tabs\Tab::make('Status & Hubungan')
                            ->icon('heroicon-m-arrows-right-left')
                            ->schema([
                                /*
                                \Filament\Forms\Components\Repeater::make('relatedDocuments')
                                    ->label('Visual Hubungan Dokumen (Sistem)')
                                    ->relationship('relatedDocuments')
                                    ->schema([
                                        Select::make('related_document_id')
                                            ->label('Pilih Dokumen')
                                            ->getSearchResultsUsing(fn (string $search): array => \App\Models\LegalDocument::where('title', 'like', "%{$search}%")->limit(50)->pluck('title', 'id')->toArray())
                                            ->getOptionLabelUsing(fn ($value): ?string => \App\Models\LegalDocument::find($value)?->title)
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
                                */
                                Textarea::make('related_regulations_text')
                                    ->label('Peraturan Terkait (Teks)')
                                    ->placeholder('-'),
                                Textarea::make('implementing_regulations')
                                    ->label('Peraturan Pelaksana (Teks)')
                                    ->placeholder('-'),
                            ]),

                        \Filament\Schemas\Components\Tabs\Tab::make('Abstrak & File')
                            ->icon('heroicon-m-paper-clip')
                            ->schema([
                                Textarea::make('abstract')
                                    ->label('Abstrak / Ringkasan')
                                    ->placeholder("Format JDIHN:\n1. Latar Belakang\n2. Rumusan Masalah\n3. Isi Pokok Peraturan")
                                    ->rows(5)
                                    ->columnSpanFull()
                                    ->hint('Abstrak harus searchable dan memuat latar belakang, rumusan masalah, dan isi pokok.'),
                                FileUpload::make('file_path')
                                    ->label('File PDF Utama (Searchable)')
                                    ->disk('static_docs')
                                    ->directory('uploads')
                                    ->acceptedFileTypes(['application/pdf'])
                                    ->maxSize(20480) // 20MB
                                    ->required()
                                    ->openable()
                                    ->downloadable()
                                    ->previewable(false)
                                    ->columnSpanFull()
                                    ->hint('Pastikan file adalah searchable PDF.'),
                            ]),
                    ]),
            ]);
    }
}
