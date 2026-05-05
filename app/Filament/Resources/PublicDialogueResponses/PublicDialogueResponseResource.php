<?php

namespace App\Filament\Resources\PublicDialogueResponses;

use App\Filament\Resources\PublicDialogueResponses\Pages\CreatePublicDialogueResponse;
use App\Filament\Resources\PublicDialogueResponses\Pages\EditPublicDialogueResponse;
use App\Filament\Resources\PublicDialogueResponses\Pages\ListPublicDialogueResponses;
use App\Filament\Resources\PublicDialogueResponses\Schemas\PublicDialogueResponseForm;
use App\Filament\Resources\PublicDialogueResponses\Tables\PublicDialogueResponsesTable;
use App\Models\PublicDialogueResponse;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class PublicDialogueResponseResource extends Resource
{
    protected static ?string $model = PublicDialogueResponse::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedInboxArrowDown;

    protected static ?string $navigationLabel = 'Aspirasi Masyarakat';

    protected static \UnitEnum|string|null $navigationGroup = 'Layanan & Interaksi';

    protected static ?int $navigationSort = 2;

    protected static ?string $recordTitleAttribute = 'full_name';

    public static function form(Schema $schema): Schema
    {
        return PublicDialogueResponseForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PublicDialogueResponsesTable::configure($table);
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::where('status', 'pending')->count() ?: null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'warning';
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
            'index' => ListPublicDialogueResponses::route('/'),
            'create' => CreatePublicDialogueResponse::route('/create'),
            'edit' => EditPublicDialogueResponse::route('/{record}/edit'),
        ];
    }
}
