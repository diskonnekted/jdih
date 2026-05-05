<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use LogsActivity;

    protected $fillable = ['name', 'slug', 'code', 'description'];

    /**
     * Relasi: kategori memiliki banyak dokumen hukum.
     */
    public function legalDocuments()
    {
        return $this->hasMany(LegalDocument::class);
    }
}
