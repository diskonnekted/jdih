<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LegalDocument;
use App\Models\JdihMember;
use App\Models\JdihSyncLog;
use App\Models\JdihApiSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class JdihSyncController extends Controller
{
    /**
     * Get JDIHN API settings.
     */
    public function getSettings()
    {
        $settings = JdihApiSetting::all()->pluck('value', 'key')->toArray();
        
        // Mask the API token for display
        if (isset($settings['jdihnh_api_token'])) {
            $token = $settings['jdihnh_api_token'];
            $settings['jdihnh_api_token'] = $token ? substr($token, 0, 8) . '****' . substr($token, -4) : null;
        }

        return response()->json([
            'success' => true,
            'data' => $settings,
        ]);
    }

    /**
     * Update JDIHN API settings.
     */
    public function updateSettings(Request $request)
    {
        $validated = $request->validate([
            'jdihnh_api_url' => 'nullable|url',
            'jdihnh_api_token' => 'nullable|string',
            'jdihnh_org_code' => 'nullable|string|max:50',
            'sync_enabled' => 'boolean',
            'sync_interval_hours' => 'integer|min:1|max:168',
            'sync_on_create_update' => 'boolean',
        ]);

        foreach ($validated as $key => $value) {
            $type = match ($key) {
                'sync_enabled', 'sync_on_create_update' => 'boolean',
                default => 'string',
            };
            JdihApiSetting::set($key, $value, $type);
        }

        return response()->json([
            'success' => true,
            'message' => 'Pengaturan API berhasil diperbarui.',
        ]);
    }

    /**
     * Sync documents to JDIHN Pusat.
     */
    public function syncDocuments(Request $request)
    {
        $syncLog = JdihSyncLog::create([
            'sync_type' => 'document',
            'direction' => 'outbound',
            'status' => 'processing',
            'total_records' => 0,
            'triggered_by' => $request->user() ? 'manual' : 'api',
            'api_token_name' => $request->user()?->name ?? 'system',
        ]);

        try {
            // Get documents modified since last successful sync
            $lastSync = JdihSyncLog::latestSuccessfulSync('document');
            $since = $lastSync ? $lastSync->created_at : now()->subDays(30);

            $query = LegalDocument::with('category')
                ->where('updated_at', '>=', $since)
                ->orderBy('updated_at', 'asc');

            $totalDocuments = $query->count();
            $syncLog->update(['total_records' => $totalDocuments]);

            $successCount = 0;
            $failedCount = 0;
            $payload = [];

            $documents = $query->get();

            foreach ($documents as $document) {
                $payloadItem = $this->formatDocumentForSync($document);
                $payload[] = $payloadItem;

                $result = $this->sendToJdihnh($payloadItem);

                if ($result['success']) {
                    $successCount++;
                } else {
                    $failedCount++;
                }
            }

            // Store payload for reference
            $syncLog->update([
                'payload' => json_encode($payload),
            ]);

            $syncLog->success($successCount);

            return response()->json([
                'success' => true,
                'message' => 'Sinkronisasi dokumen selesai.',
                'data' => [
                    'total' => $totalDocuments,
                    'success' => $successCount,
                    'failed' => $failedCount,
                ],
            ]);

        } catch (\Exception $e) {
            Log::error('JDIHN Sync failed: ' . $e->getMessage());
            $syncLog->failed($e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Sinkronisasi gagal: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Sync members to JDIHN Pusat.
     */
    public function syncMembers()
    {
        $syncLog = JdihSyncLog::create([
            'sync_type' => 'member',
            'direction' => 'outbound',
            'status' => 'processing',
            'triggered_by' => 'api',
        ]);

        try {
            $members = JdihMember::all();
            $payload = $members->map(fn($member) => [
                'name' => $member->name,
                'position' => $member->position,
                'education' => $member->education,
                'jft_jfu' => $member->jft_jfu,
                'training_history' => $member->training_history,
                'phone' => $member->phone,
                'email' => $member->email,
                'category' => $member->category,
                'url' => $member->url,
            ]);

            $successCount = 0;
            $failedCount = 0;

            foreach ($payload as $memberData) {
                $result = $this->sendToJdihnh($memberData, 'member');
                if ($result['success']) {
                    $successCount++;
                } else {
                    $failedCount++;
                }
            }

            $syncLog->update([
                'total_records' => count($payload),
                'success_records' => $successCount,
                'failed_records' => $failedCount,
                'payload' => json_encode($payload->toArray()),
            ]);

            $syncLog->success($successCount);

            return response()->json([
                'success' => true,
                'data' => [
                    'total' => count($payload),
                    'success' => $successCount,
                    'failed' => $failedCount,
                ],
            ]);

        } catch (\Exception $e) {
            $syncLog->failed($e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Sinkronisasi gagal: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get sync logs.
     */
    public function getSyncLogs(Request $request)
    {
        $query = JdihSyncLog::query();

        if ($request->has('sync_type')) {
            $query->where('sync_type', $request->sync_type);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $logs = $query->orderBy('created_at', 'desc')->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $logs,
        ]);
    }

    /**
     * Format document for JDIHN sync.
     */
    protected function formatDocumentForSync(LegalDocument $document): array
    {
        $orgCode = JdihApiSetting::get('jdihnh_org_code');

        return [
            'org_code' => $orgCode,
            'document_id' => $document->id,
            'title' => $document->title,
            'document_type' => $document->document_type ?? 'Peraturan Perundang-undangan',
            'document_number' => $document->document_number,
            'year' => $document->year ?? date('Y'),
            'category_code' => $document->category?->code ?? $document->category?->name ?? '',
            'abbreviation' => $document->abbreviation ?? '',
            'status' => $document->status ?? 'Berlaku',
            'status_note' => $document->status_note ?? '',
            'teu' => $document->teu ?? '',
            'entity' => $document->entity ?? '',
            'place_of_enactment' => $document->place_of_enactment ?? '',
            'published_at' => $document->published_at?->toDateString() ?? '',
            'promulgated_at' => $document->promulgated_at?->toDateString() ?? '',
            'source' => $document->source ?? '',
            'subject' => $document->subject_text ?? '',
            'govt_field' => $document->govt_field ?? '',
            'legal_field' => $document->legal_field ?? '',
            'language' => $document->language ?? 'Indonesia',
            'location' => $document->location ?? '',
            'abstract' => $document->abstract ?? '',
            'file_url' => $document->file ?? '',
            'updated_at' => $document->updated_at?->toISOString() ?? '',
        ];
    }

    /**
     * Send data to JDIHN Pusat API.
     */
    protected function sendToJdihnh(array $data, string $endpoint = 'document'): array
    {
        $apiUrl = JdihApiSetting::get('jdihnh_api_url', 'https://jdihnh.kemkumham.go.id/api');
        $apiToken = JdihApiSetting::get('jdihnh_api_token');

        if (!$apiToken) {
            Log::warning('JDIHN API token not configured');
            return ['success' => false, 'error' => 'API Token belum dikonfigurasi'];
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiToken,
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ])
            ->timeout(30)
            ->post("{$apiUrl}/{$endpoint}", $data);

            if ($response->successful()) {
                return [
                    'success' => true,
                    'response' => $response->json(),
                ];
            }

            return [
                'success' => false,
                'error' => $response->status() . ': ' . $response->body(),
            ];

        } catch (\Exception $e) {
            Log::error('JDIHN API error: ' . $e->getMessage());
            return [
                'success' => false,
                'error' => $e->getMessage(),
            ];
        }
    }
}
