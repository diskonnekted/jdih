<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ElectronicDocument extends Model
{
    protected $fillable = [
        'title',
        'file_path',
        'description',
    ];
}
