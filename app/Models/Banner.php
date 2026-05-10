<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    protected $fillable = ['title', 'subtitle', 'description', 'image_path', 'url', 'is_active', 'sort_order', 'show_stats'];

    protected $casts = [
        'is_active' => 'boolean',
        'show_stats' => 'boolean',
    ];
}
