<?php

namespace App\Filament\Widgets;

use Filament\Widgets\ChartWidget;

class VisitorChart extends ChartWidget
{
    protected ?string $heading = 'Grafik Pengunjung JDIH';

    protected static ?int $sort = 3;

    protected function getData(): array
    {
        return [
            'datasets' => [
                [
                    'label' => 'Pengunjung',
                    'data' => [400, 800, 500, 1200, 600, 2500, 1500, 3000, 4500, 2000, 1000, 500],
                    'borderColor' => '#1e3a8a',
                    'fill' => 'start',
                    'backgroundColor' => 'rgba(30, 58, 138, 0.1)',
                    'tension' => 0.4,
                ],
            ],
            'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
