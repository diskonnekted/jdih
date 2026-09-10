<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\LegalDocument;
use App\Services\RagService;
use App\Models\PdfChunk;

class AiAssistantController extends Controller
{
    /**
     * Handle AI assistant question with RAG support.
     */
    public function ask(Request $request, RagService $ragService)
    {
        $request->validate([
            'document_id' => 'required|exists:legal_documents,id',
            'question' => 'required|string|max:1000',
            'chat_history' => 'nullable|array',
            'use_rag' => 'nullable|boolean', // Enable RAG if true
        ]);

        $useRag = $request->input('use_rag', true); // Default to using RAG
        $document = LegalDocument::with(['category', 'relatedDocuments', 'referencedByDocuments'])
            ->findOrFail($request->document_id);
        
        // Build comprehensive document context
        $documentContext = $this->buildDocumentContext($document);

        // Try RAG if enabled
        $ragContext = '';
        $ragSourceChunks = [];
        
        if ($useRag) {
            $ragContext = $this->getRagContext($ragService, $document, $request->question);
            if (!empty($ragContext)) {
                $ragContext = "\n\n=== KONTEN DARI PDF (RAG) ===\n{$ragContext}\n=== AKHIR KONTEN PDF ===\n";
            }
        }

        // Build chat history context
        $chatHistory = '';
        if (!empty($request->chat_history) && is_array($request->chat_history)) {
            $chatHistory = "\n\n=== RIWAYAT PERCAKAPAN ===\n";
            foreach ($request->chat_history as $msg) {
                $role = $msg['role'] ?? 'user';
                $text = $msg['text'] ?? '';
                $chatHistory .= ($role === 'user' ? 'Pengguna' : 'Asisten') . ": {$text}\n";
            }
            $chatHistory .= "=== AKHIR RIWAYAT ===\n";
        }

        // Enhanced system prompt with RAG instructions
        $systemPrompt = "Anda adalah **Asisten Hukum AI Profesional** dari JDIH (Jaringan Dokumentasi dan Informasi Hukum) Kabupaten Banjarnegara.
        
        PROFIL ANDA:
        - Nama: Asisten AI JDIH Banjarnegara
        - Keahlian: Hukum pemerintahan, peraturan daerah, peraturan bupati, dokumentasi hukum
        - Gaya: Profesional, sopan, informatif, mudah dipahami masyarakat umum
        - Bahasa: Bahasa Indonesia formal namun mudah dimengerti
        
        TANGGUNG JAWAB UTAMA:
        1. Menjawab pertanyaan tentang dokumen hukum yang disediakan
        2. Menjelaskan isi, tujuan, dan implikasi dokumen hukum
        3. Memberikan konteks tentang hierarki dan hubungan antar peraturan
        4. Mengidentifikasi dokumen terkait (yang dicabut, diubah, atau mencabut)
        5. Menjelaskan status hukum dan berlaku/tidaknya dokumen
        6. **MENGGUNAKAN KONTEN PDF (jika tersedia) sebagai sumber jawaban utama**
        
        PANDUAN JAWABAN:
        - **UTAMAKAN KONTEN DARI PDF** (bagian 'KONTEN DARI PDF') untuk menjawab pertanyaan
        - Gunakan metadata dokumen sebagai konteks tambahan
        - Jika informasi tidak ada di PDF maupun metadata, sebutkan dengan jelas
        - Gunakan bahasa yang mudah dimengerti masyarakat awam
        - Berikan struktur jawaban: (1) Ringkasan, (2) Penjelasan detail, (3) Implikasi
        - Gunakan bullet points untuk daftar atau penjelasan bertahap
        - Jika dokumen sudah tidak berlaku, jelaskan alasannya
        - Jika ada dokumen pengganti, sebutkan dengan jelas
        
        BATASAN:
        - Hanya jawab tentang dokumen yang datanya disediakan
        - Jangan membuat fakta yang tidak ada di data dokumen
        - Jika pertanyaan di luar konteks, sampaikan dengan sopan
        - Sebutkan bahwa informasi berdasarkan data yang tersedia di JDIH
        
        FORMAT JAWABAN:
        - Gunakan Markdown untuk formatting
        - Gunakan **bold** untuk istilah penting
        - Gunakan bullet points untuk daftar
        - Gunakan heading sederhana jika jawaban panjang";

        // Build user message with RAG context
        $userMessage = "{$chatHistory}
        
        {$documentContext}
{$ragContext}

PERTANYAAN PENGGUNA: {$request->question}

JAWABLAH dengan memberikan penjelasan yang komprehensif, terstruktur, dan mudah dipahami. UTAMAKAN informasi dari KONTEN PDF (jika tersedia).";

        // Use cfrouter API instead of Groq
        $apiUrl = config('services.cfrouter.base_url');
        $apiKey = config('services.cfrouter.api_key');
        $model = config('services.cfrouter.generation_model', 'deepseek-v4-pro-0813');

        if (!$apiKey) {
            \Log::error('AI Assistant: CFRouter API Key tidak ditemukan.');
            return response()->json(['error' => 'API Key CFRouter belum dikonfigurasi.'], 500);
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiKey,
                'Content-Type' => 'application/json',
            ])->post("{$apiUrl}/chat/completions", [
                'model' => $model,
                'messages' => [
                    ['role' => 'system', 'content' => $systemPrompt],
                    ['role' => 'user', 'content' => $userMessage],
                ],
                'temperature' => 0.3,
                'max_tokens' => 3000,
                'top_p' => 0.95,
            ]);

            if ($response->failed()) {
                \Log::error('AI Assistant CFRouter Failed: ' . $response->status() . ' - ' . $response->body());
                return response()->json(['error' => 'Gagal menghubungi AI. Silakan coba lagi.'], 500);
            }

            $result = $response->json();
            $answer = $result['choices'][0]['message']['content'] ?? 'Maaf, saya tidak mendapatkan jawaban.';
            
            // Extract suggested questions based on document
            $suggestedQuestions = $this->generateSuggestedQuestions($document);

            return response()->json([
                'answer' => $answer,
                'suggested_questions' => $suggestedQuestions,
                'rag_used' => !empty($ragContext),
                'rag_chunks' => count($ragSourceChunks),
            ]);

        } catch (\Exception $e) {
            \Log::error('AI Assistant System Error: ' . $e->getMessage());
            return response()->json(['error' => 'Terjadi kesalahan sistem: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Get RAG context for the question.
     */
    protected function getRagContext(RagService $ragService, LegalDocument $document, string $question): string
    {
        $relevantChunks = $ragService->searchRelevantChunks($document->id, $question);
        
        if (empty($relevantChunks)) {
            return '';
        }

        return $ragService->buildContextFromChunks($relevantChunks, $question);
    }

    /**
     * Build document context from metadata.
     */
    protected function buildDocumentContext(LegalDocument $document): string
    {
        $categoryName = $document->category->name ?? '-';
        $categoryCode = $document->category->code ?? '-';
        $statusNote = $document->status_note ? "\n- Keterangan Status: {$document->status_note}" : '';
        $abstractText = $document->abstract ? "- Abstrak/Ringkasan: {$document->abstract}\n" : '';
        $teuText = $document->teu ? "- T.E.U. (Badan/Pengarang): {$document->teu}\n" : '';
        $entityText = $document->entity ? "- Pemrakarsa/Pihak: {$document->entity}\n" : '';
        $signerText = $document->signer ? "- Penandatangan: {$document->signer}\n" : '';
        $authorText = $document->author ? "- Penulis/Pengusul: {$document->author}\n" : '';
        $publishedText = $document->published_at ? $document->published_at->format('d F Y') : '-';
        $promulgatedText = $document->promulgated_at ? $document->promulgated_at->format('d F Y') : '-';
        $placeText = $document->place_of_enactment ?? '-';
        $sourceText = $document->source ?? '-';
        $govtFieldText = $document->govt_field ?? '-';
        $legalFieldText = $document->legal_field ?? '-';
        $legalFormText = $document->legal_form ?? '-';
        $subjectText = $document->subject ? "- Subjek/Kata Kunci: {$document->subject}\n" : '';
        $initiatorText = $document->initiator ? "- Inisiator/Pemrakarsa: {$document->initiator}\n" : '';
        $judicialText = $document->judicial_review ? "- Uji Materi: {$document->judicial_review}\n" : '';
        $judicialResultText = $document->result_judicial_review ? "- Hasil Uji Materi: {$document->result_judicial_review}\n" : '';
        $pageCountText = $document->page_count ?? '-';
        $languageText = $document->language ?? 'Indonesia';
        $locationText = $document->location ?? '-';

        $documentContext = "=== DATA DOKUMEN HUKUM ===
        
        Identitas Dokumen:
        - Judul Lengkap: {$document->title}
        - Nomor Peraturan: {$document->document_number}
        - Tahun: {$document->year}
        - Jenis/Kategori: {$categoryName} ({$categoryCode})
        - Status Hukum: {$document->status}{$statusNote}
        
        {$abstractText}
        {$teuText}
        {$entityText}
        {$signerText}
        {$authorText}
        
        Tanggal & Lokasi:
        - Tanggal Penetapan: {$publishedText}
        - Tanggal Pengundangan: {$promulgatedText}
        - Tempat Penetapan: {$placeText}
        - Sumber: {$sourceText}
        
        Bidang & Kategori:
        - Bidang Pemerintahan: {$govtFieldText}
        - Bidang Hukum: {$legalFieldText}
        - Bentuk Hukum: {$legalFormText}
        
        {$subjectText}
        {$initiatorText}
        {$judicialText}
        {$judicialResultText}
        
        Metadata Lainnya:
        - Jumlah Halaman: {$pageCountText}
        - Bahasa: {$languageText}
        - Lokasi Penyimpanan: {$locationText}
        
        Dokumen Terkait:";

        // Add related documents info
        if ($document->relatedDocuments->count() > 0) {
            $documentContext .= "\n\nDokumen yang Dicabut/Diubah:\n";
            foreach ($document->relatedDocuments as $related) {
                $documentContext .= "- {$related->title} ({$related->document_number}/{$related->year}) - " . 
                    ($related->pivot->relation_type ?? 'Related') . "\n";
            }
        }

        if ($document->referencedByDocuments->count() > 0) {
            $documentContext .= "\nDokumen yang Mencabut/Mengubah Dokumen Ini:\n";
            foreach ($document->referencedByDocuments as $ref) {
                $documentContext .= "- {$ref->title} ({$ref->document_number}/{$ref->year}) - " . 
                    ($ref->pivot->relation_type ?? 'Related') . "\n";
            }
        }

        $documentContext .= "\n\n=== AKHIR DATA DOKUMEN ===";

        return $documentContext;
    }

    /**
     * Generate suggested questions based on document metadata
     */
    private function generateSuggestedQuestions($document): array
    {
        $docNumber = $document->document_number;
        $docYear = $document->year;
        $categoryName = $document->category->name ?? 'dokumen ini';

        $questions = [
            "Apa tujuan dari {$docNumber} Tahun {$docYear}?",
            "Siapa yang menerbitkan {$categoryName}?",
            "Kapan dokumen ini berlaku?",
        ];

        if ($document->status === 'Tidak Berlaku' || $document->status === 'Dicabut') {
            $questions[] = "Mengapa dokumen ini tidak berlaku?";
        }

        if ($document->relatedDocuments->count() > 0) {
            $questions[] = "Dokumen apa saja yang dicabut oleh dokumen ini?";
        }

        if ($document->referencedByDocuments->count() > 0) {
            $questions[] = "Dokumen apa yang mencabut dokumen ini?";
        }

        if ($document->abstract) {
            $questions[] = "Apa isi ringkasan dokumen ini?";
        }

        return array_slice($questions, 0, 3); // Max 3 suggested questions
    }
}
