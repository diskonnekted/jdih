<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'legal_document_id',
        'name',
        'email',
        'comment',
        'is_approved',
    ];

    /**
     * Get the document that the comment belongs to.
     */
    public function legalDocument()
    {
        return $this->belongsTo(LegalDocument::class);
    }
}
