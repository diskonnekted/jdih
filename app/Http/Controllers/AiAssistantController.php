<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\LegalDocument;

class AiAssistantController extends Controller
{
    public function ask(Request $request)
    {
        $request->validate([
            'document_id' => 'required|exists:legal_documents,id',
            'question' => 'required|string|max:1000',
        ]);

        $document = LegalDocument::with('category')->findOrFail($request->document_id);
        $apiKey = config('services.groq.key') ?? env('GROQ_API_KEY');

        if (!$apiKey) {
            \Log::error('AI Assistant: API Key Groq tidak ditemukan di config maupun env.');
            return response()->json(['error' => 'API Key Groq belum dikonfigurasi.'], 500);
        }

        $prompt = "Anda adalah Asisten Hukum AI dari JDIH Kabupaten Banjarnegara. 
        Berikut adalah informasi dokumen hukum yang sedang dibuka pengguna:
        Judul: {$document->title}
        Nomor: {$document->document_number}
        Tahun: {$document->year}
        Jenis: " . ($document->category->name ?? '-') . "
        Abstrak: {$document->abstract}
        Status: {$document->status}
        
        Tugas Anda adalah membantu menjawab pertanyaan pengguna tentang dokumen ini dengan bahasa yang sopan, profesional, dan mudah dimengerti. 
        Jika pertanyaan tidak relevan dengan dokumen ini, ingatkan pengguna dengan halus.
        
        Pertanyaan Pengguna: {$request->question}";

        try {
            $response = Http::withoutVerifying()->withHeaders([
                'Authorization' => 'Bearer ' . $apiKey,
                'Content-Type' => 'application/json',
            ])->post('https://api.groq.com/openai/v1/chat/completions', [
                'model' => 'llama3-8b-8192',
                'messages' => [
                    ['role' => 'system', 'content' => 'Anda adalah asisten hukum yang membantu dan akurat.'],
                    ['role' => 'user', 'content' => $prompt],
                ],
                'temperature' => 0.2,
            ]);

            if ($response->failed()) {
                \Log::error('AI Assistant Groq Failed: ' . $response->status() . ' - ' . $response->body());
                return response()->json(['error' => 'Gagal menghubungi AI Groq. Silakan cek log.'], 500);
            }

            $result = $response->json();
            return response()->json([
                'answer' => $result['choices'][0]['message']['content'] ?? 'Maaf, saya tidak mendapatkan jawaban.'
            ]);

        } catch (\Exception $e) {
            \Log::error('AI Assistant System Error: ' . $e->getMessage());
            return response()->json(['error' => 'Terjadi kesalahan sistem: ' . $e->getMessage()], 500);
        }
    }
}
