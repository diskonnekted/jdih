<?php

namespace App\Filament\Resources\Katalogs\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Table;

class KatalogsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                \Filament\Tables\Columns\TextColumn::make('id')
                    ->label('No')
                    ->sortable()
                    ->searchable(),
                \Filament\Tables\Columns\TextColumn::make('category')
                    ->label('Bentuk Produk Hukum')
                    ->wrap()
                    ->searchable(),
                \Filament\Tables\Columns\TextColumn::make('document_number')
                    ->label('No Peraturan')
                    ->searchable(),
                \Filament\Tables\Columns\ColumnGroup::make('Tanggal', [
                    \Filament\Tables\Columns\TextColumn::make('date_stipulated')
                        ->label('Ditetap')
                        ->date('Y-m-d')
                        ->sortable(),
                    \Filament\Tables\Columns\TextColumn::make('date_promulgated')
                        ->label('Diundang')
                        ->date('Y-m-d')
                        ->sortable(),
                ]),
                \Filament\Tables\Columns\TextColumn::make('title')
                    ->label('Judul')
                    ->wrap()
                    ->searchable(),
                \Filament\Tables\Columns\TextColumn::make('source')
                    ->label('Sumber')
                    ->wrap()
                    ->searchable(),
                \Filament\Tables\Columns\TextColumn::make('status')
                    ->label('Status')
                    ->searchable(),
            ])
            ->filters([
                \Filament\Tables\Filters\Filter::make('judul_filter')
                    ->form([
                        \Filament\Forms\Components\TextInput::make('title')
                            ->placeholder('tentang produk hukum')
                            ->hiddenLabel(),
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
                            ->placeholder('masukan nomor')
                            ->hiddenLabel(),
                    ])
                    ->query(function (\Illuminate\Database\Eloquent\Builder $query, array $data): \Illuminate\Database\Eloquent\Builder {
                        return $query->when(
                            $data['document_number'],
                            fn (\Illuminate\Database\Eloquent\Builder $query, $number): \Illuminate\Database\Eloquent\Builder => $query->where('document_number', 'like', "%{$number}%"),
                        );
                    }),
                \Filament\Tables\Filters\SelectFilter::make('publish_year')
                    ->label('')
                    ->placeholder('-- Pilih Tahun --')
                    ->options(fn () => \App\Models\Katalog::distinct()->pluck('publish_year', 'publish_year')->toArray()),
                \Filament\Tables\Filters\SelectFilter::make('category')
                    ->label('')
                    ->placeholder('-- Pilih Kategori --')
                    ->options(fn () => \App\Models\Katalog::distinct()->pluck('category', 'category')->toArray()),
            ], layout: \Filament\Tables\Enums\FiltersLayout::AboveContent)
            ->filtersFormColumns(4)
            ->headerActions([
                \Filament\Actions\Action::make('print')
                    ->label('Print')
                    ->color('warning')
                    ->action(fn () => null),
            ])
            ->recordActions([
                \Filament\Actions\EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
