<?php

namespace App\Filament\Widgets;

use Filament\Widgets\ChartWidget;

class VisitorChart extends ChartWidget
{
    protected ?string $heading = 'Visitor Chart';

    protected static ?int $sort = 2;

    protected int | string | array $columnSpan = 1;

    protected function getData(): array
    {
        return [
            'datasets' => [
                [
                    'label' => 'Pengunjung Situs',
                    'data' => [450, 590, 800, 810, 560, 550, 780],
                    'fill' => 'start',
                    'borderColor' => '#003399',
                    'backgroundColor' => 'rgba(0, 51, 153, 0.1)',
                    'tension' => 0.4,
                ],
            ],
            'labels' => ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
