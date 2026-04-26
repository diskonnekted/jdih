<?php

namespace App\Filament\Resources\LegalConsultations;

use App\Filament\Resources\LegalConsultations\Pages\CreateLegalConsultation;
use App\Filament\Resources\LegalConsultations\Pages\EditLegalConsultation;
use App\Filament\Resources\LegalConsultations\Pages\ListLegalConsultations;
use App\Filament\Resources\LegalConsultations\Pages\ViewLegalConsultation;
use App\Filament\Resources\LegalConsultations\Schemas\LegalConsultationForm;
use App\Filament\Resources\LegalConsultations\Schemas\LegalConsultationInfolist;
use App\Filament\Resources\LegalConsultations\Tables\LegalConsultationsTable;
use App\Models\LegalConsultation;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class LegalConsultationResource extends Resource
{
    protected static ?string $model = LegalConsultation::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return LegalConsultationForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return LegalConsultationInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return LegalConsultationsTable::configure($table);
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
            'index' => ListLegalConsultations::route('/'),
            'create' => CreateLegalConsultation::route('/create'),
            'view' => ViewLegalConsultation::route('/{record}'),
            'edit' => EditLegalConsultation::route('/{record}/edit'),
        ];
    }
}
