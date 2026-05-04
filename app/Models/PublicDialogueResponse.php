<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PublicDialogueResponse extends Model
{
    use HasFactory;

    protected $fillable = [
        'public_dialogue_id',
        'full_name',
        'email',
        'suggestion',
        'admin_response',
        'status',
    ];

    public function dialogue(): BelongsTo
    {
        return $this->belongsTo(PublicDialogue::class, 'public_dialogue_id');
    }
}
