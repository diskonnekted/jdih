<?php

namespace App\Filament\Resources\KedudukanAlamats;

use App\Models\ProfileItem;
use App\Filament\Resources\KedudukanAlamats\Pages\ManageKedudukanAlamats;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\RichEditor;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class KedudukanAlamatResource extends Resource
{
    protected static ?string $model = ProfileItem::class;

    protected static \BackedEnum|string|null $navigationIcon = Heroicon::OutlinedMapPin;

    protected static ?string $navigationLabel = 'Kedudukan dan Alamat';

    protected static \UnitEnum|string|null $navigationGroup = 'Data Master Profile JDIH';

    protected static ?int $navigationSort = 4;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                RichEditor::make('content')
                    ->required()
                    ->columnSpanFull(),
            ]);
    }

    public static function getEloquentQuery(): \Illuminate\Database\Eloquent\Builder
    {
        return parent::getEloquentQuery()->where('slug', 'kedudukan-alamat');
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title'),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->label('Terakhir Diubah'),
            ])
            ->actions([
                \Filament\Tables\Actions\EditAction::make()->button()->color('success'),
            ])
            ->bulkActions([]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageKedudukanAlamats::route('/'),
        ];
    }
}
