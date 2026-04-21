<?php

namespace App\Filament\Widgets;

use App\Models\LegalDocument;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class LegalDocumentChartWidget extends ChartWidget
{
    protected ?string $heading = 'Statistik Produk Hukum per Tahun';

    protected static ?int $sort = 3;

    protected function getData(): array
    {
        $data = LegalDocument::select('year', DB::raw('count(*) as total'))
            ->groupBy('year')
            ->orderBy('year', 'desc')
            ->limit(7)
            ->get()
            ->reverse();

        $years = $data->pluck('year')->toArray();
        $counts = $data->pluck('total')->toArray();

        return [
            'datasets' => [
                [
                    'label' => 'Total Dokumen',
                    'data' => $counts,
                    'backgroundColor' => ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f43f5e'],
                    'borderRadius' => 6,
                ],
            ],
            'labels' => $years,
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}
