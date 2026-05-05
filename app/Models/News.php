<?php

namespace App\Models;

use App\Models\Concerns\LogsActivity;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use LogsActivity;

    protected $fillable = ['title', 'slug', 'content', 'published_at', 'status', 'image', 'category'];

    protected $casts = [
        'published_at' => 'datetime',
    ];
}
