<?php

namespace App\Filament\Resources\Sops;

use App\Models\ProfileItem;
use App\Filament\Resources\Sops\Pages\ManageSops;
use App\Filament\Resources\Sops\Schemas\SopForm;
use App\Filament\Resources\Sops\Tables\SopsTable;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class SopResource extends Resource
{
    protected static ?string $model = ProfileItem::class;

    protected static ?string $modelLabel = 'SOP';
    protected static ?string $pluralModelLabel = 'SOP';
    protected static ?string $navigationLabel = 'SOP';

    protected static \BackedEnum|string|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static \UnitEnum|string|null $navigationGroup = 'Profil JDIH';

    protected static ?int $navigationSort = 7;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return SopForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return SopsTable::configure($table);
    }

    public static function getEloquentQuery(): \Illuminate\Database\Eloquent\Builder
    {
        return parent::getEloquentQuery()->where('slug', 'sop');
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageSops::route('/'),
        ];
    }
}
