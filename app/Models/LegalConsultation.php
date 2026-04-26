<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LegalConsultation extends Model
{
    protected $fillable = [
        'name',
        'email',
        'topic',
        'question',
        'is_answered',
        'answer',
    ];
}
