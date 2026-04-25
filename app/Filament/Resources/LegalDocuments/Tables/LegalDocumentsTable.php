<?php

namespace App\Filament\Resources\LegalDocuments\Tables;

use App\Models\LegalDocument;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class LegalDocumentsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('row_index')
                    ->label('No')
                    ->rowIndex(),
                TextColumn::make('category.name')
                    ->label('Jenis')
                    ->badge()
                    ->color('gray')
                    ->searchable(),
                TextColumn::make('document_number')
                    ->label('No Peraturan')
                    ->searchable(),
                TextColumn::make('year')
                    ->label('Tahun')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('published_at')
                    ->label('Tgl Penetapan')
                    ->date()
                    ->sortable(),
                TextColumn::make('teu')
                    ->label('T.E.U')
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->searchable(),
                TextColumn::make('title')
                    ->label('Judul')
                    ->wrap()
                    ->limit(100)
                    ->tooltip(fn (LegalDocument $record): string => $record->title)
                    ->searchable(),
                TextColumn::make('created_at')
                    ->label('Tgl Dibuat')
                    ->dateTime('Y-m-d H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->label('Terakhir Diubah')
                    ->dateTime('Y-m-d H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Berlaku' => 'success',
                        'Tidak Berlaku', 'Dicabut' => 'danger',
                        'Diubah' => 'warning',
                        default => 'gray',
                    }),
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
                    ->options(fn () => \App\Models\LegalDocument::distinct()->pluck('year', 'year')->toArray()),
                \Filament\Tables\Filters\SelectFilter::make('category_id')
                    ->label('-- Pilih Kategori --')
                    ->relationship('category', 'name'),
            ], layout: \Filament\Tables\Enums\FiltersLayout::AboveContent)
            ->filtersFormColumns(4)
            ->recordActions([
                \Filament\Actions\DeleteAction::make()->label('Hapus')->color('danger')->icon('heroicon-m-trash'),
                \Filament\Actions\EditAction::make()->label('Edit')->color('success')->icon('heroicon-m-pencil'),
                \Filament\Actions\ViewAction::make()->label('Detail')->color('info')->icon('heroicon-m-eye'),
                \Filament\Actions\Action::make('proses')
                    ->label('Proses')
                    ->color('primary')
                    ->icon('heroicon-m-cog')
                    ->action(fn () => null),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
