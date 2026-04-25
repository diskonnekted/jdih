<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CommunitySatisfaction extends Model
{
    protected $fillable = [
        'gender',
        'age_group',
        'education',
        'occupation',
        'u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7', 'u8', 'u9',
        'suggestion',
    ];
}
