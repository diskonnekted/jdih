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
        return Inertia::render('Hukum/ProdukHukumDesa');
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

        // Validate village URL to prevent SSRF
        $allowedVillages = [
            'https://sijenggung-banjarnegara.desa.id'
        ];

        if (!in_array($villageUrl, $allowedVillages)) {
            // For experiment, we might allow any .desa.id or .gov.id but let's be strict for now
            if (!str_ends_with($villageUrl, '.desa.id')) {
                return response()->json(['error' => 'Invalid village URL'], 403);
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
