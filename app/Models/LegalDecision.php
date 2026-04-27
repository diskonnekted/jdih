<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LegalDecision extends Model
{
    protected $fillable = [
        'document_number',
        'year',
        'title',
        'court_type',
        'status',
        'content',
        'file_path',
        'is_published',
    ];
}
