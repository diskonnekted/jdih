<?php

namespace App\Filament\Resources\LegalDecisions;

use App\Models\LegalDecision;

use App\Filament\Resources\LegalDecisions\Pages\CreateLegalDecision;
use App\Filament\Resources\LegalDecisions\Pages\EditLegalDecision;
use App\Filament\Resources\LegalDecisions\Pages\ListLegalDecisions;
use App\Filament\Resources\LegalDecisions\Schemas\LegalDecisionForm;
use App\Filament\Resources\LegalDecisions\Tables\LegalDecisionsTable;

use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class LegalDecisionResource extends Resource
{
    protected static ?string $model = LegalDecision::class;

    protected static ?string $modelLabel = 'Putusan Hukum';
    protected static ?string $pluralModelLabel = 'Putusan Hukum';
    protected static ?string $navigationLabel = 'Putusan Hukum';

    protected static ?string $navigationGroup = 'Produk Hukum';

    protected static ?int $navigationSort = 2;


protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return LegalDecisionForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return LegalDecisionsTable::configure($table);
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
            'index' => ListLegalDecisions::route('/'),
            'create' => CreateLegalDecision::route('/create'),
            'edit' => EditLegalDecision::route('/{record}/edit'),
        ];
    }
}

