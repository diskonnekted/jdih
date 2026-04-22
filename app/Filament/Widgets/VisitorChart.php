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
            //
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
