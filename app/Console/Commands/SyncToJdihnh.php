<?php

namespace App\Console\Commands;

use App\Models\LegalDocument;
use App\Models\JdihMember;
use App\Models\JdihSyncLog;
use App\Models\JdihApiSetting;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SyncToJdihnh extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'jdih:sync {--type=document|member|full} 
                            {--force : Force sync all records regardless of last sync}
                            {--dry-run : Show what would be synced without actually sending}
                            {--api-key= : API key for manual sync trigger}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sinkronisasi data JDIH ke JDIHN Pusat (Jaringan Dokumentasi dan Informasi Hukum Nasional)';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $syncType = $this->option('type');
        $force = $this->option('force');
        $dryRun = $this->option('dry-run');

        $this->info('Memulai sinkronisasi ke JDIHN Pusat...');

        if ($syncType === 'full' || $syncType === 'document') {
            $this->syncDocuments($force, $dryRun);
        }

        if ($syncType === 'full' || $syncType === 'member') {
            $this->syncMembers($force, $dryRun);
        }

        $this->info('Sinkronisasi selesai.');
    }

    /**
     * Sync documents to JDIHN.
     */
    protected function syncDocuments(bool $force, bool $dryRun): void
    {
        $this->line("\n[Documents]");
        $this->newLine();

        // Verify API configuration
        if (!$this->verifyApiConfig()) {
            return;
        }

        $lastSync = JdihSyncLog::latestSuccessfulSync('document');

        if (!$force && $lastSync) {
            $since = $lastSync->created_at;
            $this->info("Mengirim dokumen yang diubah sejak: {$since->format('Y-m-d H:i:s')}");
        } else {
            $since = now()->subDays(30);
            $this->info("Mengirim dokumen yang diubah dalam 30 hari terakhir");
        }

        $query = LegalDocument::with('category')
            ->where('updated_at', '>=', $since)
            ->orderBy('updated_at', 'asc');

        $total = $query->count();
        $this->info("Total dokumen yang akan disinkronkan: {$total}");

        if ($total === 0) {
            $this->warn("Tidak ada dokumen baru untuk disinkronkan.");
            return;
        }

        $success = 0;
        $failed = 0;
        $skipped = 0;

        $query->chunk(50, function ($documents) use (&$success, &$failed, &$skipped, $dryRun) {
            foreach ($documents as $document) {
                $payload = $this->formatDocumentForSync($document);

                if ($dryRun) {
                    $this->line("  [DRY-RUN] {$document->title} ({$document->document_number})");
                    continue;
                }

                $result = $this->sendToJdihnh($payload, 'documents');

                if ($result['success']) {
                    $success++;
                    $this->line("  ✓ {$document->title}");
                } else {
                    $failed++;
                    $this->line("  ✗ {$document->title} - {$result['error']}");
                    Log::warning('JDIHN Sync failed', [
                        'document_id' => $document->id,
                        'error' => $result['error'],
                    ]);
                }
            }
        });

        // Save sync log
        JdihSyncLog::create([
            'sync_type' => 'document',
            'direction' => 'outbound',
            'status' => $failed > 0 && $success > 0 ? 'partial' : ($failed > 0 ? 'failed' : 'success'),
            'total_records' => $total,
            'success_records' => $success,
            'failed_records' => $failed,
            'triggered_by' => 'manual',
        ]);

        $this->newLine();
        $this->info("Hasil Sinkronisasi Dokumen:");
        $this->line("  Berhasil: <info>{$success}</info>");
        $this->line("  Gagal: <error>{$failed}</error>");
        if ($dryRun) {
            $this->line("  Skipped (dry-run): <warning>" . ($total - $success - $failed) . "</warning>");
        }
    }

    /**
     * Sync members to JDIHN.
     */
    protected function syncMembers(bool $force, bool $dryRun): void
    {
        $this->line("\n[Members]");
        $this->newLine();

        if (!$this->verifyApiConfig()) {
            return;
        }

        $members = JdihMember::all();
        $this->info("Total anggota: {$members->count()}");

        $success = 0;
        $failed = 0;

        foreach ($members as $member) {
            $payload = [
                'name' => $member->name,
                'position' => $member->position,
                'education' => $member->education,
                'jft_jfu' => $member->jft_jfu,
                'training_history' => $member->training_history,
                'phone' => $member->phone,
                'email' => $member->email,
                'category' => $member->category,
            ];

            if ($dryRun) {
                $this->line("  [DRY-RUN] {$member->name} - {$member->position}");
                continue;
            }

            $result = $this->sendToJdihnh($payload, 'members');

            if ($result['success']) {
                $success++;
                $this->line("  ✓ {$member->name}");
            } else {
                $failed++;
                $this->line("  ✗ {$member->name} - {$result['error']}");
            }
        }

        JdihSyncLog::create([
            'sync_type' => 'member',
            'direction' => 'outbound',
            'status' => $failed > 0 ? 'partial' : 'success',
            'total_records' => $members->count(),
            'success_records' => $success,
            'failed_records' => $failed,
            'triggered_by' => 'manual',
        ]);

        $this->newLine();
        $this->info("Hasil Sinkronisasi Anggota:");
        $this->line("  Berhasil: <info>{$success}</info>");
        $this->line("  Gagal: <error>{$failed}</error>");
    }

    /**
     * Verify API configuration.
     */
    protected function verifyApiConfig(): bool
    {
        $apiUrl = JdihApiSetting::get('jdihnh_api_url');
        $apiToken = JdihApiSetting::get('jdihnh_api_token');

        if (!$apiUrl) {
            $this->error("JDIHN API URL belum dikonfigurasi.");
            $this->info("Jalankan: php artisan jdih:configure-api");
            return false;
        }

        if (!$apiToken) {
            $this->error("JDIHN API Token belum dikonfigurasi.");
            $this->info("Jalankan: php artisan jdih:configure-api");
            return false;
        }

        return true;
    }

    /**
     * Format document for JDIHN sync.
     */
    protected function formatDocumentForSync(LegalDocument $document): array
    {
        return [
            'document_id' => $document->id,
            'title' => $document->title,
            'document_type' => $document->document_type ?? 'Peraturan Perundang-undangan',
            'document_number' => $document->document_number,
            'year' => $document->year ?? date('Y'),
            'category_code' => $document->category?->code ?? $document->category?->name ?? '',
            'abbreviation' => $document->abbreviation ?? '',
            'status' => $document->status ?? 'Berlaku',
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
            'updated_at' => $document->updated_at?->toISOString() ?? '',
        ];
    }

    /**
     * Send data to JDIHN Pusat API.
     */
    protected function sendToJdihnh(array $data, string $endpoint): array
    {
        $apiUrl = JdihApiSetting::get('jdihnh_api_url');
        $apiToken = JdihApiSetting::get('jdihnh_api_token');

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiToken,
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ])
            ->timeout(30)
            ->post("{$apiUrl}/{$endpoint}", $data);

            if ($response->successful()) {
                return ['success' => true];
            }

            return [
                'success' => false,
                'error' => "HTTP {$response->status()}",
            ];

        } catch (\Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage(),
            ];
        }
    }
}
