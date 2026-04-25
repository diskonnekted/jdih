<?php

namespace App\Filament\Resources\VisiMisis;

use App\Models\ProfileItem;
use App\Filament\Resources\VisiMisis\Pages\ManageVisiMisis;
use App\Filament\Resources\VisiMisis\Schemas\VisiMisiForm;
use App\Filament\Resources\VisiMisis\Tables\VisiMisisTable;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class VisiMisiResource extends Resource
{
    protected static ?string $model = ProfileItem::class;

    protected static ?string $slug = 'visi-misi';

    protected static ?string $modelLabel = 'Visi Misi';
    protected static ?string $pluralModelLabel = 'Visi Misi';
    protected static ?string $navigationLabel = 'Visi Misi';

    protected static \BackedEnum|string|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static \UnitEnum|string|null $navigationGroup = 'Profil Instansi';

    protected static ?int $navigationSort = 1;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return VisiMisiForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return VisiMisisTable::configure($table);
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->where('slug', 'visi-misi');
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageVisiMisis::route('/'),
        ];
    }
}
