<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KatalogDownload extends Model
{
    protected $fillable = ['no', 'title', 'file_path'];
}
