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
            CreateAction::make()->label('Tambah Data IKM'),
        ];
    }
}
