<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileItem extends Model
{
    protected $fillable = ['title', 'slug', 'content', 'image_path', 'sort_order'];
}
