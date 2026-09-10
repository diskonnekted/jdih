<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Infrastructure extends Model
{
    protected $fillable = [
        'category',
        'name',
        'description',
        'specification',
        'quantity',
        'condition',
        'photo_path',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByCategory($query, string $category)
    {
        return $query->where('category', $category)->orderBy('sort_order');
    }
}
