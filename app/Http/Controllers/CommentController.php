<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'legal_document_id' => 'required|exists:legal_documents,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'comment' => 'required|string|max:1000',
        ]);

        Comment::create([
            'legal_document_id' => $request->legal_document_id,
            'name' => $request->name,
            'email' => $request->email,
            'comment' => $request->comment,
            'is_approved' => false, // Initial status is pending moderation
        ]);

        return back()->with('success', 'Komentar Anda telah terkirim dan sedang menunggu moderasi.');
    }
}
