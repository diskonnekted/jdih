<?php

namespace App\Filament\Resources\LegalDocuments\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Storage;

class LegalDocumentInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                // --------------------------------------------------
                // STATUS BADGE
                // --------------------------------------------------
                Section::make('Status Hukum')
                    ->schema([
                        TextEntry::make('status')
                            ->label('Status')
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                'Berlaku'       => 'success',
                                'Tidak Berlaku',
                                'Dicabut'       => 'danger',
                                'Diubah'        => 'warning',
                                default         => 'gray',
                            }),
                        TextEntry::make('status_note')
                            ->label('Keterangan Status')
                            ->placeholder('-'),
                    ])
                    ->columns(2),

                // --------------------------------------------------
                // INFORMASI DASAR
                // --------------------------------------------------
                Section::make('Informasi Dasar')
                    ->schema([
                        TextEntry::make('title')
                            ->label('Judul')
                            ->columnSpanFull(),

                        TextEntry::make('document_number')
                            ->label('Nomor'),

                        TextEntry::make('year')
                            ->label('Tahun')
                            ->numeric(),

                        TextEntry::make('category.name')
                            ->label('Kategori')
                            ->badge()
                            ->color('gray'),

                        TextEntry::make('document_type')
                            ->label('Tipe Dokumen')
                            ->placeholder('-'),

                        TextEntry::make('published_at')
                            ->label('Tanggal Penetapan')
                            ->date('d F Y')
                            ->placeholder('-'),

                        TextEntry::make('promulgated_at')
                            ->label('Tanggal Pengundangan')
                            ->date('d F Y')
                            ->placeholder('-'),
                    ])
                    ->columns(3),

                // --------------------------------------------------
                // METADATA JDIH
                // --------------------------------------------------
                Section::make('Metadata JDIH Standar')
                    ->schema([
                        TextEntry::make('teu')
                            ->label('T.E.U. Badan/Pengarang')
                            ->placeholder('-'),

                        TextEntry::make('abbreviation')
                            ->label('Singkatan Jenis')
                            ->placeholder('-'),

                        TextEntry::make('place_of_enactment')
                            ->label('Tempat Penetapan')
                            ->placeholder('-'),

                        TextEntry::make('source')
                            ->label('Sumber')
                            ->placeholder('-'),

                        TextEntry::make('entity')
                            ->label('Pemrakarsa')
                            ->placeholder('-'),

                        TextEntry::make('signer')
                            ->label('Penandatangan')
                            ->placeholder('-'),

                        TextEntry::make('govt_field')
                            ->label('Bidang Pemerintahan')
                            ->placeholder('-'),

                        TextEntry::make('legal_field')
                            ->label('Bidang Hukum')
                            ->placeholder('-'),

                        TextEntry::make('language')
                            ->label('Bahasa')
                            ->placeholder('Bahasa Indonesia'),

                        TextEntry::make('page_count')
                            ->label('Jumlah Halaman')
                            ->numeric()
                            ->placeholder('0'),

                        TextEntry::make('location')
                            ->label('Lokasi Penyimpanan')
                            ->placeholder('-'),

                        TextEntry::make('initiator')
                            ->label('Inisiator')
                            ->placeholder('-'),
                    ])
                    ->columns(3)
                    ->collapsible(),

                // --------------------------------------------------
                // KONTEN
                // --------------------------------------------------
                Section::make('Abstrak & Konten')
                    ->schema([
                        TextEntry::make('subject')
                            ->label('Subjek / Kata Kunci')
                            ->placeholder('-')
                            ->columnSpanFull(),

                        TextEntry::make('abstract')
                            ->label('Abstrak')
                            ->placeholder('Abstrak belum tersedia.')
                            ->columnSpanFull(),

                        TextEntry::make('related_regulations_text')
                            ->label('Peraturan Terkait')
                            ->placeholder('-')
                            ->columnSpanFull(),

                        TextEntry::make('implementing_regulations')
                            ->label('Peraturan Pelaksana')
                            ->placeholder('-')
                            ->columnSpanFull(),
                    ])
                    ->collapsible(),

                // --------------------------------------------------
                // FILE DOKUMEN
                // --------------------------------------------------
                Section::make('File Dokumen')
                    ->schema([
                        TextEntry::make('file_path')
                            ->label('File PDF Utama')
                            ->placeholder('Belum ada file.')
                            ->formatStateUsing(function ($state) {
                                if (!$state) return '—';
                                return Storage::disk('public')->url($state);
                            })
                            ->url(function ($record) {
                                if (!$record->file_path) return null;
                                return Storage::disk('public')->url($record->file_path);
                            })
                            ->openUrlInNewTab(),

                        TextEntry::make('abstract_file_path')
                            ->label('File PDF Abstrak')
                            ->placeholder('Belum ada file abstrak.')
                            ->formatStateUsing(function ($state) {
                                if (!$state) return '—';
                                return Storage::disk('public')->url($state);
                            })
                            ->url(function ($record) {
                                if (!$record->abstract_file_path) return null;
                                return Storage::disk('public')->url($record->abstract_file_path);
                            })
                            ->openUrlInNewTab(),
                    ])
                    ->columns(2),

                // --------------------------------------------------
                // STATISTIK
                // --------------------------------------------------
                Section::make('Statistik')
                    ->schema([
                        TextEntry::make('view_count')
                            ->label('Total Dilihat')
                            ->numeric()
                            ->suffix(' kali'),

                        TextEntry::make('download_count')
                            ->label('Total Diunduh')
                            ->numeric()
                            ->suffix(' kali'),

                        TextEntry::make('created_at')
                            ->label('Tanggal Dibuat')
                            ->dateTime('d F Y H:i'),

                        TextEntry::make('updated_at')
                            ->label('Terakhir Diubah')
                            ->dateTime('d F Y H:i'),
                    ])
                    ->columns(4),
            ]);
    }
}
