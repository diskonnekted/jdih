<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $fillable = ['title', 'slug', 'content', 'published_at', 'status', 'image', 'category'];

    protected $casts = [
        'published_at' => 'datetime',
    ];
}
