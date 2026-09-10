<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

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
     * Keys that contain sensitive data and should be encrypted at rest.
     */
    protected static array $sensitiveKeys = [
        'jdihnh_api_token',
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

        // Decrypt sensitive values
        if (in_array($key, static::$sensitiveKeys) && $value) {
            try {
                $value = Crypt::decryptString($value);
            } catch (\Exception $e) {
                // Value might be stored as plaintext before encryption was enabled
                // Return as-is for backward compatibility
            }
        }

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
        // Encrypt sensitive values before storing
        if (in_array($key, static::$sensitiveKeys) && is_string($value)) {
            $value = Crypt::encryptString($value);
        }

        self::updateOrCreate(
            ['key' => $key],
            [
                'value' => is_array($value) ? json_encode($value) : $value,
                'type' => $type,
            ]
        );
    }
}
