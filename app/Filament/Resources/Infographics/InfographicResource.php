<?php

namespace App\Filament\Resources\Infographics;

use App\Filament\Resources\Infographics\Pages\CreateInfographic;
use App\Filament\Resources\Infographics\Pages\EditInfographic;
use App\Filament\Resources\Infographics\Pages\ListInfographics;
use App\Filament\Resources\Infographics\Schemas\InfographicForm;
use App\Filament\Resources\Infographics\Tables\InfographicsTable;
use App\Models\Infographic;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class InfographicResource extends Resource
{
    protected static ?string $model = Infographic::class;

    protected static ?string $modelLabel = 'Infografis';
    protected static ?string $pluralModelLabel = 'Infografis';
    protected static ?string $navigationLabel = 'Infografis';
    protected static \UnitEnum|string|null $navigationGroup = 'Berita & Media';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return InfographicForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return InfographicsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListInfographics::route('/'),
            'create' => CreateInfographic::route('/create'),
            'edit' => EditInfographic::route('/{record}/edit'),
        ];
    }
}
