<?php

namespace App\Models\Concerns;

use App\Models\ActivityLog;

/**
 * Trait ini dipasang ke Model yang ingin dicatat aktivitasnya secara otomatis.
 *
 * Penggunaan:
 *   use App\Models\Concerns\LogsActivity;
 *   class LegalDocument extends Model { use LogsActivity; }
 */
trait LogsActivity
{
    /**
     * Kolom yang diabaikan dari diff (tidak dicatat perubahannya).
     */
    protected array $logExcept = ['updated_at', 'created_at', 'deleted_at'];

    public static function bootLogsActivity(): void
    {
        static::created(function ($model) {
            ActivityLog::log('created', $model, null, [], $model->getAttributes());
        });

        static::updated(function ($model) {
            $dirty = $model->getDirty();
            $except = $model->logExcept ?? ['updated_at', 'created_at'];

            $changed = array_diff_key($dirty, array_flip($except));
            if (empty($changed)) return;

            $old = array_intersect_key($model->getOriginal(), $changed);
            ActivityLog::log('updated', $model, null, $old, $changed);
        });

        static::deleted(function ($model) {
            ActivityLog::log('deleted', $model,
                'Record dihapus: ' . (
                    $model->title ?? $model->name ?? "ID #{$model->getKey()}"
                )
            );
        });
    }
}
