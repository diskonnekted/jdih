<?php

namespace App\Filament\Resources\Tupoksis;

use App\Models\ProfileItem;
use App\Filament\Resources\Tupoksis\Pages\ManageTupoksis;
use App\Filament\Resources\Tupoksis\Schemas\TupoksiForm;
use App\Filament\Resources\Tupoksis\Tables\TupoksisTable;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class TupoksiResource extends Resource
{
    protected static ?string $model = ProfileItem::class;

    protected static ?string $modelLabel = 'Tupoksi Bagian Hukum';
    protected static ?string $pluralModelLabel = 'Tupoksi Bagian Hukum';
    protected static ?string $navigationLabel = 'Tupoksi Bagian Hukum';

    protected static \BackedEnum|string|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static \UnitEnum|string|null $navigationGroup = 'Profil Instansi';

    protected static ?int $navigationSort = 3;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return TupoksiForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return TupoksisTable::configure($table);
    }

    public static function getEloquentQuery(): \Illuminate\Database\Eloquent\Builder
    {
        return parent::getEloquentQuery()->where('slug', 'tupoksi');
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageTupoksis::route('/'),
        ];
    }
}
