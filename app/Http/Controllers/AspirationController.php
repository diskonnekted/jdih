<?php

namespace App\Http\Controllers;

use App\Models\Aspiration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AspirationController extends Controller
{
    public function index()
    {
        $aspirations = Aspiration::where('status', '!=', 'rejected')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return view('aspirations.index', compact('aspirations'));
    }

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
            Aspiration::create([
                'full_name' => $request->name,
                'address' => $request->address,
                'suggestion' => $request->suggestion,
                'status' => 'pending',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Aspirasi Anda berhasil terkirim. Terima kasih!'
            ]);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Aspiration Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan sistem. Silakan coba beberapa saat lagi.'
            ], 500);
        }
    }
}
