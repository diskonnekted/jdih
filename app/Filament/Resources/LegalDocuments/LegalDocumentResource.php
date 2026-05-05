<?php

namespace App\Filament\Resources\LegalDocuments;

use App\Models\LegalDocument;

use App\Filament\Resources\LegalDocuments\Pages\CreateLegalDocument;
use App\Filament\Resources\LegalDocuments\Pages\EditLegalDocument;
use App\Filament\Resources\LegalDocuments\Pages\ListLegalDocuments;
use App\Filament\Resources\LegalDocuments\Pages\ViewLegalDocument;
use App\Filament\Resources\LegalDocuments\Schemas\LegalDocumentForm;
use App\Filament\Resources\LegalDocuments\Schemas\LegalDocumentInfolist;
use App\Filament\Resources\LegalDocuments\Tables\LegalDocumentsTable;

use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class LegalDocumentResource extends Resource
{
    protected static ?string $model = LegalDocument::class;

    protected static ?string $modelLabel = 'Produk Hukum';
    protected static ?string $pluralModelLabel = 'Produk Hukum';
    protected static \UnitEnum|string|null $navigationGroup = 'Produk Hukum';
    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-scale';
    protected static ?string $navigationLabel = 'Produk Hukum';
    protected static ?int $navigationSort = 1;

    

    

    

    

    

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return LegalDocumentForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return LegalDocumentInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return LegalDocumentsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            RelationManagers\RelatedDocumentsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListLegalDocuments::route('/'),
            'create' => CreateLegalDocument::route('/create'),
            'view' => ViewLegalDocument::route('/{record}'),
            'edit' => EditLegalDocument::route('/{record}/edit'),
        ];
    }
}

