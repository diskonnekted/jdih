<?php

namespace App\Filament\Resources\DasarHukums;

use App\Models\ProfileItem;
use App\Filament\Resources\DasarHukums\Pages\ManageDasarHukums;
use App\Filament\Resources\DasarHukums\Schemas\DasarHukumForm;
use App\Filament\Resources\DasarHukums\Tables\DasarHukumsTable;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class DasarHukumResource extends Resource
{
    protected static ?string $model = ProfileItem::class;

    protected static ?string $modelLabel = 'Dasar Hukum';
    protected static ?string $pluralModelLabel = 'Dasar Hukum';
    protected static ?string $navigationLabel = 'Dasar Hukum';

    protected static \BackedEnum|string|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static \UnitEnum|string|null $navigationGroup = 'Profil Instansi';

    protected static ?int $navigationSort = 4;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return DasarHukumForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return DasarHukumsTable::configure($table);
    }

    public static function getEloquentQuery(): \Illuminate\Database\Eloquent\Builder
    {
        return parent::getEloquentQuery()->where('slug', 'dasar-hukum');
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageDasarHukums::route('/'),
        ];
    }
}
