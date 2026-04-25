<?php

namespace App\Http\Controllers;

use App\Models\CommunitySatisfaction;
use Illuminate\Http\Request;

class CommunitySatisfactionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'gender' => 'required|string',
            'age_group' => 'required|string',
            'education' => 'required|string',
            'occupation' => 'required|string',
            'u1' => 'required|integer|between:1,4',
            'u2' => 'required|integer|between:1,4',
            'u3' => 'required|integer|between:1,4',
            'u4' => 'required|integer|between:1,4',
            'u5' => 'required|integer|between:1,4',
            'u6' => 'required|integer|between:1,4',
            'u7' => 'required|integer|between:1,4',
            'u8' => 'required|integer|between:1,4',
            'u9' => 'required|integer|between:1,4',
            'suggestion' => 'nullable|string|max:1000',
        ]);

        CommunitySatisfaction::create($validated);

        return response()->json(['message' => 'Terima kasih atas partisipasi Anda!']);
    }
}
