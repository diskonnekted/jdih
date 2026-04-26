<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProdukHukumDesaController;
use App\Http\Controllers\AiAssistantController;
use App\Http\Controllers\CommentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

// ---------------------------------------------------------------
// HOME
// ---------------------------------------------------------------
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
        ->orderByRaw('COALESCE(published_at, created_at) DESC')
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

    $videos = \App\Models\VideoContent::latest()
        ->take(3)
        ->get()
        ->map(fn($v) => [
            'id' => $v->id,
            'title' => $v->title,
            'video_url' => $v->video_url,
            'thumbnail_path' => $v->thumbnail_path,
            'platform' => $v->platform,
            'year' => $v->year,
            'duration' => $v->duration,
        ]);

    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
        'news'           => $latestNews,
        'infographics'   => $infographics,
        'latestDocs'     => $latestLegalDocs,
        'counts'         => $counts,
        'videos'         => $videos,
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
Route::get('/visi-misi', function() {
    return Inertia::render('Profil/VisiMisi', [
        'item' => \App\Models\ProfileItem::where('slug', 'visi-misi')->first()
    ]);
});
Route::get('/dasar-hukum', function() {
    return Inertia::render('Profil/DasarHukum', [
        'item' => \App\Models\ProfileItem::where('slug', 'dasar-hukum')->first()
    ]);
});
Route::get('/struktur-organisasi', function() {
    return Inertia::render('Profil/StrukturOrganisasi', [
        'item' => \App\Models\ProfileItem::where('slug', 'struktur-organisasi')->first()
    ]);
});
Route::get('/tupoksi-bag-hukum', function() {
    return Inertia::render('Profil/Tupoksi', [
        'item' => \App\Models\ProfileItem::where('slug', 'tupoksi')->first()
    ]);
});
Route::get('/anggota-jdih', function() {
    $members = \App\Models\JdihMember::orderBy('sort_order')->get();
    return Inertia::render('Profil/AnggotaJdih', [
        'members' => $members
    ]);
});
Route::get('/kedudukan-dan-alamat', function() {
    return Inertia::render('Profil/KedudukanAlamat', [
        'item' => \App\Models\ProfileItem::where('slug', 'kedudukan-alamat')->first()
    ]);
});
Route::get('/sop', function() {
    return Inertia::render('Profil/Sop', [
        'item' => \App\Models\ProfileItem::where('slug', 'sop')->first()
    ]);
});


Route::get('/putusan', function(\Illuminate\Http\Request $request) {
    $cat = \App\Models\Category::where('slug', 'putusan')->firstOrFail();
    $query = \App\Models\LegalDocument::where('category_id', $cat->id);
    
    $documents = $query->latest('published_at')
        ->paginate(10)
        ->through(fn($doc) => [
            'id' => $doc->id,
            'nomor' => $doc->document_number,
            'jenis' => $doc->document_type ?? 'Putusan',
            'tanggal' => $doc->published_at?->format('Y-m-d') ?? $doc->created_at->format('Y-m-d'),
            'abstrak' => $doc->abstract ?? 'Putusan pengadilan terkait perkara hukum di wilayah Kabupaten Banjarnegara.',
        ]);

    return Inertia::render('Hukum/Putusan', [
        'documents' => $documents,
    ]);
});

Route::get('/kerja-sama-daerah', function(\Illuminate\Http\Request $request) {
    $cat = \App\Models\Category::where('slug', 'kerja-sama-daerah')->firstOrFail();
    $query = \App\Models\LegalDocument::where('category_id', $cat->id);
    
    $documents = $query->latest('published_at')
        ->get()
        ->map(fn($doc) => [
            'id' => $doc->id,
            'nomor' => $doc->document_number,
            'judul' => $doc->title,
            'pihak' => $doc->entity ?? 'Pemerintah Kabupaten Banjarnegara',
            'jenis' => $doc->document_type ?? 'Kerja Sama',
            'tanggal' => $doc->published_at?->format('Y-m-d') ?? $doc->created_at->format('Y-m-d'),
        ]);

    return Inertia::render('Hukum/KerjaSama', [
        'documents' => $documents,
    ]);
});

// ---------------------------------------------------------------
// PRODUK HUKUM DESA (EXPERIMENT)
// ---------------------------------------------------------------
Route::get('/produk-hukum-desa',       [ProdukHukumDesaController::class, 'index']);
Route::get('/api/produk-hukum-desa',   [ProdukHukumDesaController::class, 'proxy']);

// ---------------------------------------------------------------
// ASISTEN AI
// ---------------------------------------------------------------
Route::post('/ai/ask', [AiAssistantController::class, 'ask'])->name('ai.ask');

// ---------------------------------------------------------------
// KOMENTAR
// ---------------------------------------------------------------
Route::post('/comments', [CommentController::class, 'store'])->name('comments.store');
Route::post('/ai/ask', [AiAssistantController::class, 'ask']);

// ---------------------------------------------------------------
// IKM (INDEKS KEPUASAN MASYARAKAT)
// ---------------------------------------------------------------
Route::post('/community-satisfaction', [\App\Http\Controllers\CommunitySatisfactionController::class, 'store'])->name('ikm.store');

// ---------------------------------------------------------------
// INFORMASI
// ---------------------------------------------------------------
// INFORMASI
// ---------------------------------------------------------------
Route::get('/statistik', function() {
    $docs = \App\Models\LegalDocument::with('category')->get();
    
    // Data Jenis
    $jenisCounts = $docs->groupBy(fn($d) => $d->category->name ?? 'Lainnya')
        ->map(fn($group, $key) => [
            'name' => $key,
            'short' => $key,
            'jumlah' => $group->count(),
            'href' => '/pencarian?kategori=' . urlencode($key)
        ])->values()->toArray();

    // Data Tahun (Last 5 years)
    $tahunCounts = $docs->groupBy('year')
        ->map(fn($group, $year) => [
            'year' => (string)$year,
            'jumlah' => $group->count()
        ])
        ->sortBy('year')
        ->take(-5)
        ->values()->toArray();

    // Data Pie
    $colors = ['#0d9488', '#3b82f6', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444'];
    $dataPie = collect($jenisCounts)->sortByDesc('jumlah')->take(5)->values()->map(function($item, $index) use ($colors) {
        return [
            'name' => $item['name'],
            'value' => $item['jumlah'],
            'color' => $colors[$index % count($colors)]
        ];
    })->toArray();

    // IKM Score
    $ikm = \App\Models\CommunitySatisfaction::all();
    $ikmScore = 0;
    if($ikm->count() > 0) {
        $total = 0; $count = 0;
        foreach($ikm as $r) {
            foreach(['u1','u2','u3','u4','u5','u6','u7','u8','u9'] as $u) {
                if($r->$u) { $total += $r->$u; $count++; }
            }
        }
        $ikmScore = $count > 0 ? round(($total/$count) * 25, 2) : 0;
    }

    return Inertia::render('Statistik', [
        'dataJenis' => array_values($jenisCounts),
        'dataTahun' => array_values($tahunCounts),
        'dataPie' => $dataPie,
        'total' => $docs->count(),
        'ikmScore' => $ikmScore
    ]);
});

Route::get('/berita',          function() {
    return Inertia::render('Informasi/Berita', [
        'news' => \App\Models\News::latest()->paginate(9)
    ]);
});
Route::get('/berita/{slug}',    function($slug) {
    $post = \App\Models\News::where('slug', $slug)->firstOrFail();
    $related = \App\Models\News::where('id', '!=', $post->id)
        ->where('status', 'published')
        ->latest()
        ->take(4)
        ->get();

    return Inertia::render('Informasi/DetailBerita', [
        'post' => $post,
        'relatedNews' => $related
    ]);
});
Route::get('/galeri', function() {
    $items = \App\Models\GalleryItem::latest('date')
        ->get()
        ->map(fn($item) => [
            'id' => $item->id,
            'title' => $item->title,
            'image' => asset('storage/' . $item->image_path),
            'date' => $item->date ? $item->date->format('Y-m-d') : null,
        ]);

    return Inertia::render('Informasi/Galeri', [
        'items' => $items
    ]);
});
Route::get('/video', function() {
    $items = \App\Models\VideoContent::latest()
        ->get()
        ->map(fn($item) => [
            'id' => $item->id,
            'title' => $item->title,
            'video_url' => $item->video_url,
            'thumbnail_path' => $item->thumbnail_path,
            'platform' => $item->platform,
            'year' => $item->year,
            'duration' => $item->duration,
            'description' => $item->description,
        ]);

    return Inertia::render('Informasi/Video', [
        'items' => $items
    ]);
});


// ---------------------------------------------------------------
// DASHBOARD & PROFILE (AUTH)
// ---------------------------------------------------------------
/* ------------------------------------------------------------------ */
/* LAYANAN HUKUM                                                       */
/* ------------------------------------------------------------------ */
Route::get('/bantuan-hukum', fn() => Inertia::render('Layanan/BantuanHukum'))->name('layanan.bankum');
Route::get('/konsultasi-hukum', fn() => Inertia::render('Layanan/KonsultasiHukum'))->name('layanan.konsultasi');
Route::get('/bankum', fn() => redirect('/bantuan-hukum')); // Alias to prevent 404

// Re-verify existing route
// Route::get('/kerja-sama-daerah', fn() => Inertia::render('Hukum/KerjaSama'));

Route::get('/unduh', function () {
    return Inertia::render('Informasi/Download', [
        'files' => \App\Models\KatalogDownload::orderBy('created_at', 'desc')->get()
    ]);
})->name('unduh');

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

// ---------------------------------------------------------------
// DOWNLOAD TRACKING — increment download_count & redirect to file
// ---------------------------------------------------------------
Route::get('/dokumen/{id}/unduh', function (int $id) {
    $document = \App\Models\LegalDocument::findOrFail($id);

    if (!$document->file_path) {
        abort(404, 'File tidak tersedia.');
    }

    // Increment download count
    $document->increment('download_count');

    $fileUrl = Storage::disk('public')->url($document->file_path);

    return redirect()->away($fileUrl);
})->name('dokumen.unduh');




require __DIR__.'/auth.php';

// ---------------------------------------------------------------
// INVENTARISASI HUKUM – LIST & DETAIL (dynamic)
// ---------------------------------------------------------------
Route::get("/{category:slug}", function(string $slug, \Illuminate\Http\Request $request) {
    $cat = \App\Models\Category::where('slug', $slug)->first();
    
    // If not a category, it might be a static page or handled later
    if (!$cat) {
        return abort(404);
    }

    $query = \App\Models\LegalDocument::where('category_id', $cat->id);

    // Apply filters
    $query->when($request->namaDokumen ?? $request->q, function($q, $val) {
        $q->where('title', 'like', '%' . $val . '%');
    });

    $query->when($request->nomor, function($q, $val) {
        $q->where('document_number', 'like', '%' . $val . '%');
    });

    $query->when($request->tahun, function($q, $val) {
        $q->where('year', $val);
    });

    $query->when($request->status, function($q, $val) {
        $q->where('status', $val);
    });

    $documents = $query->orderByRaw('COALESCE(published_at, created_at) DESC')
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
        'filters'   => [
            'namaDokumen' => $request->namaDokumen ?? $request->q,
            'nomor'       => $request->nomor,
            'tahun'       => $request->tahun,
            'status'      => $request->status,
        ],
    ]);
})->where('category', '[a-z0-9\-]+');

Route::get("/{category:slug}/{id}", function(string $slug, $id) {
    $cat = \App\Models\Category::where('slug', $slug)->firstOrFail();
    $document = \App\Models\LegalDocument::with(['category', 'relatedDocuments', 'referencedByDocuments'])->findOrFail($id);

    // Increment view count on every page visit
    $document->increment('view_count');

    // Resolve file URLs using the correct disk
    $fileUrl = $document->file_path
        ? Storage::disk('public')->url($document->file_path)
        : null;

    $abstractFileUrl = $document->abstract_file_path
        ? Storage::disk('public')->url($document->abstract_file_path)
        : null;

    // Download tracking URL
    $downloadUrl = $document->file_path
        ? route('dokumen.unduh', $document->id)
        : null;

    return Inertia::render('Hukum/DetailDokumen', [
        'kategori' => $cat->slug,
        'title'    => $cat->name,
        'code'     => $cat->code,
        'document' => [
            'id'                      => $document->id,
            'title'                   => $document->title,
            'number'                  => $document->document_number,
            'document_number'         => $document->document_number,
            'year'                    => $document->year,
            'type'                    => $document->category->name,
            'document_type'           => $document->document_type,
            'teu'                     => $document->teu,
            'abbreviation'            => $document->abbreviation,
            'code'                    => $cat->code,
            'status'                  => $document->status,
            'status_note'             => $document->status_note,
            'related_text'            => $document->related_regulations_text,
            'implementing_regulations' => $document->implementing_regulations,
            'abstract'                => $document->abstract,
            'abstract_file_path'      => $document->abstract_file_path,
            'abstract_file'           => $abstractFileUrl,
            'file_path'               => $document->file_path,
            'file'                    => $fileUrl,
            'download_url'            => $downloadUrl,
            'comments'                => $document->comments()->where('is_approved', true)->orderBy('created_at', 'desc')->get(),
            'published_at'            => $document->published_at,
            'promulgated_at'          => $document->promulgated_at,
            'place_of_enactment'      => $document->place_of_enactment,
            'publisher_place'         => $document->publisher_place,
            'source'                  => $document->source,
            'subject_text'            => $document->subject,
            'subject'                 => is_string($document->subject) ? json_decode($document->subject) : $document->subject,
            'govt_field'              => $document->govt_field,
            'legal_field'             => $document->legal_field,
            'language'                => $document->language,
            'location'                => $document->location,
            'signer'                  => $document->signer,
            'judicial_review'         => $document->judicial_review,
            'initiator'               => $document->initiator,
            'view_count'              => $document->view_count,
            'download_count'          => $document->download_count,
            'page_count'              => $document->page_count,
            'entity'                  => $document->entity,
            'created_at'              => $document->created_at?->toISOString(),
            'updated_at'              => $document->updated_at?->toISOString(),
            'category'                => $document->category,
            'date_published'          => $document->published_at?->format('Y-m-d'),
            'date_promulgated'        => $document->promulgated_at?->format('Y-m-d'),
            'place'                   => $document->place_of_enactment,
            'related'                 => $document->relatedDocuments->map(fn($r) => [
                'id'     => $r->id,
                'number' => $r->document_number,
                'year'   => $r->year,
                'title'  => $r->title,
                'type'   => $r->category?->name ?? 'Dokumen',
                'slug'   => $r->category?->slug ?? 'katalog',
            ]),
            'referenced_by'           => $document->referencedByDocuments->map(fn($r) => [
                'id'     => $r->id,
                'number' => $r->document_number,
                'year'   => $r->year,
                'title'  => $r->title,
                'type'   => $r->category?->name ?? 'Dokumen',
                'slug'   => $r->category?->slug ?? 'katalog',
            ]),
        ],
    ]);
});
