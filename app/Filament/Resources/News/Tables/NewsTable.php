<?php

namespace App\Filament\Resources\News\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Table;

class NewsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                \Filament\Tables\Columns\TextColumn::make('id')
                    ->label('No')
                    ->sortable(),
                \Filament\Tables\Columns\ImageColumn::make('image')
                    ->label('Thumbnail')
                    ->disk('public')
                    ->height(60)
                    ->width(90)
                    ->defaultImageUrl(asset('images/logo-jdih.webp')),
                \Filament\Tables\Columns\TextColumn::make('title')
                    ->label('Judul Berita')
                    ->wrap()
                    ->searchable(),
                \Filament\Tables\Columns\TextColumn::make('category')
                    ->label('Kategori')
                    ->badge()
                    ->color('info')
                    ->searchable(),
                \Filament\Tables\Columns\TextColumn::make('published_at')
                    ->label('Tgl Publish')
                    ->dateTime('d M Y H:i')
                    ->sortable(),
                \Filament\Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'published' => 'success',
                        'draft' => 'gray',
                        'archived' => 'warning',
                        default => 'gray',
                    }),
            ])
            ->filters([
                \Filament\Tables\Filters\Filter::make('judul_filter')
                    ->form([
                        \Filament\Forms\Components\TextInput::make('title')
                            ->label('Cari Berita')
                            ->placeholder('Masukkan judul berita...'),
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
                \Filament\Actions\ViewAction::make()->label('Detail')->color('info')->icon('heroicon-m-eye')->button(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
