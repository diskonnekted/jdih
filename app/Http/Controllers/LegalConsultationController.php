<?php

namespace App\Http\Controllers;

use App\Models\LegalConsultation;
use Illuminate\Http\Request;

class LegalConsultationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'topic' => 'required|string',
            'question' => 'required|string',
        ]);

        LegalConsultation::create($validated);

        return redirect()->back()->with('success', 'Konsultasi hukum Anda berhasil dikirim. Tim kami akan segera merespon melalui email.');
    }
}
