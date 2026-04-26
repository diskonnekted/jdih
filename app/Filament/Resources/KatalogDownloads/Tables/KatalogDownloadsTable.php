<?php

namespace App\Filament\Resources\KatalogDownloads\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Table;

class KatalogDownloadsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                \Filament\Tables\Columns\TextColumn::make('no')
                    ->label('No')
                    ->sortable()
                    ->searchable(),
                \Filament\Tables\Columns\TextColumn::make('title')
                    ->label('Judul File')
                    ->sortable()
                    ->searchable(),
                \Filament\Tables\Columns\TextColumn::make('file_path')
                    ->label('File')
                    ->limit(30),
                \Filament\Tables\Columns\TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
