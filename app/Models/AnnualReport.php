<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnnualReport extends Model
{
    protected $fillable = [
        'year',
        'organization_name',
        'organization_unit',
        'legal_basis',
        'total_documents',
        'total_regulations',
        'total_decisions',
        'total_articles',
        'total_monographs',
        'total_academic_documents',
        'total_staff',
        'staff_with_education',
        'staff_with_training',
        'rooms_available',
        'computers_available',
        'internet_available',
        'scanner_available',
        'printer_available',
        'digital_storage_available',
        'features_implemented',
        'innovations',
        'report_file_path',
        'submitted_at',
        'submission_status',
    ];

    protected $casts = [
        'year' => 'integer',
        'submitted_at' => 'datetime',
        'features_implemented' => 'array',
        'innovations' => 'array',
    ];

    public function scopeByYear($query, int $year)
    {
        return $query->where('year', $year);
    }

    public function scopeSubmitted($query)
    {
        return $query->where('submission_status', 'submitted');
    }
}
