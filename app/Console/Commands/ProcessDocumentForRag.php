<?php

namespace App\Console\Commands;

use App\Services\RagService;
use App\Models\LegalDocument;
use Illuminate\Console\Command;

class ProcessDocumentForRag extends Command
{
    protected $signature = 'rag:process {--document= : Process specific document by ID} 
                           {--all : Process all documents with PDF files}
                           {--force : Force re-process even if already processed}';
    protected $description = 'Proses dokumen PDF untuk RAG (extract text, chunk, generate embeddings)';

    public function handle(RagService $ragService): int
    {
        $this->info('Memulai proses RAG untuk dokumen PDF...\n');

        if ($this->option('document')) {
            return $this->processSingle($ragService, $this->option('document'));
        }

        if ($this->option('all')) {
            return $this->processAll($ragService);
        }

        $this->warn('Gunakan --document={id} atau --all untuk memulai.');
        return Command::SUCCESS;
    }

    protected function processSingle(RagService $ragService, int $documentId): int
    {
        $this->info("Memproses dokumen ID: {$documentId}");

        $result = $ragService->processDocumentForRag($documentId);
        
        $this->info("\n" . str_repeat('=', 60));
        $this->info("HASIL PEMROSESAN");
        $this->info(str_repeat('=', 60));
        $this->line("  {$result['message']}");
        $this->info(str_repeat('=', 60) . "\n");

        return $result['success'] ? Command::SUCCESS : Command::FAILURE;
    }

    protected function processAll(RagService $ragService): int
    {
        $documents = LegalDocument::whereNotNull('file_path')
            ->where(function($query) {
                $query->whereDoesntHave('pdfChunks')
                      ->orWhere('pdf_chunks_count', 0);
            })
            ->get();

        $this->info("Ditemukan {$documents->count()} dokumen dengan file PDF\n");

        if ($documents->isEmpty()) {
            $this->info("Tidak ada dokumen baru untuk diproses.");
            return Command::SUCCESS;
        }

        $totalProcessed = 0;
        $totalFailed = 0;

        foreach ($documents as $document) {
            $this->line("\n[{$document->id}] {$document->title}...");
            
            $result = $ragService->processDocumentForRag($document->id);
            
            if ($result['success']) {
                $this->line("  ✓ {$result['message']}");
                $totalProcessed += ($result['chunks'] ?? 0);
                $totalFailed += ($result['failed'] ?? 0);
            } else {
                $this->line("  ✗ {$result['message']}");
            }
            
            // Small delay to avoid rate limiting
            sleep(1);
        }

        $this->info("\n" . str_repeat('=', 60));
        $this->info("RINGKASAN PEMROSESAN");
        $this->info(str_repeat('=', 60));
        $this->line("  Dokumen diproses: {$documents->count()}");
        $this->line("  Total chunks berhasil: {$totalProcessed}");
        $this->line("  Total chunks gagal: {$totalFailed}");
        $this->info(str_repeat('=', 60));

        return Command::SUCCESS;
    }
}
