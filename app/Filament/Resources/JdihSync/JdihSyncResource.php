<?php

namespace App\Filament\Resources\JdihSync;

use App\Filament\Resources\JdihSync\Pages;
use App\Models\JdihApiSetting;
use App\Models\JdihSyncLog;
use Filament\Actions\Action;
use Filament\Actions\ButtonAction;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class JdihSyncResource extends Resource
{
    protected static ?string $model = JdihSyncLog::class;

    // Slug eksplisit: tanpa ini Filament menggabungkan nama folder (jdih-sync)
    // dengan slug kelas (jdih-syncs) menjadi URL dobel /admin/jdih-sync/jdih-syncs
    protected static ?string $slug = 'jdih-sync';

    protected static ?string $modelLabel = 'Sinkronisasi JDIH';
    protected static ?string $pluralModelLabel = 'Sinkronisasi JDIH';
    protected static ?string $navigationLabel = 'Sinkronisasi JDIH';
    protected static \UnitEnum|string|null $navigationGroup = 'Sistem';
    protected static ?int $navigationSort = 99;

    public static function getNavigationIcon(): string
    {
        return 'heroicon-o-cloud';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('created_at')
                    ->label('Tanggal')
                    ->dateTime('d M Y H:i')
                    ->sortable(),

                BadgeColumn::make('sync_type')
                    ->label('Tipe')
                    ->formatStateUsing(fn ($state) => match($state) {
                        'document' => 'Dokumen',
                        'member' => 'Anggota',
                        default => $state,
                    })
                    ->colors(['info']),

                BadgeColumn::make('direction')
                    ->label('Arah')
                    ->formatStateUsing(fn ($state) => match($state) {
                        'outbound' => 'Kirim',
                        'inbound' => 'Terima',
                        default => $state,
                    })
                    ->colors(['warning' => 'outbound', 'success' => 'inbound']),

                BadgeColumn::make('status')
                    ->label('Status')
                    ->colors([
                        'success' => 'success',
                        'warning' => 'processing',
                        'danger' => 'failed',
                        'gray' => 'pending',
                    ])
                    ->formatStateUsing(fn ($state) => match($state) {
                        'success' => 'Berhasil',
                        'processing' => 'Memproses',
                        'failed' => 'Gagal',
                        'pending' => 'Tertunda',
                        default => $state,
                    }),

                TextColumn::make('total_records')
                    ->label('Total')
                    ->sortable(),

                TextColumn::make('success_records')
                    ->label('Berhasil')
                    ->color('success'),

                TextColumn::make('failed_records')
                    ->label('Gagal')
                    ->color('danger'),

                TextColumn::make('triggered_by')
                    ->label('Dipicu Oleh'),
            ])
            ->defaultSort('created_at', 'desc')
            ->recordActions([
                \Filament\Actions\ViewAction::make(),
            ])
            ->toolbarActions([
                \Filament\Actions\BulkActionGroup::make([
                    \Filament\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListJdihSync::route('/'),
            'settings' => Pages\JdihSyncSettings::route('/settings'),
        ];
    }

    /**
     * Get header actions.
     */
    public static function getHeaderActions(): array
    {
        return [
            Action::make('settings')
                ->label('Pengaturan API')
                ->url(JdihSyncResource::getUrl('settings'))
                ->icon('heroicon-o-cog-6-tooth')
                ->color('gray'),

            ButtonAction::make('sync_documents')
                ->label('Sync Dokumen')
                ->icon('heroicon-o-document-arrow-up')
                ->color('success')
                ->action(function () {
                    return static::syncDocuments();
                })
                ->successNotificationTitle('Sinkronisasi dokumen berhasil!')
                ->failureNotificationTitle('Sinkronisasi dokumen gagal.'),

            ButtonAction::make('sync_members')
                ->label('Sync Anggota')
                ->icon('heroicon-o-user-group')
                ->color('info')
                ->action(function () {
                    return static::syncMembers();
                })
                ->successNotificationTitle('Sinkronisasi anggota berhasil!')
                ->failureNotificationTitle('Sinkronisasi anggota gagal.'),
        ];
    }

    /**
     * Sync documents to JDIHN.
     */
    public static function syncDocuments(): array
    {
        $apiUrl = JdihApiSetting::get('jdihnh_api_url', 'https://jdihnh.kemkumham.go.id/api');
        $apiToken = JdihApiSetting::get('jdihnh_api_token');

        if (!$apiToken) {
            return [
                'success' => false,
                'message' => 'API Token belum dikonfigurasi. Silakan atur di Pengaturan API.',
            ];
        }

        $syncLog = JdihSyncLog::create([
            'sync_type' => 'document',
            'direction' => 'outbound',
            'status' => 'processing',
            'total_records' => 0,
            'triggered_by' => 'manual',
            'api_token_name' => 'admin',
        ]);

        try {
            $documents = \App\Models\LegalDocument::with('category')
                ->where('updated_at', '>=', now()->subDays(30))
                ->orderBy('updated_at', 'asc')
                ->get();

            $successCount = 0;
            $failedCount = 0;
            $payload = [];

            foreach ($documents as $document) {
                $payloadItem = static::formatDocumentForSync($document);
                $payload[] = $payloadItem;

                $result = static::sendToJdihnh($payloadItem, 'document', $apiUrl, $apiToken);

                if ($result['success']) {
                    $successCount++;
                } else {
                    $failedCount++;
                }
            }

            $syncLog->update([
                'payload' => json_encode($payload),
                'total_records' => count($payload),
                'success_records' => $successCount,
                'failed_records' => $failedCount,
                'status' => 'success',
                'synced_at' => now(),
            ]);

            return [
                'success' => true,
                'message' => "Sinkronisasi selesai. Berhasil: {$successCount}, Gagal: {$failedCount}",
            ];

        } catch (\Exception $e) {
            Log::error('JDIHN Sync failed: ' . $e->getMessage());
            $syncLog->update([
                'status' => 'failed',
                'error_message' => $e->getMessage(),
            ]);

            return [
                'success' => false,
                'message' => 'Sinkronisasi gagal: ' . $e->getMessage(),
            ];
        }
    }

    /**
     * Sync members to JDIHN.
     */
    public static function syncMembers(): array
    {
        $apiUrl = JdihApiSetting::get('jdihnh_api_url', 'https://jdihnh.kemkumham.go.id/api');
        $apiToken = JdihApiSetting::get('jdihnh_api_token');

        if (!$apiToken) {
            return [
                'success' => false,
                'message' => 'API Token belum dikonfigurasi. Silakan atur di Pengaturan API.',
            ];
        }

        $syncLog = JdihSyncLog::create([
            'sync_type' => 'member',
            'direction' => 'outbound',
            'status' => 'processing',
            'triggered_by' => 'manual',
            'api_token_name' => 'admin',
        ]);

        try {
            $members = \App\Models\JdihMember::all();
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
            ])->toArray();

            $successCount = 0;
            $failedCount = 0;

            foreach ($payload as $memberData) {
                $result = static::sendToJdihnh($memberData, 'member', $apiUrl, $apiToken);
                if ($result['success']) {
                    $successCount++;
                } else {
                    $failedCount++;
                }
            }

            $syncLog->update([
                'payload' => json_encode($payload),
                'total_records' => count($payload),
                'success_records' => $successCount,
                'failed_records' => $failedCount,
                'status' => 'success',
                'synced_at' => now(),
            ]);

            return [
                'success' => true,
                'message' => "Sinkronisasi selesai. Berhasil: {$successCount}, Gagal: {$failedCount}",
            ];

        } catch (\Exception $e) {
            Log::error('JDIHN Sync failed: ' . $e->getMessage());
            $syncLog->update([
                'status' => 'failed',
                'error_message' => $e->getMessage(),
            ]);

            return [
                'success' => false,
                'message' => 'Sinkronisasi gagal: ' . $e->getMessage(),
            ];
        }
    }

    protected static function formatDocumentForSync(\App\Models\LegalDocument $document): array
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

    protected static function sendToJdihnh(array $data, string $endpoint, string $apiUrl, string $apiToken): array
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiToken,
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ])
            ->timeout(30)
            ->post("{$apiUrl}/{$endpoint}", $data);

            if ($response->successful()) {
                return ['success' => true, 'response' => $response->json()];
            }

            return ['success' => false, 'error' => $response->status() . ': ' . $response->body()];

        } catch (\Exception $e) {
            Log::error('JDIHN API error: ' . $e->getMessage());
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
}
