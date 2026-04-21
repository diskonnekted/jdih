<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
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
                'image'    => $article->image ? '/storage/' . $article->image : '/images/hero.webp',
            ];
        });

    $activeBanner = \App\Models\Banner::where('is_active', true)->latest()->first();

    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
        'news'           => $latestNews,
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
// INVENTARISASI HUKUM – LIST PER KATEGORI (dynamic)
// ---------------------------------------------------------------
$kategoriRoutes = [
    'peraturan-daerah'            => ['Peraturan Daerah', 'PERDA'],
    'peraturan-bupati'            => ['Peraturan Bupati', 'PERBUP'],
    'keputusan-bupati'            => ['Keputusan Bupati', 'KEPBUP'],
    'instruksi-bupati'            => ['Instruksi Bupati', 'INBUP'],
    'keputusan-sekretaris-daerah' => ['Keputusan Sekretaris Daerah', 'KEPSDA'],
    'dokumen-hukum-terjemahan'    => ['Dokumen Hukum Terjemahan', 'DHT'],
    'dokumen-hukum-langka'        => ['Dokumen Hukum Langka', 'DHL'],
    'naskah-akademik'             => ['Naskah Akademik', 'NA'],
    'raperda'                     => ['Raperda', 'RPD'],
    'analisis-evaluasi-hukum'     => ['Analisis & Evaluasi Hukum', 'AEH'],
    'ranham'                      => ['RANHAM', 'RNH'],
    'risalah-rapat'               => ['Risalah Rapat', 'RR'],
    'artikel-bidang-hukum'        => ['Artikel Bidang Hukum', 'ABH'],
    'propemperda'                 => ['Propemperda', 'PPD'],
    'katalog'                     => ['Katalog', 'KTL'],
    'surat-edaran'                => ['Surat Edaran', 'SE'],
];

foreach ($kategoriRoutes as $slug => [$title, $code]) {
    Route::get("/{$slug}", function() use ($slug, $title, $code) {
        return Inertia::render('Hukum/DaftarDokumen', [
            'kategori' => $slug,
            'title'    => $title,
            'code'     => $code,
        ]);
    });
    Route::get("/{$slug}/{id}", function(string $id) use ($slug, $title, $code) {
        return Inertia::render('Hukum/DetailDokumen', [
            'kategori' => $slug,
            'title'    => $title,
            'code'     => $code,
            'id'       => $id,
        ]);
    });
}

Route::get('/putusan',           fn() => Inertia::render('Hukum/Putusan'));
Route::get('/kerja-sama-daerah', fn() => Inertia::render('Hukum/KerjaSama'));

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
Route::get('/statistik', fn() => Inertia::render('Statistik'));

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
