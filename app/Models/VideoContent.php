<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VideoContent extends Model
{
    protected $fillable = [
        'title',
        'video_url',
        'description',
    ];
}
