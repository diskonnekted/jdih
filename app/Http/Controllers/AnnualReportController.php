<?php

namespace App\Http\Controllers;

use App\Models\AnnualReport;
use App\Models\LegalDocument;
use App\Models\JdihMember;
use App\Models\Infrastructure;
use Illuminate\Http\Request;

class AnnualReportController extends Controller
{
    /**
     * Store annual report.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'year' => 'required|integer|min:2020|max:' . (date('Y') + 1),
            'organization_name' => 'required|string|max:255',
            'organization_unit' => 'required|string|max:255',
            'legal_basis' => 'required|string',
            'total_documents' => 'required|integer|min:0',
            'total_regulations' => 'required|integer|min:0',
            'total_decisions' => 'required|integer|min:0',
            'total_articles' => 'required|integer|min:0',
            'total_monographs' => 'required|integer|min:0',
            'total_academic_documents' => 'required|integer|min:0',
            'total_staff' => 'required|integer|min:0',
            'staff_with_education' => 'required|integer|min:0',
            'staff_with_training' => 'required|integer|min:0',
            'rooms_available' => 'required|integer|min:0',
            'computers_available' => 'required|integer|min:0',
            'internet_available' => 'required|boolean',
            'scanner_available' => 'required|boolean',
            'printer_available' => 'required|boolean',
            'digital_storage_available' => 'required|boolean',
            'features_implemented' => 'array',
            'innovations' => 'array',
            'submission_status' => 'in:draft|submitted',
        ]);

        $report = AnnualReport::updateOrCreate(
            ['year' => $validated['year']],
            $validated
        );

        return response()->json([
            'success' => true,
            'message' => 'Laporan tahunan berhasil disimpan.',
            'data' => $report,
        ]);
    }

    /**
     * Download annual report as PDF-ready JSON.
     */
    public function download(Request $request)
    {
        $year = $request->get('year', date('Y'));
        
        $report = AnnualReport::where('year', $year)->first();
        
        if (!$report) {
            // Generate report from current data
            $report = $this->generateReportData($year);
        }

        return response()->json([
            'success' => true,
            'data' => $report,
        ])->header('Content-Disposition', 'attachment; filename="laporan-tahunan-jdih-' . $year . '.json"');
    }

    /**
     * Generate report data from current database.
     */
    protected function generateReportData(int $year): array
    {
        // Count documents by type
        $docs = LegalDocument::whereYear('published_at', $year);
        
        return [
            'year' => $year,
            'generated_at' => now()->toISOString(),
            'statistics' => [
                'total_documents' => LegalDocument::count(),
                'documents_added_this_year' => (clone $docs)->count(),
                'total_regulations' => LegalDocument::where('document_type', 'Peraturan Perundang-undangan')->count(),
                'total_decisions' => LegalDocument::where('document_type', 'Keputusan')->count(),
                'total_articles' => LegalDocument::where('document_type', 'Artikel Hukum')->count(),
                'total_monographs' => LegalDocument::where('document_type', 'Monografi Hukum')->count(),
                'staff_count' => JdihMember::count(),
                'infrastructure_items' => Infrastructure::count(),
                'active_infrastructure' => Infrastructure::where('is_active', true)->count(),
            ],
        ];
    }
}
