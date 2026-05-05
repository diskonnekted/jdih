<?php

namespace App\Filament\Resources\LegalDecisions\Tables;

use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Select;
use Filament\Tables\Table;

class LegalDecisionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                \Filament\Tables\Columns\TextColumn::make('id')
                    ->label('No')
                    ->sortable()
                    ->searchable(),
                \Filament\Tables\Columns\TextColumn::make('document_number')
                    ->label('No Peraturan')
                    ->searchable(),
                \Filament\Tables\Columns\TextColumn::make('year')
                    ->label('Tahun')
                    ->sortable(),
                \Filament\Tables\Columns\TextColumn::make('title')
                    ->label('Judul')
                    ->wrap()
                    ->searchable(),
                \Filament\Tables\Columns\TextColumn::make('court_type')
                    ->label('Jenis Peradilan')
                    ->searchable(),
                \Filament\Tables\Columns\TextColumn::make('status')
                    ->label('Status Putusan')
                    ->searchable(),
                \Filament\Tables\Columns\TextColumn::make('created_at')
                    ->label('Tgl Dibuat')
                    ->dateTime('Y-m-d H:i:s')
                    ->sortable(),
                \Filament\Tables\Columns\TextColumn::make('updated_at')
                    ->label('Terakhir Diubah')
                    ->dateTime('Y-m-d H:i:s')
                    ->sortable(),
                \Filament\Tables\Columns\TextColumn::make('is_published')
                    ->label('Publish')
                    ->badge()
                    ->formatStateUsing(fn($state) => $state ? 'Aktif' : 'Non Aktif')
                    ->color(fn($state) => $state ? 'success' : 'danger'),
            ])
            ->filters([
                \Filament\Tables\Filters\Filter::make('judul_filter')
                    ->form([
                        \Filament\Forms\Components\TextInput::make('title')
                            ->label('Judul')
                            ->placeholder('Cari Judul...'),
                    ])
                    ->query(function (\Illuminate\Database\Eloquent\Builder $query, array $data): \Illuminate\Database\Eloquent\Builder {
                        return $query->when(
                            $data['title'],
                            fn (\Illuminate\Database\Eloquent\Builder $query, $title): \Illuminate\Database\Eloquent\Builder => $query->where('title', 'like', "%{$title}%"),
                        );
                    }),
                \Filament\Tables\Filters\Filter::make('nomor_filter')
                    ->form([
                        \Filament\Forms\Components\TextInput::make('document_number')
                            ->label('Nomor')
                            ->placeholder('Cari Nomor...'),
                    ])
                    ->query(function (\Illuminate\Database\Eloquent\Builder $query, array $data): \Illuminate\Database\Eloquent\Builder {
                        return $query->when(
                            $data['document_number'],
                            fn (\Illuminate\Database\Eloquent\Builder $query, $number): \Illuminate\Database\Eloquent\Builder => $query->where('document_number', 'like', "%{$number}%"),
                        );
                    }),
                \Filament\Tables\Filters\SelectFilter::make('year')
                    ->label('-- Pilih Tahun --')
                    ->options(fn () => \App\Models\LegalDecision::distinct()->pluck('year', 'year')->toArray()),
            ], layout: \Filament\Tables\Enums\FiltersLayout::AboveContent)
            ->filtersFormColumns(4)
            ->headerActions([
                Action::make('print')
                    ->label('Print Daftar')
                    ->color('warning')
                    ->icon('heroicon-m-printer')
                    ->form([
                        Select::make('per_page')
                            ->label('Jumlah baris per halaman')
                            ->options([25 => '25 baris', 50 => '50 baris', 100 => '100 baris', 200 => '200 baris', 500 => 'Semua (maks 500)'])
                            ->default(50)
                            ->required(),
                        Select::make('page')
                            ->label('Halaman ke-')
                            ->options(collect(range(1, 30))->mapWithKeys(fn ($p) => [$p => "Halaman {$p}"])->toArray())
                            ->default(1)
                            ->required()
                            ->helperText('1 halaman = jumlah baris yang dipilih di atas.'),
                    ])
                    ->action(function (array $data) {
                        $url = route('admin.print.legal-decisions', [
                            'per_page' => $data['per_page'],
                            'page'     => $data['page'],
                        ]);
                        redirect()->away($url);
                    })
                    ->modalSubmitActionLabel('Buka Halaman Print ↗'),
            ])
            ->recordActions([
                \Filament\Actions\DeleteAction::make()->label('Hapus')->color('danger')->icon('heroicon-m-trash')->button(),
                \Filament\Actions\EditAction::make()->label('Edit')->color('success')->icon('heroicon-m-pencil')->button(),
                \Filament\Actions\ViewAction::make()->label('Detail')->color('info')->icon('heroicon-m-eye')->button(),
                \Filament\Actions\Action::make('proses')
                    ->label('Proses')
                    ->color('primary')
                    ->icon('heroicon-m-cog')
                    ->button()
                    ->action(fn () => null),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
