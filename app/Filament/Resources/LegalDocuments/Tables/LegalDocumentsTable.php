<?php

namespace App\Filament\Resources\LegalDocuments\Tables;

use App\Models\LegalDocument;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Actions\Action;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Storage;

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
                TextColumn::make('title')
                    ->label('Judul')
                    ->wrap()
                    ->limit(100)
                    ->tooltip(fn (LegalDocument $record): string => $record->title)
                    ->searchable(),
                TextColumn::make('file_path')
                    ->label('File')
                    ->formatStateUsing(fn ($state) => $state ? '✓ Ada' : '✗ Kosong')
                    ->color(fn ($state) => $state ? 'success' : 'danger')
                    ->badge(),
                TextColumn::make('view_count')
                    ->label('Dilihat')
                    ->numeric()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('download_count')
                    ->label('Diunduh')
                    ->numeric()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Berlaku'        => 'success',
                        'Tidak Berlaku',
                        'Dicabut'        => 'danger',
                        'Diubah'         => 'warning',
                        default          => 'gray',
                    }),
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
                \Filament\Tables\Filters\Filter::make('has_file')
                    ->label('Ada File PDF')
                    ->query(fn (\Illuminate\Database\Eloquent\Builder $query): \Illuminate\Database\Eloquent\Builder => $query->whereNotNull('file_path')),
                \Filament\Tables\Filters\SelectFilter::make('year')
                    ->label('-- Pilih Tahun --')
                    ->options(fn () => \App\Models\LegalDocument::distinct()->pluck('year', 'year')->toArray()),
                \Filament\Tables\Filters\SelectFilter::make('category_id')
                    ->label('-- Pilih Kategori --')
                    ->relationship('category', 'name'),
                \Filament\Tables\Filters\SelectFilter::make('status')
                    ->label('-- Status --')
                    ->options([
                        'Berlaku'       => 'Berlaku',
                        'Tidak Berlaku' => 'Tidak Berlaku',
                        'Dicabut'       => 'Dicabut',
                        'Diubah'        => 'Diubah',
                    ]),
            ], layout: \Filament\Tables\Enums\FiltersLayout::AboveContent)
            ->filtersFormColumns(4)
            ->recordActions([
                DeleteAction::make()
                    ->before(function (LegalDocument $record) {
                        if ($record->file_path) {
                            Storage::disk('public')->delete($record->file_path);
                        }
                        if ($record->abstract_file_path) {
                            Storage::disk('public')->delete($record->abstract_file_path);
                        }
                    }),
                EditAction::make(),
                ViewAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()
                        ->before(function (\Illuminate\Database\Eloquent\Collection $records) {
                            foreach ($records as $record) {
                                if ($record->file_path) {
                                    Storage::disk('public')->delete($record->file_path);
                                }
                                if ($record->abstract_file_path) {
                                    Storage::disk('public')->delete($record->abstract_file_path);
                                }
                            }
                        }),
                ]),
            ]);
    }
}
