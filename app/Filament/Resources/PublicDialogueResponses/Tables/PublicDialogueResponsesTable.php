<?php

namespace App\Filament\Resources\PublicDialogueResponses\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Tables\Filters\SelectFilter;

class PublicDialogueResponsesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('dialogue.title')
                    ->label('Topik')
                    ->searchable()
                    ->limit(30)
                    ->sortable(),
                
                TextColumn::make('full_name')
                    ->label('Nama Pengirim')
                    ->searchable(),
                
                TextColumn::make('suggestion')
                    ->label('Saran')
                    ->limit(50)
                    ->searchable(),
                
                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'approved' => 'success',
                        'hidden' => 'danger',
                        default => 'gray',
                    }),
                
                TextColumn::make('created_at')
                    ->label('Tgl Masuk')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'approved' => 'Disetujui',
                        'hidden' => 'Disembunyikan',
                    ]),
                SelectFilter::make('public_dialogue_id')
                    ->label('Berdasarkan Topik')
                    ->relationship('dialogue', 'title'),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }
}
