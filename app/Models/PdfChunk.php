<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PdfChunk extends Model
{
    protected $fillable = [
        'legal_document_id',
        'chunk_index',
        'content',
        'embedding_dimension',
        'embedding',
        'status',
        'error_message',
    ];

    protected $casts = [
        'embedding' => 'array',
    ];

    /**
     * Get the document that owns the chunk.
     */
    public function document()
    {
        return $this->belongsTo(LegalDocument::class);
    }

    /**
     * Scope for completed chunks.
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed')
                     ->whereNotNull('embedding');
    }

    /**
     * Scope for pending chunks.
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Get chunks for a document sorted by index.
     */
    public function scopeByDocument($query, int $documentId)
    {
        return $query->where('legal_document_id', $documentId)
                     ->orderBy('chunk_index')
                     ->completed();
    }

    /**
     * Calculate cosine similarity between two vectors.
     */
    public static function cosineSimilarity(array $vecA, array $vecB): float
    {
        if (count($vecA) !== count($vecB)) {
            return 0.0;
        }

        $dotProduct = 0.0;
        $normA = 0.0;
        $normB = 0.0;

        for ($i = 0; $i < count($vecA); $i++) {
            $dotProduct += $vecA[$i] * $vecB[$i];
            $normA += $vecA[$i] * $vecA[$i];
            $normB += $vecB[$i] * $vecB[$i];
        }

        $normA = sqrt($normA);
        $normB = sqrt($normB);

        if ($normA === 0.0 || $normB === 0.0) {
            return 0.0;
        }

        return $dotProduct / ($normA * $normB);
    }
}
