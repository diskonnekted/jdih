<?php

namespace App\Filament\Resources\PublicDialogues;

use App\Filament\Resources\PublicDialogues\Pages\CreatePublicDialogue;
use App\Filament\Resources\PublicDialogues\Pages\EditPublicDialogue;
use App\Filament\Resources\PublicDialogues\Pages\ListPublicDialogues;
use App\Filament\Resources\PublicDialogues\Schemas\PublicDialogueForm;
use App\Filament\Resources\PublicDialogues\Tables\PublicDialoguesTable;
use App\Models\PublicDialogue;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class PublicDialogueResource extends Resource
{
    protected static ?string $model = PublicDialogue::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedChatBubbleLeftRight;

    protected static ?string $navigationLabel = 'Topik Dialog Publik';

    protected static \UnitEnum|string|null $navigationGroup = 'Layanan Hukum';

    protected static ?int $navigationSort = 1;

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return PublicDialogueForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PublicDialoguesTable::configure($table);
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
            'index' => ListPublicDialogues::route('/'),
            'create' => CreatePublicDialogue::route('/create'),
            'edit' => EditPublicDialogue::route('/{record}/edit'),
        ];
    }
}
