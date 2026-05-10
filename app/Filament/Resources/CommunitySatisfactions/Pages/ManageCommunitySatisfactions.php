<?php

namespace App\Filament\Resources\CommunitySatisfactions\Pages;

use App\Filament\Resources\CommunitySatisfactions\CommunitySatisfactionResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageCommunitySatisfactions extends ManageRecords
{
    protected static string $resource = CommunitySatisfactionResource::class;

    public function getTitle(): string|\Illuminate\Contracts\Support\Htmlable
    {
        return 'Indeks Kepuasan Masyarakat (IKM)';
    }

    protected function getHeaderActions(): array
    {
        return [
            \Filament\Actions\Action::make('download_recap')
                ->label('Rekap IKM (CSV)')
                ->color('success')
                ->icon('heroicon-o-document-arrow-down')
                ->url(fn() => route('admin.ikm.download')),
            \Filament\Actions\Action::make('print_report')
                ->label('Cetak Laporan')
                ->color('info')
                ->icon('heroicon-o-printer')
                ->url(fn() => route('admin.ikm.print'))
                ->openUrlInNewTab(),
            CreateAction::make()->label('Tambah Data IKM'),
        ];
    }
}
