<?php

namespace App\Filament\Resources\Aspirations;

use App\Filament\Resources\Aspirations\Pages;
use App\Models\Aspiration;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Resources\Resource;

class AspirationResource extends Resource
{
    protected static ?string $model = Aspiration::class;

    protected static ?string $modelLabel = 'Aspirasi Masyarakat';
    protected static ?string $pluralModelLabel = 'Aspirasi Masyarakat';
    protected static ?string $navigationLabel = 'Aspirasi';
    protected static \UnitEnum|string|null $navigationGroup = 'Layanan & Interaksi';
    protected static ?int $navigationSort = 1;

    public static function getNavigationIcon(): string
    {
        return 'heroicon-o-chat-bubble-left-ellipsis';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->schema([
                TextInput::make('full_name')
                    ->label('Nama Lengkap')
                    ->disabled(),

                Textarea::make('address')
                    ->label('Alamat')
                    ->disabled(),

                Textarea::make('suggestion')
                    ->label('Aspirasi')
                    ->disabled(),

                Select::make('status')
                    ->label('Status')
                    ->options([
                        'pending' => 'Menunggu',
                        'reviewed' => 'Ditinjau',
                        'responded' => 'Ditanggapi',
                        'rejected' => 'Ditolak',
                    ])
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('full_name')
                    ->label('Nama')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('address')
                    ->label('Alamat')
                    ->limit(50),

                TextColumn::make('suggestion')
                    ->label('Aspirasi')
                    ->limit(100),

                BadgeColumn::make('status')
                    ->label('Status')
                    ->colors([
                        'warning' => 'pending',
                        'info' => 'reviewed',
                        'success' => 'responded',
                        'danger' => 'rejected',
                    ])
                    ->formatStateUsing(fn ($state) => match($state) {
                        'pending' => 'Menunggu',
                        'reviewed' => 'Ditinjau',
                        'responded' => 'Ditanggapi',
                        'rejected' => 'Ditolak',
                        default => $state,
                    }),

                TextColumn::make('created_at')
                    ->label('Tanggal')
                    ->dateTime('d M Y'),
            ])
            ->defaultSort('created_at', 'desc')
            ->actions([
                EditAction::make(),
            ])
            ->bulkActions([
                \Filament\Actions\BulkActionGroup::make([
                    \Filament\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAspirations::route('/'),
            'edit' => Pages\EditAspiration::route('/{record}/edit'),
        ];
    }
}
