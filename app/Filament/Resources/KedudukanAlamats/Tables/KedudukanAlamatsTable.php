<?php

namespace App\Filament\Resources\KedudukanAlamats\Tables;

use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class KedudukanAlamatsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title'),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->label('Terakhir Diubah'),
            ])
            ->recordActions([
                EditAction::make()->button()->color('success'),
            ])
            ->toolbarActions([]);
    }
}
