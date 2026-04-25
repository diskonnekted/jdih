<?php

namespace App\Filament\Resources\VideoContents\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class VideoContentsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('row_index')
                    ->label('No')
                    ->rowIndex(),
                TextColumn::make('title')
                    ->label('Judul Video')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('video_url')
                    ->label('URL Video')
                    ->limit(50)
                    ->searchable(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                \Filament\Actions\ViewAction::make()->label('Detail')->icon('heroicon-m-eye'),
                \Filament\Actions\EditAction::make()->label('Ubah')->icon('heroicon-m-pencil'),
                \Filament\Actions\DeleteAction::make()->label('Hapus')->icon('heroicon-m-trash'),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
