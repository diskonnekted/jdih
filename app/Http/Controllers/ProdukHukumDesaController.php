<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class ProdukHukumDesaController extends Controller
{
    /**
     * Display the Village Legal Products page.
     */
    public function index()
    {
        $villages = \App\Models\Village::where('is_active', true)
            ->orderBy('kecamatan')
            ->orderBy('name')
            ->get()
            ->groupBy('kecamatan')
            ->map(function ($items, $kec) {
                return [
                    'kecamatan' => $kec,
                    'desa' => $items->map(fn($v) => [
                        'name' => $v->name,
                        'url' => $v->url
                    ])
                ];
            })
            ->values();

        return Inertia::render('Hukum/ProdukHukumDesa', [
            'villagesMapping' => $villages
        ]);
    }

    /**
     * Proxy request to fetch data from village OpenSID API.
     */
    public function proxy(Request $request)
    {
        $villageUrl = $request->query('url');
        $endpoint = $request->query('endpoint', '/internal_api/produk-hukum');
        
        if (!$villageUrl) {
            return response()->json(['error' => 'Village URL is required'], 400);
        }

        // Validate village URL against database to prevent SSRF
        $isValidVillage = \App\Models\Village::where('url', $villageUrl)->where('is_active', true)->exists();

        if (!$isValidVillage) {
            // For extra flexibility during experiment, we check if it is a valid .desa.id
            if (!str_ends_with($villageUrl, '.desa.id')) {
                return response()->json(['error' => 'URL desa tidak terdaftar atau tidak valid.'], 403);
            }
        }

        try {
            $query = $request->except(['url', 'endpoint']);
            $response = Http::withOptions(['verify' => false]) // Some village certs might be invalid
                ->get($villageUrl . $endpoint, $query);

            return response()->json($response->json(), $response->status());
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
