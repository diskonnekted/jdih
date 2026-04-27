<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProdukHukumDesaController;
use App\Http\Controllers\AiAssistantController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LegalConsultationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
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

    $latestDocs = \App\Models\LegalDocument::with('category')
        ->orderBy('year', 'desc')
        ->orderByRaw('CAST(document_number AS UNSIGNED) DESC')
        ->orderBy('document_number', 'desc')
        ->limit(5)
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
        ->mapWithKeys(fn($item) => [$item->category->name ?? 'unknown' => $item->total])
        ->toArray();

    $counts['Putusan'] = \App\Models\LegalDecision::count();

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

    $totalViews = \App\Models\LegalDocument::sum('view_count');

    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
        'news'           => $latestNews,
        'infographics'   => $infographics,
        'latestDocs'     => $latestDocs,
        'counts'         => $counts,
        'totalViews'     => $totalViews,
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
// KATALOG & SEARCH
// ---------------------------------------------------------------
Route::get('/katalog', function(\Illuminate\Http\Request $request) {
    $query = \App\Models\LegalDocument::with('category');

    $query->when($request->namaDokumen ?? $request->q, function($q, $val) {
        $keywords = explode(' ', $val);
        foreach ($keywords as $keyword) {
            if (empty($keyword)) continue;
            $q->where(function($sq) use ($keyword) {
                $sq->where('title', 'like', '%' . $keyword . '%')
                   ->orWhere('document_number', 'like', '%' . $keyword . '%')
                   ->orWhere('year', 'like', '%' . $keyword . '%')
                   ->orWhere('subject', 'like', '%' . $keyword . '%')
                   ->orWhere('abbreviation', 'like', '%' . $keyword . '%')
                   ->orWhereHas('category', function($cq) use ($keyword) {
                       $cq->where('name', 'like', '%' . $keyword . '%')
                          ->orWhere('code', 'like', '%' . $keyword . '%');
                   });
            });
        }
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

    $documents = $query->orderBy('year', 'desc')
        ->orderByRaw('CAST(document_number AS UNSIGNED) DESC')
        ->orderBy('document_number', 'desc')
        ->paginate(12)
        ->withQueryString()
        ->through(fn($doc) => [
            'id' => $doc->id,
            'number' => $doc->document_number,
            'nomor' => $doc->document_number,
            'title' => $doc->title,
            'year' => $doc->year,
            'date' => $doc->published_at ? $doc->published_at->format('Y-m-d') : $doc->created_at->format('Y-m-d'),
            'status' => $doc->status,
            'type' => $doc->category->name ?? 'Dokumen',
            'slug' => $doc->category->slug ?? 'katalog',
            'subject' => $doc->subject,
        ]);

    return Inertia::render('Hukum/DaftarDokumen', [
        'kategori' => 'katalog',
        'title'    => 'Katalog Dokumen',
        'code'     => 'CATALOG',
        'documents' => $documents,
        'filters'   => [
            'namaDokumen' => $request->namaDokumen ?? $request->q,
            'nomor'       => $request->nomor,
            'tahun'       => $request->tahun,
            'status'      => $request->status,
        ],
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

// ---------------------------------------------------------------
// KHUSUS PUTUSAN & KERJASAMA
// ---------------------------------------------------------------
Route::get('/putusan', function(\Illuminate\Http\Request $request) {
    $query = \App\Models\LegalDecision::where('is_published', true);
    
    $documents = $query->orderBy('year', 'desc')
        ->orderBy('document_number', 'desc')
        ->paginate(10)
        ->through(fn($doc) => [
            'id' => $doc->id,
            'nomor' => $doc->document_number,
            'jenis' => $doc->court_type ?? 'Putusan',
            'tanggal' => $doc->created_at->format('Y-m-d'),
            'abstrak' => Str::limit(strip_tags($doc->content), 200) ?: 'Putusan pengadilan terkait perkara hukum di wilayah Kabupaten Banjarnegara.',
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
// LAYANAN HUKUM & LAINNYA
// ---------------------------------------------------------------
Route::get('/bantuan-hukum', fn() => Inertia::render('Layanan/BantuanHukum'))->name('layanan.bankum');
Route::get('/konsultasi-hukum', fn() => Inertia::render('Layanan/KonsultasiHukum'))->name('layanan.konsultasi');
Route::post('/konsultasi-hukum', [LegalConsultationController::class, 'store'])->name('layanan.konsultasi.store');
Route::get('/bankum', fn() => redirect('/bantuan-hukum'));

Route::get('/produk-hukum-desa',       [ProdukHukumDesaController::class, 'index']);
Route::get('/api/produk-hukum-desa',   [ProdukHukumDesaController::class, 'proxy']);

Route::post('/ai/ask', [AiAssistantController::class, 'ask'])->name('ai.ask');
Route::post('/comments', [CommentController::class, 'store'])->name('comments.store');
Route::post('/community-satisfaction', [\App\Http\Controllers\CommunitySatisfactionController::class, 'store'])->name('ikm.store');

// ---------------------------------------------------------------
// INFORMASI
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
        'dataJenis' => $dataJenis,
        'dataTahun' => $dataTahun,
        'dataPie' => $dataPie->map(fn($item) => [
            'name' => $item['name'],
            'value' => $item['jumlah'] ?? $item['value'],
            'color' => $item['color']
        ]),
        'total' => $dataJenis->sum('jumlah'),
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
Route::get('/unduh', function () {
    return Inertia::render('Informasi/Download', [
        'files' => \App\Models\KatalogDownload::orderBy('created_at', 'desc')->get()
    ]);
})->name('unduh');

// ---------------------------------------------------------------
// TRACKING & PROFILE
// ---------------------------------------------------------------
Route::get('/dokumen/{id}/unduh', function (int $id) {
    $document = \App\Models\LegalDocument::findOrFail($id);
    if (!$document->file_path) abort(404);
    $document->increment('download_count');
    return redirect()->away(Storage::disk('public')->url($document->file_path));
})->name('dokumen.unduh');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get("/putusan/{id}", function(int $id) {
    $doc = \App\Models\LegalDecision::findOrFail($id);
    return Inertia::render('Hukum/DetailPutusan', [
        'document' => $doc
    ]);
});

Route::get("/{category:slug}", function(string $slug, \Illuminate\Http\Request $request) {
    $cat = \App\Models\Category::where('slug', $slug)->first();
    if (!$cat) abort(404);

    $query = \App\Models\LegalDocument::where('category_id', $cat->id);

    $query->when($request->namaDokumen ?? $request->q, function($q, $val) {
        $keywords = explode(' ', $val);
        foreach ($keywords as $keyword) {
            if (empty($keyword)) continue;
            $q->where(function($sq) use ($keyword) {
                $sq->where('title', 'like', '%' . $keyword . '%')
                   ->orWhere('document_number', 'like', '%' . $keyword . '%')
                   ->orWhere('year', 'like', '%' . $keyword . '%')
                   ->orWhere('subject', 'like', '%' . $keyword . '%')
                   ->orWhere('abbreviation', 'like', '%' . $keyword . '%');
            });
        }
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

    $documents = $query->orderBy('year', 'desc')
        ->orderByRaw('CAST(document_number AS UNSIGNED) DESC')
        ->orderBy('document_number', 'desc')
        ->paginate(10)
        ->withQueryString()
        ->through(fn($doc) => [
            'id' => $doc->id,
            'number' => $doc->document_number,
            'nomor' => $doc->document_number,
            'title' => $doc->title,
            'year' => $doc->year,
            'date' => $doc->published_at?->format('Y-m-d') ?? $doc->created_at->format('Y-m-d'),
            'status' => $doc->status,
            'subject' => $doc->subject,
        ]);

    return Inertia::render('Hukum/DaftarDokumen', [
        'kategori' => $slug,
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
});

Route::get("/{category:slug}/{id}", function(string $slug, int $id) {
    $doc = \App\Models\LegalDocument::with('category')->findOrFail($id);
    $doc->increment('view_count');
    return Inertia::render('Hukum/DetailDokumen', [
        'document' => $doc,
        'kategori' => $slug
    ]);
});
