<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProdukHukumDesaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;

// ---------------------------------------------------------------
// HOME
// ---------------------------------------------------------------
Route::get('/', function () {
    $latestNews = \App\Models\News::where('status', 'published')
        ->orderBy('published_at', 'desc')
        ->take(4)
        ->get()
        ->map(function ($article) {
            return [
                'id'       => $article->id,
                'slug'     => $article->slug,
                'title'    => $article->title,
                'date'     => $article->published_at ? $article->published_at->format('Y-m-d') : null,
                'category' => $article->category ?? 'Berita',
                'image'    => $article->image 
                    ? (Str::startsWith($article->image, 'images/') ? '/' . $article->image : '/storage/' . $article->image)
                    : '/images/hero.webp',
            ];
        });

    $activeBanner = \App\Models\Banner::where('is_active', true)->latest()->first();

    $infographics = \App\Models\Infographic::where('is_active', true)
        ->orderBy('sort_order', 'asc')
        ->get()
        ->map(fn($item) => [
            'id' => $item->id,
            'title' => $item->title,
            'image' => '/storage/' . $item->image_path,
        ]);

    $latestLegalDocs = \App\Models\LegalDocument::with('category')
        ->orderBy('published_at', 'desc')
        ->take(5)
        ->get()
        ->map(fn($doc) => [
            'id' => $doc->id,
            'type' => $doc->category->name ?? 'PERATURAN',
            'code' => $doc->category->code ?? 'DOC',
            'number' => $doc->document_number,
            'year' => $doc->year,
            'title' => $doc->title,
            'date' => $doc->published_at ? $doc->published_at->format('Y-m-d') : null,
            'subject' => $doc->subject ? (is_array($doc->subject) ? $doc->subject[0] : (json_decode($doc->subject)[0] ?? 'Umum')) : 'Umum',
            'slug' => Str::slug($doc->category->name ?? 'peraturan'),
        ]);

    $counts = \App\Models\LegalDocument::select('category_id', \Illuminate\Support\Facades\DB::raw('count(*) as total'))
        ->groupBy('category_id')
        ->with('category')
        ->get()
        ->mapWithKeys(fn($item) => [$item->category->name ?? 'unknown' => $item->total]);

    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
        'news'           => $latestNews,
        'infographics'   => $infographics,
        'latestDocs'     => $latestLegalDocs,
        'counts'         => $counts,
        'banner'         => $activeBanner ? [
            'id' => $activeBanner->id,
            'title' => $activeBanner->title,
            'image' => '/storage/' . $activeBanner->image_path,
            'url' => $activeBanner->url,
        ] : null,
    ]);
});

// ---------------------------------------------------------------
// PROFIL
// ---------------------------------------------------------------
Route::get('/visi-misi',            fn() => Inertia::render('Profil/VisiMisi'));
Route::get('/dasar-hukum',          fn() => Inertia::render('Profil/DasarHukum'));
Route::get('/struktur-organisasi',  fn() => Inertia::render('Profil/StrukturOrganisasi'));
Route::get('/tupoksi-bag-hukum',    fn() => Inertia::render('Profil/Tupoksi'));
Route::get('/anggota-jdih',         fn() => Inertia::render('Profil/AnggotaJdih'));
Route::get('/kedudukan-dan-alamat', fn() => Inertia::render('Profil/KedudukanAlamat'));
Route::get('/sop',                  fn() => Inertia::render('Profil/Sop'));

// ---------------------------------------------------------------
// INVENTARISASI HUKUM – LIST & DETAIL (dynamic)
// ---------------------------------------------------------------
$categories = \App\Models\Category::all();

foreach ($categories as $cat) {
    // List per kategori
    Route::get("/{$cat->slug}", function(\Illuminate\Http\Request $request) use ($cat) {
        $query = \App\Models\LegalDocument::where('category_id', $cat->id);

        // Apply filters
        if ($request->has('namaDokumen')) {
            $query->where('title', 'like', '%' . $request->namaDokumen . '%');
        }
        if ($request->has('nomor')) {
            $query->where('document_number', 'like', '%' . $request->nomor . '%');
        }
        if ($request->has('tahun')) {
            $query->where('year', $request->tahun);
        }
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $documents = $query->latest('published_at')
            ->paginate(10)
            ->withQueryString()
            ->through(fn($doc) => [
                'id' => $doc->id,
                'number' => $doc->document_number,
                'nomor' => $doc->document_number,
                'title' => $doc->title,
                'year' => $doc->year,
                'date' => $doc->published_at ? $doc->published_at->format('Y-m-d') : $doc->created_at->format('Y-m-d'),
                'status' => $doc->status,
            ]);

        return Inertia::render('Hukum/DaftarDokumen', [
            'kategori' => $cat->slug,
            'title'    => $cat->name,
            'code'     => $cat->code,
            'documents' => $documents,
            'filters'   => $request->only(['namaDokumen', 'nomor', 'tahun', 'status']),
        ]);
    });
    // Detail Dokumen
    Route::get("/{$cat->slug}/{id}", function($id) use ($cat) {
        $document = \App\Models\LegalDocument::with(['category', 'relatedDocuments', 'referencedByDocuments'])->findOrFail($id);
        
        return Inertia::render('Hukum/DetailDokumen', [
            'kategori' => $cat->slug,
            'title'    => $cat->name,
            'code'     => $cat->code,
            'document' => [
                'id' => $document->id,
                'title' => $document->title,
                'number' => $document->document_number,
                'document_number' => $document->document_number,
                'year' => $document->year,
                'type' => $document->category->name,
                'document_type' => $document->document_type,
                'teu' => $document->teu,
                'abbreviation' => $document->abbreviation,
                'code' => $cat->code,
                'status' => $document->status,
                'status_note' => $document->status_note,
                'related_text' => $document->related_regulations_text,
                'implementing_regulations' => $document->implementing_regulations,
                'abstract' => $document->abstract,
                'file_path' => $document->file_path,
                'published_at' => $document->published_at,
                'promulgated_at' => $document->promulgated_at,
                'place_of_enactment' => $document->place_of_enactment,
                'publisher_place' => $document->publisher_place,
                'source' => $document->source,
                'subject_text' => $document->subject,
                'govt_field' => $document->govt_field,
                'legal_field' => $document->legal_field,
                'language' => $document->language,
                'location' => $document->location,
                'signer' => $document->signer,
                'author' => $document->author,
                'initiator' => $document->initiator,
                'view_count' => $document->view_count,
                'download_count' => $document->download_count,
                'page_count' => $document->page_count,
                'entity' => $document->entity,
                'category' => $document->category,
                'file' => $document->file_path ? asset('storage/' . $document->file_path) : null,
                'date_published' => $document->published_at?->format('Y-m-d'),
                'date_promulgated' => $document->promulgated_at?->format('Y-m-d'),
                'place' => $document->place_of_enactment,
                'source' => $document->source,
                'subject' => is_string($document->subject) ? json_decode($document->subject) : $document->subject,
                'govt_field' => $document->govt_field,
                'language' => $document->language,
                'location' => $document->location,
                'signer' => $document->signer,
                'judicial_review' => $document->judicial_review,
                'initiator' => $document->initiator,
                'related' => $document->relatedDocuments->map(fn($r) => [
                    'id' => $r->id,
                    'number' => $r->document_number,
                    'year' => $r->year,
                    'title' => $r->title,
                    'type' => $r->category?->name ?? 'Dokumen',
                    'slug' => $r->category?->slug ?? 'katalog',
                ]),
                'referenced_by' => $document->referencedByDocuments->map(fn($r) => [
                    'id' => $r->id,
                    'number' => $r->document_number,
                    'year' => $r->year,
                    'title' => $r->title,
                    'type' => $r->category?->name ?? 'Dokumen',
                    'slug' => $r->category?->slug ?? 'katalog',
                ]),
            ],
        ]);
    });
}

Route::get('/putusan',           fn() => Inertia::render('Hukum/Putusan'));
Route::get('/kerja-sama-daerah', fn() => Inertia::render('Hukum/KerjaSama'));

// ---------------------------------------------------------------
// PRODUK HUKUM DESA (EXPERIMENT)
// ---------------------------------------------------------------
Route::get('/produk-hukum-desa',       [ProdukHukumDesaController::class, 'index']);
Route::get('/api/produk-hukum-desa',   [ProdukHukumDesaController::class, 'proxy']);

// ---------------------------------------------------------------
// INFORMASI
// ---------------------------------------------------------------
Route::get('/berita',        fn() => Inertia::render('Informasi/Berita'));
Route::get('/berita/{slug}', fn(string $slug) => Inertia::render('Informasi/DetailBerita', ['slug' => $slug]));
Route::get('/galeri',        fn() => Inertia::render('Informasi/Galeri'));
Route::get('/video',         fn() => Inertia::render('Informasi/Video'));
Route::get('/unduh',         fn() => Inertia::render('Informasi/Download'));

// ---------------------------------------------------------------
// DASHBOARD & PROFILE (AUTH)
// ---------------------------------------------------------------
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// ---------------------------------------------------------------
// STATISTIK
// ---------------------------------------------------------------
Route::get('/statistik', function () {
    $categories = \App\Models\Category::withCount('legalDocuments')->get();
    
    $dataJenis = $categories->map(fn($cat) => [
        'name' => $cat->name,
        'short' => $cat->code,
        'jumlah' => $cat->legal_documents_count,
        'href' => "/{$cat->slug}",
        'color' => '#0d9488'
    ]);

    $dataTahun = \App\Models\LegalDocument::selectRaw('year, count(*) as jumlah')
        ->groupBy('year')
        ->orderBy('year', 'desc')
        ->limit(11)
        ->get()
        ->reverse()
        ->values();

    $dataPie = $dataJenis->sortByDesc('jumlah')->take(4)->values();
    $othersCount = $dataJenis->sortByDesc('jumlah')->slice(4)->sum('jumlah');
    
    if ($othersCount > 0) {
        $dataPie->push([
            'name' => 'Lainnya',
            'value' => $othersCount,
            'color' => '#94a3b8'
        ]);
    }

    return Inertia::render('Statistik', [
        'dataJenis' => $dataJenis,
        'dataTahun' => $dataTahun,
        'dataPie' => $dataPie->map(fn($item) => [
            'name' => $item['name'],
            'value' => $item['jumlah'] ?? $item['value'],
            'color' => $item['color']
        ]),
        'total' => $dataJenis->sum('jumlah'),
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
