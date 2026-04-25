<?php

namespace App\Filament\Resources\VideoContents;

use App\Models\VideoContent;

use App\Filament\Resources\VideoContents\Pages\CreateVideoContent;
use App\Filament\Resources\VideoContents\Pages\EditVideoContent;
use App\Filament\Resources\VideoContents\Pages\ListVideoContents;
use App\Filament\Resources\VideoContents\Schemas\VideoContentForm;
use App\Filament\Resources\VideoContents\Tables\VideoContentsTable;

use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class VideoContentResource extends Resource
{
    protected static ?string $model = VideoContent::class;

    protected static \BackedEnum|string|null $navigationIcon = Heroicon::OutlinedVideoCamera;

    protected static ?string $navigationLabel = 'Management Video Konten';

    protected static ?string $navigationGroup = 'Berita & Media';

    protected static ?int $navigationSort = 9;


protected static ?string $recordTitleAttribute = 'title';

    public static function form(Schema $schema): Schema
    {
        return VideoContentForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return VideoContentsTable::configure($table);
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
            'index' => ListVideoContents::route('/'),
            'create' => CreateVideoContent::route('/create'),
            'edit' => EditVideoContent::route('/{record}/edit'),
        ];
    }
}

