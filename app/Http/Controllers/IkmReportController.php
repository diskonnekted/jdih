<?php

namespace App\Http\Controllers;

use App\Models\CommunitySatisfaction;
use Illuminate\Http\Request;

class IkmReportController extends Controller
{
    public function download()
    {
        $first = CommunitySatisfaction::first();
        
        if (!$first) {
            return back()->with('error', 'Tidak ada data IKM untuk diunduh.');
        }

        $filename = "rekap_ikm_" . date('Y-m-d') . ".csv";
        
        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$filename",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];

        $columns = [
            'ID', 'Gender', 'Usia', 'Pendidikan', 'Pekerjaan', 
            'U1', 'U2', 'U3', 'U4', 'U5', 'U6', 'U7', 'U8', 'U9', 
            'Saran', 'Tanggal'
        ];

        $callback = function() use ($columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            CommunitySatisfaction::cursor()->each(function ($row) use ($file) {
                fputcsv($file, [
                    $row->id,
                    $row->gender,
                    $row->age_group,
                    $row->education,
                    $row->occupation,
                    $row->u1, $row->u2, $row->u3, $row->u4, $row->u5, $row->u6, $row->u7, $row->u8, $row->u9,
                    $row->suggestion,
                    $row->created_at
                ]);
            });

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function print()
    {
        $stats = CommunitySatisfaction::selectRaw(
            'COUNT(*) as count,
             AVG(u1) as avg_u1, AVG(u2) as avg_u2, AVG(u3) as avg_u3, AVG(u4) as avg_u4,
             AVG(u5) as avg_u5, AVG(u6) as avg_u6, AVG(u7) as avg_u7, AVG(u8) as avg_u8, AVG(u9) as avg_u9'
        )->first();
        
        $count = $stats->count ?? 0;
        $averages = [
            'u1' => $stats->avg_u1 ?? 0,
            'u2' => $stats->avg_u2 ?? 0,
            'u3' => $stats->avg_u3 ?? 0,
            'u4' => $stats->avg_u4 ?? 0,
            'u5' => $stats->avg_u5 ?? 0,
            'u6' => $stats->avg_u6 ?? 0,
            'u7' => $stats->avg_u7 ?? 0,
            'u8' => $stats->avg_u8 ?? 0,
            'u9' => $stats->avg_u9 ?? 0,
        ];

        $totalAvg = array_sum($averages) / 9;
        $ikmValue = $totalAvg * 25; // Skala 100

        // Load data sample untuk detail report (max 1000 untuk memory efficiency)
        $data = CommunitySatisfaction::take(1000)->get();

        return view('reports.ikm', compact('data', 'averages', 'count', 'ikmValue'));
    }
}
