<?php

namespace App\Filament\Resources\Categories\Tables;

use App\Models\Category;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\Action;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Enums\FiltersLayout;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class CategoriesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                    ->label('No')
                    ->sortable(),
                TextColumn::make('name')
                    ->label('Nama Jenis Produk Hukum')
                    ->searchable()
                    ->wrap(),
                TextColumn::make('code')
                    ->label('Kode')
                    ->badge()
                    ->color('info'),
                TextColumn::make('slug')
                    ->label('Slug URL')
                    ->color('gray')
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('legal_documents_count')
                    ->label('Jumlah Dokumen')
                    ->counts('legalDocuments')
                    ->badge()
                    ->color('success')
                    ->sortable(),
                TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->date('d/m/Y')
                    ->sortable(),
            ])
            ->defaultSort('name')
            ->filters([
                Filter::make('nama_filter')
                    ->label('Nama')
                    ->form([
                        TextInput::make('name')
                            ->placeholder('Cari nama jenis produk hukum')
                            ->hiddenLabel(),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query->when(
                            $data['name'] ?? null,
                            fn (Builder $q, $name) => $q->where('name', 'like', "%{$name}%")
                        );
                    }),
            ], layout: FiltersLayout::AboveContent)
            ->filtersFormColumns(2)
            ->headerActions([
                Action::make('print')
                    ->label('Print Daftar')
                    ->color('warning')
                    ->icon('heroicon-m-printer')
                    ->url(fn () => route('admin.print.categories'))
                    ->openUrlInNewTab(),
            ])
            ->recordActions([
                DeleteAction::make()
                    ->label('Hapus')
                    ->color('danger')
                    ->icon('heroicon-m-trash')
                    ->button(),
                EditAction::make()
                    ->label('Edit')
                    ->color('success')
                    ->icon('heroicon-m-pencil')
                    ->button(),
                ViewAction::make()
                    ->label('Detail')
                    ->color('info')
                    ->icon('heroicon-m-eye')
                    ->button(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
