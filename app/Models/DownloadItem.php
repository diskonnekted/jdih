<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DownloadItem extends Model
{
    protected $fillable = ['title', 'file_path', 'category'];
}
