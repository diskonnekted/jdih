<?php

namespace App\Filament\Resources\Categories\Tables;

use App\Models\Category;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Actions\Action;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Enums\FiltersLayout;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class CategoriesTable
{
    public static function configure(Table $table): Table
    {
        // Build year options dynamically
        $years = Category::query()
            ->selectRaw('YEAR(created_at) as year')
            ->distinct()
            ->orderByDesc('year')
            ->pluck('year')
            ->filter()
            ->mapWithKeys(fn ($y) => [$y => $y])
            ->toArray();

        return $table
            ->columns([
                TextColumn::make('id')
                    ->label('No')
                    ->sortable(),
                TextColumn::make('name')
                    ->label('Nama Kategori')
                    ->searchable()
                    ->wrap(),
                TextColumn::make('code')
                    ->label('Kode')
                    ->badge()
                    ->color('info'),
                TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->date('d/m/Y'),
            ])
            ->filters([
                Filter::make('nama_filter')
                    ->label('Nama')
                    ->form([
                        TextInput::make('name')
                            ->placeholder('Cari nama kategori')
                            ->hiddenLabel(),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query->when(
                            $data['name'] ?? null,
                            fn (Builder $q, $name) => $q->where('name', 'like', "%{$name}%")
                        );
                    }),

                \Filament\Tables\Filters\SelectFilter::make('year')
                    ->label('Tahun Dibuat')
                    ->placeholder('-- Pilih Tahun --')
                    ->options($years)
                    ->query(function (Builder $query, array $data): Builder {
                        return $query->when(
                            $data['value'] ?? null,
                            fn (Builder $q, $year) => $q->whereYear('created_at', $year)
                        );
                    }),
            ], layout: FiltersLayout::AboveContent)
            ->filtersFormColumns(2)
            ->headerActions([
                Action::make('print')
                    ->label('Print')
                    ->color('warning')
                    ->icon('heroicon-m-printer')
                    ->action(fn () => null),
            ])
            ->recordActions([
                DeleteAction::make()
                    ->label('Hapus')
                    ->color('danger')
                    ->button(),
                EditAction::make()
                    ->label('Edit')
                    ->color('success')
                    ->button(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
