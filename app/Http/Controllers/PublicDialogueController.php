<?php

namespace App\Http\Controllers;

use App\Models\PublicDialogue;
use App\Models\PublicDialogueResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicDialogueController extends Controller
{
    public function index()
    {
        $dialogues = PublicDialogue::where('is_active', true)
            ->latest()
            ->get();

        return Inertia::render('Layanan/DialogPublik/Index', [
            'dialogues' => $dialogues
        ]);
    }

    public function show(string $slug)
    {
        $dialogue = PublicDialogue::where('slug', $slug)
            ->with(['responses' => function ($query) {
                $query->where('status', 'approved')->latest();
            }])
            ->firstOrFail();

        $dialogue->increment('view_count');

        return Inertia::render('Layanan/DialogPublik/Detail', [
            'dialogue' => $dialogue
        ]);
    }

    public function storeResponse(Request $request, int $id)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'suggestion' => 'required|string|min:10',
        ]);

        PublicDialogueResponse::create([
            'public_dialogue_id' => $id,
            'full_name' => $request->full_name,
            'email' => $request->email,
            'suggestion' => $request->suggestion,
            'status' => 'pending', // Default status is pending for moderation
        ]);

        return back()->with('success', 'Terima kasih! Aspirasi Anda telah diterima dan sedang menunggu moderasi admin.');
    }
}
