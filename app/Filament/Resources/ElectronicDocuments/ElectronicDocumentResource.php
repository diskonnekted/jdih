<?php

namespace App\Filament\Resources\ElectronicDocuments;

use App\Models\ElectronicDocument;

use App\Filament\Resources\ElectronicDocuments\Pages\CreateElectronicDocument;
use App\Filament\Resources\ElectronicDocuments\Pages\EditElectronicDocument;
use App\Filament\Resources\ElectronicDocuments\Pages\ListElectronicDocuments;
use App\Filament\Resources\ElectronicDocuments\Schemas\ElectronicDocumentForm;
use App\Filament\Resources\ElectronicDocuments\Tables\ElectronicDocumentsTable;

use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ElectronicDocumentResource extends Resource
{
    protected static ?string $model = ElectronicDocument::class;

    protected static \BackedEnum|string|null $navigationIcon = Heroicon::OutlinedDocumentText;

    protected static ?string $navigationLabel = 'Management PH elektronik';

    protected static \UnitEnum|string|null $navigationGroup = 'Produk Hukum';

    protected static ?int $navigationSort = 4;


protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return ElectronicDocumentForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ElectronicDocumentsTable::configure($table);
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
            'index' => ListElectronicDocuments::route('/'),
            'create' => CreateElectronicDocument::route('/create'),
            'edit' => EditElectronicDocument::route('/{record}/edit'),
        ];
    }
}

