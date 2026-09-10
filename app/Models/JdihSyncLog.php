<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JdihSyncLog extends Model
{
    protected $fillable = [
        'sync_type',
        'direction',
        'status',
        'total_records',
        'success_records',
        'failed_records',
        'payload',
        'response',
        'error_message',
        'triggered_by',
        'api_token_name',
        'synced_at',
    ];

    protected $casts = [
        'payload' => 'array',
        'response' => 'array',
        'total_records' => 'integer',
        'success_records' => 'integer',
        'failed_records' => 'integer',
        'synced_at' => 'datetime',
    ];

    /**
     * Get latest successful sync log for a given type.
     */
    public static function latestSuccessfulSync(string $syncType): ?self
    {
        return self::where('sync_type', $syncType)
            ->where('status', 'success')
            ->orderBy('created_at', 'desc')
            ->first();
    }

    /**
     * Get pending and failed syncs.
     */
    public static function getPendingSyncs(): self
    {
        return self::where('status', 'pending')
            ->orWhere('status', 'failed')
            ->orderBy('created_at', 'asc')
            ->first();
    }

    /**
     * Mark sync as processing.
     */
    public function processing(): void
    {
        $this->update(['status' => 'processing']);
    }

    /**
     * Mark sync as successful.
     */
    public function success(int $successRecords = 0): void
    {
        $this->update([
            'status' => 'success',
            'success_records' => $successRecords,
            'synced_at' => now(),
        ]);
    }

    /**
     * Mark sync as failed.
     */
    public function failed(string $errorMessage): void
    {
        $this->update([
            'status' => 'failed',
            'error_message' => $errorMessage,
        ]);
    }
}
