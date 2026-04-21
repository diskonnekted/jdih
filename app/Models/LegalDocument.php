<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LegalDocument extends Model
{
    protected $fillable = [
        'title',
        'document_number',
        'year',
        'category_id',
        'status',
        'abstract',
        'file_path',
        'published_at',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
