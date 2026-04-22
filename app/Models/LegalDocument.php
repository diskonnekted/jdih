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
        'status_note',
        'abstract',
        'file_path',
        'published_at',
        'promulgated_at',
        'place_of_enactment',
        'source',
        'subject',
        'govt_field',
        'language',
        'initiator',
    ];

    /**
     * Get the category that owns the document.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Documents that this document relates to (e.g., this document repeals them).
     */
    public function relatedDocuments()
    {
        return $this->belongsToMany(LegalDocument::class, 'legal_document_relations', 'main_document_id', 'related_document_id')
            ->withPivot('relation_type')
            ->withTimestamps();
    }

    /**
     * Documents that relate to this document (e.g., they repeal this document).
     */
    public function referencedByDocuments()
    {
        return $this->belongsToMany(LegalDocument::class, 'legal_document_relations', 'related_document_id', 'main_document_id')
            ->withPivot('relation_type')
            ->withTimestamps();
    }
}
