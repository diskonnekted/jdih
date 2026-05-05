<?php

namespace App\Filament\Resources\KedudukanAlamats;

use App\Models\ProfileItem;
use App\Filament\Resources\KedudukanAlamats\Pages\ManageKedudukanAlamats;
use App\Filament\Resources\KedudukanAlamats\Schemas\KedudukanAlamatForm;
use App\Filament\Resources\KedudukanAlamats\Tables\KedudukanAlamatsTable;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class KedudukanAlamatResource extends Resource
{
    protected static ?string $model = ProfileItem::class;

    protected static ?string $modelLabel = 'Kedudukan dan Alamat';
    protected static ?string $pluralModelLabel = 'Kedudukan dan Alamat';
    protected static ?string $navigationLabel = 'Kedudukan dan Alamat';

    protected static \BackedEnum|string|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static \UnitEnum|string|null $navigationGroup = 'Profil JDIH';

    protected static ?int $navigationSort = 6;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return KedudukanAlamatForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return KedudukanAlamatsTable::configure($table);
    }

    public static function getEloquentQuery(): \Illuminate\Database\Eloquent\Builder
    {
        return parent::getEloquentQuery()->where('slug', 'kedudukan-alamat');
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageKedudukanAlamats::route('/'),
        ];
    }
}
