<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\LegalDocument;

class PolishJdihData extends Command
{
    protected $signature = 'jdih:polish';
    protected $description = 'Clean up metadata and organize file paths for JDIH documents';

    public function handle()
    {
        $this->info('Starting final polishing...');

        $columns = [
            'source', 'judicial_review', 'signer', 'initiator', 
            'place_of_enactment', 'publisher_place', 'subject',
            'teu', 'abbreviation', 'document_type', 'govt_field', 
            'legal_field', 'legal_form', 'entity'
        ];

        $bar = $this->output->createProgressBar(LegalDocument::count());
        $bar->start();

        LegalDocument::all()->each(function($doc) use ($columns, $bar) { 
            // Clean NULL strings
            foreach ($columns as $column) {
                if ($doc->$column === 'NULL' || $doc->$column === 'null' || empty($doc->$column)) {
                    $doc->$column = '-';
                }
            }
            
            // Fix paths to be year-organized
            if ($doc->file_path && $doc->file_path !== '-') {
                $filename = basename($doc->file_path);
                $doc->file_path = 'produk_hukum/' . $doc->year . '/' . $filename;
            }
            if ($doc->abstract_file_path && $doc->abstract_file_path !== '-') {
                $filename = basename($doc->abstract_file_path);
                $doc->abstract_file_path = 'abstrak/' . $doc->year . '/' . $filename;
            }
            
            $doc->save();
            $bar->advance();
        });

        $bar->finish();
        $this->info("\nPolishing completed successfully!");
    }
}
