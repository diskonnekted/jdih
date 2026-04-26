<?php

namespace App\Filament\Resources\LegalDocuments\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;

class LegalDocumentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Tabs')
                    ->tabs([

                        // -----------------------------------------------
                        // TAB 1: INFORMASI DASAR
                        // -----------------------------------------------
                        Tab::make('Informasi Dasar')
                            ->icon('heroicon-o-document-text')
                            ->schema([
                                TextInput::make('title')
                                    ->label('Judul Produk Hukum')
                                    ->required()
                                    ->maxLength(500)
                                    ->columnSpanFull(),

                                Grid::make(3)->schema([
                                    TextInput::make('document_number')
                                        ->label('Nomor Peraturan')
                                        ->required()
                                        ->maxLength(100)
                                        ->placeholder('Contoh: 1, 1/2024, dst.'),

                                    Select::make('year')
                                        ->label('Tahun')
                                        ->options(array_combine(range(date('Y'), 1945), range(date('Y'), 1945)))
                                        ->searchable()
                                        ->required(),

                                    Select::make('category_id')
                                        ->label('Jenis/Kategori')
                                        ->relationship('category', 'name')
                                        ->searchable()
                                        ->preload()
                                        ->required(),
                                ]),

                                Grid::make(3)->schema([
                                    Select::make('status')
                                        ->label('Status Hukum')
                                        ->options([
                                            'Berlaku'       => 'Berlaku',
                                            'Tidak Berlaku' => 'Tidak Berlaku',
                                            'Dicabut'       => 'Dicabut',
                                            'Diubah'        => 'Diubah',
                                            'Dalam Proses'  => 'Dalam Proses',
                                        ])
                                        ->default('Berlaku')
                                        ->required(),

                                    DatePicker::make('published_at')
                                        ->label('Tanggal Penetapan')
                                        ->nullable()
                                        ->displayFormat('d/m/Y'),

                                    DatePicker::make('promulgated_at')
                                        ->label('Tanggal Pengundangan')
                                        ->nullable()
                                        ->displayFormat('d/m/Y'),
                                ]),

                                TextInput::make('status_note')
                                    ->label('Keterangan Status')
                                    ->nullable()
                                    ->placeholder('Misal: Dicabut oleh Perda No. 5 Tahun 2022')
                                    ->columnSpanFull(),
                            ]),

                        // -----------------------------------------------
                        // TAB 2: METADATA JDIH STANDAR
                        // -----------------------------------------------
                        Tab::make('Metadata JDIH')
                            ->icon('heroicon-o-tag')
                            ->schema([
                                Grid::make(2)->schema([
                                    TextInput::make('teu')
                                        ->label('T.E.U. Badan / Pengarang')
                                        ->nullable()
                                        ->placeholder('Contoh: Kabupaten Banjarnegara'),

                                    TextInput::make('abbreviation')
                                        ->label('Singkatan Jenis')
                                        ->nullable()
                                        ->placeholder('Contoh: PERDA, PERBUP, SK'),
                                ]),

                                Grid::make(2)->schema([
                                    TextInput::make('place_of_enactment')
                                        ->label('Tempat Penetapan')
                                        ->nullable()
                                        ->default('Banjarnegara'),

                                    TextInput::make('source')
                                        ->label('Sumber')
                                        ->nullable()
                                        ->placeholder('Misal: Berita Daerah Kab. Banjarnegara'),
                                ]),

                                Grid::make(2)->schema([
                                    TextInput::make('entity')
                                        ->label('Pemrakarsa / Pihak')
                                        ->nullable()
                                        ->placeholder('Misal: Pemerintah Kabupaten Banjarnegara'),

                                    TextInput::make('document_type')
                                        ->label('Tipe Dokumen')
                                        ->nullable()
                                        ->placeholder('Misal: Peraturan Perundang-undangan'),
                                ]),

                                Grid::make(3)->schema([
                                    TextInput::make('govt_field')
                                        ->label('Bidang Pemerintahan')
                                        ->nullable(),

                                    TextInput::make('legal_field')
                                        ->label('Bidang Hukum')
                                        ->nullable(),

                                    TextInput::make('legal_form')
                                        ->label('Bentuk Hukum')
                                        ->nullable(),
                                ]),

                                Grid::make(3)->schema([
                                    Select::make('language')
                                        ->label('Bahasa')
                                        ->options([
                                            'Bahasa Indonesia' => 'Bahasa Indonesia',
                                            'Bahasa Jawa'      => 'Bahasa Jawa',
                                            'Bahasa Inggris'   => 'Bahasa Inggris',
                                        ])
                                        ->default('Bahasa Indonesia')
                                        ->nullable(),

                                    TextInput::make('page_count')
                                        ->label('Jumlah Halaman')
                                        ->numeric()
                                        ->nullable()
                                        ->minValue(0),

                                    TextInput::make('location')
                                        ->label('Lokasi Penyimpanan')
                                        ->nullable()
                                        ->default('Bagian Hukum Sekretariat Daerah Kab. Banjarnegara'),
                                ]),

                                Grid::make(2)->schema([
                                    TextInput::make('signer')
                                        ->label('Penandatangan')
                                        ->nullable()
                                        ->placeholder('Nama pejabat penandatangan'),

                                    TextInput::make('initiator')
                                        ->label('Pemrakarsa (Inisiator)')
                                        ->nullable(),
                                ]),

                                Textarea::make('subject')
                                    ->label('Subjek / Kata Kunci')
                                    ->nullable()
                                    ->rows(2)
                                    ->placeholder('Kata kunci dipisah koma. Misal: pajak, retribusi, daerah')
                                    ->columnSpanFull(),

                                Textarea::make('related_regulations_text')
                                    ->label('Peraturan Terkait (Teks)')
                                    ->nullable()
                                    ->rows(2)
                                    ->placeholder('Peraturan-peraturan yang berkaitan, pisahkan dengan koma.')
                                    ->columnSpanFull(),

                                Textarea::make('implementing_regulations')
                                    ->label('Peraturan Pelaksana')
                                    ->nullable()
                                    ->rows(2)
                                    ->columnSpanFull(),
                            ]),

                        // -----------------------------------------------
                        // TAB 3: KONTEN & FILE
                        // -----------------------------------------------
                        Tab::make('Konten & File')
                            ->icon('heroicon-o-paper-clip')
                            ->schema([
                                Textarea::make('abstract')
                                    ->label('Abstrak / Ringkasan')
                                    ->nullable()
                                    ->rows(5)
                                    ->placeholder('Tuliskan ringkasan isi dokumen di sini...')
                                    ->columnSpanFull(),

                                Textarea::make('judicial_review')
                                    ->label('Uji Materi (Judicial Review)')
                                    ->nullable()
                                    ->rows(3)
                                    ->columnSpanFull(),

                                Section::make('Upload File Dokumen')
                                    ->description('File PDF yang diunggah akan dapat diakses publik. Pastikan file sudah benar sebelum disimpan.')
                                    ->schema([
                                        FileUpload::make('file_path')
                                            ->label('File PDF Utama (Fullteks)')
                                            ->disk('public')
                                            ->directory('legal-documents')
                                            ->acceptedFileTypes(['application/pdf'])
                                            ->maxSize(51200)
                                            ->nullable()
                                            ->downloadable()
                                            ->previewable(false)
                                            ->helperText('Format: PDF. Ukuran maksimum: 50 MB.')
                                            ->columnSpanFull(),

                                        FileUpload::make('abstract_file_path')
                                            ->label('File PDF Abstrak')
                                            ->disk('public')
                                            ->directory('legal-abstracts')
                                            ->acceptedFileTypes(['application/pdf'])
                                            ->maxSize(10240)
                                            ->nullable()
                                            ->downloadable()
                                            ->previewable(false)
                                            ->helperText('Format: PDF. Ukuran maksimum: 10 MB. (Opsional)')
                                            ->columnSpanFull(),
                                    ]),
                            ]),
                    ])
                    ->columnSpanFull()
                    ->persistTabInQueryString(),
            ]);
    }
}
