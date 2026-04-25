<?php

namespace App\Filament\Resources\CommunitySatisfactions;

use App\Filament\Resources\CommunitySatisfactions\Pages\ManageCommunitySatisfactions;
use App\Models\CommunitySatisfaction;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Infolists\Components\TextEntry;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class CommunitySatisfactionResource extends Resource
{
    protected static ?string $modelLabel = 'Data IKM';
    protected static ?string $pluralModelLabel = 'Indeks Kepuasan Masyarakat (IKM)';
    protected static ?string $navigationLabel = 'IKM (Survey Kepuasan)';
    protected static \BackedEnum|string|null $navigationGroup = 'Layanan & Interaksi';

    protected static ?string $recordTitleAttribute = 'gender';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('gender')
                    ->default(null),
                TextInput::make('age_group')
                    ->default(null),
                TextInput::make('education')
                    ->default(null),
                TextInput::make('occupation')
                    ->default(null),
                TextInput::make('u1')
                    ->required()
                    ->numeric(),
                TextInput::make('u2')
                    ->required()
                    ->numeric(),
                TextInput::make('u3')
                    ->required()
                    ->numeric(),
                TextInput::make('u4')
                    ->required()
                    ->numeric(),
                TextInput::make('u5')
                    ->required()
                    ->numeric(),
                TextInput::make('u6')
                    ->required()
                    ->numeric(),
                TextInput::make('u7')
                    ->required()
                    ->numeric(),
                TextInput::make('u8')
                    ->required()
                    ->numeric(),
                TextInput::make('u9')
                    ->required()
                    ->numeric(),
                Textarea::make('suggestion')
                    ->default(null)
                    ->columnSpanFull(),
            ]);
    }

    public static function infolist(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('gender')
                    ->placeholder('-'),
                TextEntry::make('age_group')
                    ->placeholder('-'),
                TextEntry::make('education')
                    ->placeholder('-'),
                TextEntry::make('occupation')
                    ->placeholder('-'),
                TextEntry::make('u1')
                    ->numeric(),
                TextEntry::make('u2')
                    ->numeric(),
                TextEntry::make('u3')
                    ->numeric(),
                TextEntry::make('u4')
                    ->numeric(),
                TextEntry::make('u5')
                    ->numeric(),
                TextEntry::make('u6')
                    ->numeric(),
                TextEntry::make('u7')
                    ->numeric(),
                TextEntry::make('u8')
                    ->numeric(),
                TextEntry::make('u9')
                    ->numeric(),
                TextEntry::make('suggestion')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('gender')
            ->columns([
                TextColumn::make('gender')
                    ->searchable(),
                TextColumn::make('age_group')
                    ->searchable(),
                TextColumn::make('education')
                    ->searchable(),
                TextColumn::make('occupation')
                    ->searchable(),
                TextColumn::make('u1')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('u2')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('u3')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('u4')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('u5')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('u6')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('u7')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('u8')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('u9')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageCommunitySatisfactions::route('/'),
        ];
    }
}
