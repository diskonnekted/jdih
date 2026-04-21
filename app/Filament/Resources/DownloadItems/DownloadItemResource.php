<?php

namespace App\Filament\Resources\DownloadItems;

use App\Models\DownloadItem;

use App\Filament\Resources\DownloadItems\Pages\CreateDownloadItem;
use App\Filament\Resources\DownloadItems\Pages\EditDownloadItem;
use App\Filament\Resources\DownloadItems\Pages\ListDownloadItems;
use App\Filament\Resources\DownloadItems\Schemas\DownloadItemForm;
use App\Filament\Resources\DownloadItems\Tables\DownloadItemsTable;

use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class DownloadItemResource extends Resource
{
    protected static ?string $model = DownloadItem::class;

    protected static \BackedEnum|string|null $navigationIcon = Heroicon::OutlinedArrowDownTray;

    protected static ?string $navigationLabel = 'Management Download';

    protected static \UnitEnum|string|null $navigationGroup = 'Data Master';

    protected static ?int $navigationSort = 8;


protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return DownloadItemForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return DownloadItemsTable::configure($table);
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
            'index' => ListDownloadItems::route('/'),
            'create' => CreateDownloadItem::route('/create'),
            'edit' => EditDownloadItem::route('/{record}/edit'),
        ];
    }
}

