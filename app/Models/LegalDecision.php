<?php

namespace App\Models;

use App\Models\Concerns\LogsActivity;
use Illuminate\Database\Eloquent\Model;

class LegalDecision extends Model
{
    use LogsActivity;

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
