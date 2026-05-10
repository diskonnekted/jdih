<?php

namespace App\Http\Controllers;

use App\Models\PublicDialogueResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PublicConsultationController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:500',
            'suggestion' => 'required|string|max:2000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Mohon isi semua bidang dengan benar.',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Kita simpan ke tabel public_dialogue_responses
            // Diasumsikan response ini adalah untuk Dialog Publik yang sedang aktif atau kategori 'Aspirasi'
            PublicDialogueResponse::create([
                'public_dialogue_id' => 1, // Default ke ID 1 (Aspirasi Masyarakat)
                'user_name' => $request->name,
                'address' => $request->address,
                'content' => $request->suggestion,
                'status' => 'pending',
                'is_anonymous' => false
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Aspirasi Anda berhasil terkirim. Terima kasih!'
            ]);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Public Consultation Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan sistem. Silakan coba beberapa saat lagi.'
            ], 500);
        }
    }
}
