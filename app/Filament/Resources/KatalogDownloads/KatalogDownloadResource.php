<?php

namespace App\Filament\Resources\KatalogDownloads;

use App\Models\KatalogDownload;

use App\Filament\Resources\KatalogDownloads\Pages\CreateKatalogDownload;
use App\Filament\Resources\KatalogDownloads\Pages\EditKatalogDownload;
use App\Filament\Resources\KatalogDownloads\Pages\ListKatalogDownloads;
use App\Filament\Resources\KatalogDownloads\Schemas\KatalogDownloadForm;
use App\Filament\Resources\KatalogDownloads\Tables\KatalogDownloadsTable;

use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class KatalogDownloadResource extends Resource
{
    protected static ?string $model = KatalogDownload::class;

    protected static ?string $modelLabel = 'File Unduhan';
    protected static ?string $pluralModelLabel = 'Pusat Unduhan';
    protected static ?string $navigationLabel = 'Pusat Unduhan';

    protected static \UnitEnum|string|null $navigationGroup = null;

    protected static ?int $navigationSort = 5;


protected static ?string $recordTitleAttribute = 'no';

    public static function form(Schema $schema): Schema
    {
        return KatalogDownloadForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return KatalogDownloadsTable::configure($table);
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
            'index' => ListKatalogDownloads::route('/'),
            'create' => CreateKatalogDownload::route('/create'),
            'edit' => EditKatalogDownload::route('/{record}/edit'),
        ];
    }
}

