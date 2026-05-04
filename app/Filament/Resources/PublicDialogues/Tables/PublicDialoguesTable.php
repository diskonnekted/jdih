<?php

namespace App\Filament\Resources\PublicDialogues\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Tables\Filters\SelectFilter;

class PublicDialoguesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->label('Judul / Topik')
                    ->searchable()
                    ->wrap()
                    ->sortable(),
                
                TextColumn::make('document_type')
                    ->label('Jenis')
                    ->badge()
                    ->color('info')
                    ->searchable(),
                
                TextColumn::make('year')
                    ->label('Tahun')
                    ->sortable(),
                
                IconColumn::make('is_active')
                    ->label('Aktif')
                    ->boolean(),
                
                TextColumn::make('responses_count')
                    ->label('Aspirasi')
                    ->counts('responses')
                    ->badge()
                    ->color(fn ($state): string => $state > 0 ? 'success' : 'gray'),

                TextColumn::make('view_count')
                    ->label('Dilihat')
                    ->numeric()
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('is_active')
                    ->options([
                        '1' => 'Aktif',
                        '0' => 'Non-aktif',
                    ]),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
