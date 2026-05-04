<?php

namespace App\Filament\Resources\LegalDocuments\RelationManagers;

use Filament\Actions\AttachAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\DetachAction;
use Filament\Actions\DetachBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\TextInput;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class RelatedDocumentsRelationManager extends RelationManager
{
    protected static string $relationship = 'relatedDocuments';

    protected static ?string $title = 'Dokumen Terkait (Mencabut/Mengubah)';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->disabled()
                    ->columnSpanFull(),
                TextInput::make('relation_type')
                    ->label('Tipe Hubungan')
                    ->required()
                    ->placeholder('Contoh: Mencabut, Mengubah, Mencabut Sebagian'),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('title')
            ->columns([
                TextColumn::make('relation_type')
                    ->label('Tipe Hubungan')
                    ->badge()
                    ->color('info')
                    ->sortable(),
                TextColumn::make('document_number')
                    ->label('Nomor')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('year')
                    ->label('Tahun')
                    ->sortable(),
                TextColumn::make('title')
                    ->label('Judul')
                    ->wrap()
                    ->searchable()
                    ->limit(50),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                AttachAction::make()
                    ->form(fn (AttachAction $action): array => [
                        $action->getRecordSelect(),
                        TextInput::make('relation_type')
                            ->label('Tipe Hubungan')
                            ->required()
                            ->default('Mencabut')
                            ->placeholder('Mencabut / Mengubah / Diubah Oleh'),
                    ])
                    ->preloadRecordSelect(),
            ])
            ->recordActions([
                EditAction::make(),
                DetachAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DetachBulkAction::make(),
                ]),
            ]);
    }
}
