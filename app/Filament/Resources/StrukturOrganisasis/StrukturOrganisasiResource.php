<?php

namespace App\Filament\Resources\StrukturOrganisasis;

use App\Models\ProfileItem;
use App\Filament\Resources\StrukturOrganisasis\Pages\ManageStrukturOrganisasis;
use App\Filament\Resources\StrukturOrganisasis\Schemas\StrukturOrganisasiForm;
use App\Filament\Resources\StrukturOrganisasis\Tables\StrukturOrganisasisTable;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class StrukturOrganisasiResource extends Resource
{
    protected static ?string $model = ProfileItem::class;

    protected static ?string $modelLabel = 'Struktur Organisasi';
    protected static ?string $pluralModelLabel = 'Struktur Organisasi';
    protected static ?string $navigationLabel = 'Struktur Organisasi';

    protected static \BackedEnum|string|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static \UnitEnum|string|null $navigationGroup = 'Profil JDIH';

    protected static ?int $navigationSort = 2;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return StrukturOrganisasiForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return StrukturOrganisasisTable::configure($table);
    }

    public static function getEloquentQuery(): \Illuminate\Database\Eloquent\Builder
    {
        return parent::getEloquentQuery()->where('slug', 'struktur-organisasi');
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageStrukturOrganisasis::route('/'),
        ];
    }
}
