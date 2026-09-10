<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JdihApiSetting extends Model
{
    protected $fillable = [
        'key',
        'value',
        'type',
        'description',
    ];

    protected $casts = [
        'type' => 'string',
    ];

    /**
     * Get setting value by key.
     */
    public static function get(string $key, $default = null)
    {
        $setting = self::where('key', $key)->first();
        
        if (!$setting) {
            return $default;
        }

        $value = $setting->value;

        if ($setting->type === 'boolean') {
            return filter_var($value, FILTER_VALIDATE_BOOLEAN);
        }

        if ($setting->type === 'json' && $value) {
            return json_decode($value, true);
        }

        return $value;
    }

    /**
     * Set setting value by key.
     */
    public static function set(string $key, $value, string $type = 'string'): void
    {
        $setting = self::updateOrCreate(
            ['key' => $key],
            [
                'value' => is_array($value) ? json_encode($value) : $value,
                'type' => $type,
            ]
        );
    }
}
