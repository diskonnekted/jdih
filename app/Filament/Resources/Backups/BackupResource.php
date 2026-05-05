<?php

namespace App\Filament\Resources\Backups;

use App\Filament\Resources\Backups\Pages\ListBackups;
use Filament\Resources\Resource;

class BackupResource extends Resource
{
    // Model-less resource — data dari filesystem
    protected static ?string $model = null;

    protected static ?string $navigationLabel  = 'Backup Database';
    protected static ?string $modelLabel       = 'Backup';
    protected static ?string $pluralModelLabel = 'Backup Database';
    protected static ?int    $navigationSort   = 99;

    public static function getNavigationGroup(): ?string { return 'Sistem'; }
    public static function getNavigationIcon(): string   { return 'heroicon-o-circle-stack'; }
    public static function canCreate(): bool             { return false; }

    public static function getPages(): array
    {
        return [
            'index' => ListBackups::route('/'),
        ];
    }
}
