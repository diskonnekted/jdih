<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JdihMember extends Model
{
    protected $fillable = ['name', 'position', 'photo_path', 'sort_order'];
}
