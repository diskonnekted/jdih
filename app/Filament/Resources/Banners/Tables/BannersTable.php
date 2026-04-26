<?php

namespace App\Filament\Resources\Banners\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Table;

class BannersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                \Filament\Tables\Columns\TextColumn::make('id')
                    ->label('No')
                    ->sortable(),
                \Filament\Tables\Columns\ImageColumn::make('image_path')
                    ->label('Gambar')
                    ->square()
                    ->disk('public'),
                \Filament\Tables\Columns\TextColumn::make('title')
                    ->label('Judul Banner')
                    ->wrap()
                    ->searchable(),
                \Filament\Tables\Columns\ToggleColumn::make('is_active')
                    ->label('Status Aktif'),
            ])
            ->filters([
                \Filament\Tables\Filters\Filter::make('judul_filter')
                    ->form([
                        \Filament\Forms\Components\TextInput::make('title')
                            ->label('Cari Banner')
                            ->placeholder('Masukkan judul banner...'),
                    ])
                    ->query(function (\Illuminate\Database\Eloquent\Builder $query, array $data): \Illuminate\Database\Eloquent\Builder {
                        return $query->when(
                            $data['title'],
                            fn (\Illuminate\Database\Eloquent\Builder $query, $title): \Illuminate\Database\Eloquent\Builder => $query->where('title', 'like', "%{$title}%"),
                        );
                    }),
            ], layout: \Filament\Tables\Enums\FiltersLayout::AboveContent)
            ->filtersFormColumns(2)
            ->recordActions([
                \Filament\Actions\DeleteAction::make()->label('Hapus')->color('danger')->icon('heroicon-m-trash')->button(),
                \Filament\Actions\EditAction::make()->label('Edit')->color('success')->icon('heroicon-m-pencil')->button(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
