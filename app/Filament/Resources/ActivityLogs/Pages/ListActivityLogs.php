<?php

namespace App\Filament\Resources\ActivityLogs\Pages;

use App\Filament\Resources\ActivityLogs\ActivityLogResource;
use Filament\Resources\Pages\ListRecords;
use Filament\Actions\Action;

class ListActivityLogs extends ListRecords
{
    protected static string $resource = ActivityLogResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Action::make('clear_old')
                ->label('Hapus Log >90 Hari')
                ->color('danger')
                ->icon('heroicon-o-trash')
                ->requiresConfirmation()
                ->modalDescription('Log aktivitas lebih dari 90 hari yang lalu akan dihapus permanen. Lanjutkan?')
                ->action(function () {
                    $deleted = \App\Models\ActivityLog::where('created_at', '<', now()->subDays(90))->delete();
                    \Filament\Notifications\Notification::make()
                        ->title("{$deleted} log lama berhasil dihapus.")
                        ->success()
                        ->send();
                }),
        ];
    }
}
