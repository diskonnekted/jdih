<?php

namespace App\Http\Controllers;

use App\Models\CommunitySatisfaction;
use Illuminate\Http\Request;

class IkmReportController extends Controller
{
    public function download()
    {
        $data = CommunitySatisfaction::all();
        
        if ($data->isEmpty()) {
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

        $callback = function() use($data, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach ($data as $row) {
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
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function print()
    {
        $data = CommunitySatisfaction::all();
        $count = $data->count();
        
        $averages = [
            'u1' => $data->avg('u1'),
            'u2' => $data->avg('u2'),
            'u3' => $data->avg('u3'),
            'u4' => $data->avg('u4'),
            'u5' => $data->avg('u5'),
            'u6' => $data->avg('u6'),
            'u7' => $data->avg('u7'),
            'u8' => $data->avg('u8'),
            'u9' => $data->avg('u9'),
        ];

        $totalAvg = array_sum($averages) / 9;
        $ikmValue = $totalAvg * 25; // Skala 100

        return view('reports.ikm', compact('data', 'averages', 'count', 'ikmValue'));
    }
}
