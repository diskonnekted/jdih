<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PublicDialogue extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'document_type',
        'year',
        'description',
        'file_path',
        'is_active',
        'view_count',
    ];

    public function responses(): HasMany
    {
        return $this->hasMany(PublicDialogueResponse::class);
    }
}
