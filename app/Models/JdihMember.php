<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JdihMember extends Model
{
    protected $fillable = [
        'name',
        'position',
        'education',
        'jft_jfu',
        'training_history',
        'phone',
        'email',
        'photo_path',
        'url',
        'category',
        'sort_order',
    ];

    /**
     * Format training history as array.
     */
    public function getTrainingHistoryAttribute($value)
    {
        if (!$value) return [];
        
        if (is_array($value)) return $value;
        
        $decoded = json_decode($value, true);
        return is_array($decoded) ? $decoded : [];
    }

    /**
     * Get members by category.
     */
    public function scopeByCategory($query, string $category)
    {
        return $query->where('category', $category)->orderBy('sort_order');
    }
}
