# Laporan Audit Keamanan & Verifikasi Komponen SP (Security Patterns)
## Portal JDIH Kabupaten Banjarnegara

> **Tanggal Audit:** 2026-09-10  
> **Tipe Laporan:** Hasil Temuan Mentah (Raw Audit Findings) & Verifikasi Komponen Faktual  
> **Status Kode Sumber:** Unmodified / As-Is (Analisis Murni Tanpa Perubahan Kode)  
> **Lingkup Pemeriksaan:** Public Web, Admin Panel (`/admin`), RAG Chatbot, JDIHN API Sync, Isolasi Rate Limiter, & SSRF/Traversal

---

## 1. Ringkasan Eksekutif Hasil Pemeriksaan

Berdasarkan audit faktual terhadap basis kode JDIH Banjarnegara, ditemukan sejumlah komponen keamanan (*Security Patterns / SP*) yang **belum terpasang** atau **belum terpasang secara terpisah (terisolasi)**:

1. **Rate Limiting Belum Terisolasi & Banyak Rute Kritis Tanpa Limiter**:
   * Tidak ada named limiter kustom (`RateLimiter::for`) yang didefinisikan di `AppServiceProvider.php` maupun `bootstrap/app.php`.
   * Rute publik penting yang menampung form pengguna (`/aspirations`, `/public-consultation`, `/konsultasi-hukum`), proxy desa (`/api/produk-hukum-desa`), dan generator QR (`/qrcode`) **sama sekali tidak memiliki rate limiter**.
   * Rute autentikasi (`/login`, `/register`, `/forgot-password`, `/reset-password`) tidak memiliki proteksi `throttle` pada level rute di `routes/auth.php`.
2. **Endpoint Sinkronisasi JDIHN Terbuka Tanpa Autentikasi (`/api/jdihn/*`)**:
   * Rute pengaturan (`/settings`), log (`/sync-logs`), dan picu sinkronisasi (`/sync/documents`, `/sync/members`) tidak dilindungi middleware `auth` maupun validasi API Key.
3. **Penyimpanan Token API JDIHN dalam Bentuk Plaintext**:
   * Token disimpan dalam bentuk teks polos pada database tanpa enkripsi di level model.
4. **Potensi Path Traversal & Shell Execution pada Ekstraksi PDF RAG**:
   * `RagService.php` mengeksekusi binary `pdftotext` via `exec()` tanpa validasi `realpath()` terhadap direktori storage yang diizinkan.
5. **Potensi SSRF pada Proxy API Desa (`ProdukHukumDesaController.php`)**:
   * Validasi domain hanya mengandalkan `str_ends_with($villageUrl, '.desa.id')` dengan `verify => false` tanpa pembatasan resolusi IP privat/loopback.

---

## 2. Pemeriksaan Faktual Isolasi Rate Limiter (Rate Limiter Audit)

### A. Status Konfigurasi Rate Limiter Terpusat
* **Lokasi Diperiksa:** `app/Providers/AppServiceProvider.php` & `bootstrap/app.php`
* **Hasil:** ❌ **TIDAK DITEMUKAN (ABSENT)**
* **Temuan Faktual:**
  * Tidak terdapat registrasi `RateLimiter::for('...', ...)` di dalam method `boot()` pada `AppServiceProvider.php`.
  * Pembatasan hanya mengandalkan middleware throttle bawaan Laravel dengan string hardcoded pada beberapa rute tertentu.

### B. Matriks Ketersediaan Limiter per Bagian (Route-by-Route Factual Audit)

| Bagian / Endpoint | Metode | File & Baris | Status Limiter | Detail Temuan Faktual |
|---|---|---|---|---|
| **Aspirasi Masyarakat** | `POST /aspirations` | `routes/web.php:90` | ❌ **TIDAK ADA** | Terbuka tanpa throttle. Penyerang dapat membanjiri database dengan entri pesan palsu (Spam/DoS). |
| **Konsultasi Publik Draft** | `POST /public-consultation` | `routes/web.php:89` | ❌ **TIDAK ADA** | Terbuka tanpa throttle. Formulir pengiriman masukan draf peraturan dapat di-spam massal. |
| **Konsultasi Hukum Online** | `POST /konsultasi-hukum` | `routes/web.php:537` | ❌ **TIDAK ADA** | Terbuka tanpa throttle. Formulir tiket permohonan konsultasi hukum tidak dibatasi. |
| **Proxy API Produk Hukum Desa**| `GET /api/produk-hukum-desa` | `routes/web.php:541` | ❌ **TIDAK ADA** | Terbuka tanpa throttle. Endpoint server-side HTTP client ke website 278 desa dapat disalahgunakan untuk DoS. |
| **Dynamic SVG QR Code** | `GET /qrcode` | `routes/web.php:17` | ❌ **TIDAK ADA** | Terbuka tanpa throttle. Pembuatan format SVG vektor melalui CPU server dapat memicu resource exhaustion. |
| **Login Pengguna** | `POST /login` | `routes/auth.php:23` | ⚠️ **PARSIAL** | Hanya mengandalkan counter internal pada `LoginRequest.php` (5 percobaan/2 menit). Tidak ada route-level throttle (`throttle:5,1` / `throttle:login`), rentan credential stuffing. |
| **Pendaftaran Pengguna** | `POST /register` | `routes/auth.php:18` | ❌ **TIDAK ADA** | Tidak ada throttle. Memungkinkan registrasi akun massal secara otomatis. |
| **Lupa & Reset Password** | `POST /forgot-password`<br>`POST /reset-password` | `routes/auth.php:28`<br>`routes/auth.php:34` | ❌ **TIDAK ADA** | Tidak ada throttle. Memungkinkan pengiriman email reset password secara beruntun (Email flood/spamming). |
| **JDIHN API Sync** | `POST /api/jdihn/*` | `routes/web.php:956-972`| ❌ **TIDAK ADA** | Seluruh 5 endpoint JDIHN integrasi tidak memiliki rate limiter apapun. |
| **Chatbot AI Hukum (RAG)** | `POST /ai/ask` | `routes/web.php:551` | ⚠️ **GLOBAL** | Terpasang `throttle:20,1` (string hardcoded). Bersifat global per-IP, belum diisolasi per-User/Session terautentikasi. |
| **Respon Dialog Publik** | `POST /dialog-publik/{id}/respond` | `routes/web.php:547` | ⚠️ **GENIK** | Terpasang `throttle:10,1` (10 request/menit). |
| **Komentar Berita** | `POST /comments` | `routes/web.php:554` | ⚠️ **GENIK** | Terpasang `throttle:30,1` (30 request/menit). |
| **Survei Kepuasan IKM** | `POST /community-satisfaction` | `routes/web.php:557` | ⚠️ **GENIK** | Terpasang `throttle:5,1` (5 request/menit). |

---

## 3. Temuan Kerentanan & Komponen yang Belum Diperbaiki

### 3.1. Ketiadaan Autentikasi pada Modul Integrasi JDIHN
* **Lokasi Berkas:** [routes/web.php:956-972](file:///home/gbc/Projects/jdih/routes/web.php#L956-L972) & [app/Http/Controllers/Api/JdihSyncController.php](file:///home/gbc/Projects/jdih/app/Http/Controllers/Api/JdihSyncController.php)
* **Status:** 🔴 **KRITIS (Unauthenticated Sensitive Endpoints)**
* **Detail Faktual:**
  ```php
  Route::prefix('api/jdihn')->group(function () {
      Route::post('/sync/documents', [App\Http\Controllers\Api\JdihSyncController::class, 'syncDocuments'])->name('api.jdihn.sync.documents');
      Route::post('/sync/members', [App\Http\Controllers\Api\JdihSyncController::class, 'syncMembers'])->name('api.jdihn.sync.members');
      Route::get('/settings', [App\Http\Controllers\Api\JdihSyncController::class, 'getSettings'])->name('api.jdihn.settings');
      Route::post('/settings', [App\Http\Controllers\Api\JdihSyncController::class, 'updateSettings'])->name('api.jdihn.settings.update');
      Route::get('/sync-logs', [App\Http\Controllers\Api\JdihSyncController::class, 'getSyncLogs'])->name('api.jdihn.sync-logs');
  });
  ```
* **Dampak & Vektor Serangan:**
  1. `POST /api/jdihn/settings`: Siapapun dari jaringan internet dapat mengirim request untuk mengganti nilai `jdihnh_api_url` ke URL server milik penyerang, membajak arah sinkronisasi dokumen hukum daerah.
  2. `GET /api/jdihn/sync-logs`: Riwayat status sinkronisasi, payload data JSON, dan informasi internal sistem dapat dibaca secara bebas tanpa login.
  3. `POST /api/jdihn/sync/documents` & `sync/members`: Dapat dipicu berulang kali oleh pihak luar sehingga memaksa server melakukan request HTTP keluar dalam jumlah masif.

---

### 3.2. Penyimpanan Token Rahasia dalam Format Teks Polos (Plaintext)
* **Lokasi Berkas:** [app/Models/JdihApiSetting.php](file:///home/gbc/Projects/jdih/app/Models/JdihApiSetting.php) (Lines 23–56) & Tabel `jdih_api_settings`
* **Status:** 🟡 **SEDANG (Sensitive Data Exposure)**
* **Detail Faktual:**
  * Method `JdihApiSetting::set()` dan `get()` menyimpan nilai konfigurasi secara langsung ke kolom `value` bertipe `TEXT`:
    ```php
    public static function set(string $key, $value, string $type = 'string'): void
    {
        $setting = self::updateOrCreate(
            ['key' => $key],
            [
                'value' => is_array($value) ? json_encode($value) : $value,
                'type' => $type,
            ]
        );
    }
    ```
  * Token API JDIHN (`jdihnh_api_token`) disimpan dalam bentuk teks polos. Jika database bocor (melalui SQL Injection, unauthorized database dump, atau backup file tidak terenkripsi), kredensial integrasi BPHN langsung terekspos.

---

### 3.3. Potensi Path Traversal & Shell Command pada Ekstraksi PDF RAG
* **Lokasi Berkas:** [app/Services/RagService.php:224-237](file:///home/gbc/Projects/jdih/app/Services/RagService.php#L224-L237)
* **Status:** 🟠 **TINGGI (Arbitrary File Read / Path Traversal Risk)**
* **Kode Sumber Faktual:**
  ```php
  protected function extractTextFromPdf(string $filePath): string
  {
      if (exec('pdftotext -v 2>&1', $output, $returnCode) && $returnCode === 0) {
          $tempFile = tempnam(sys_get_temp_dir(), 'pdf_');
          exec("pdftotext \"" . escapeshellarg($filePath) . "\" \"" . escapeshellarg($tempFile) . "\" 2>&1");
          $text = file_get_contents($tempFile);
          unlink($tempFile);
          return trim($text ?? '');
      }
      return '';
  }
  ```
* **Dampak & Analisis Risiko:**
  1. `$filePath` berasal dari kolom `file_path` di database. Tidak ada validasi `realpath()` yang memastikan berkas berada di dalam direktori `storage/app/public/`.
  2. Sintaks `\"" . escapeshellarg($filePath) . "\"` membungkus hasil `escapeshellarg` (yang sudah memiliki tanda petik tunggal) dengan tanda petik ganda, yang berpotensi menghasilkan argumen aneh pada sub-shell Linux.
  3. Proyek telah memiliki dependensi `smalot/pdfparser` di `composer.json`, namun fungsi ini masih bergantung pada command sistem `exec('pdftotext ...')` yang rawan diblokir oleh `disable_functions` pada server hosting standar.

---

### 3.4. Potensi SSRF pada Proxy API Produk Hukum Desa
* **Lokasi Berkas:** [app/Http/Controllers/ProdukHukumDesaController.php:40-63](file:///home/gbc/Projects/jdih/app/Http/Controllers/ProdukHukumDesaController.php#L40-L63)
* **Status:** 🔴 **KRITIS (Server-Side Request Forgery)**
* **Kode Sumber Faktual:**
  ```php
  $villageUrl = $request->query('url');
  $endpoint = $request->query('endpoint', '/internal_api/produk-hukum');
  ...
  if (!$isValidVillage) {
      if (!str_ends_with($villageUrl, '.desa.id')) {
          return response()->json(['error' => 'URL desa tidak terdaftar atau tidak valid.'], 403);
      }
  }

  $response = Http::withOptions(['verify' => false])
      ->get($villageUrl . $endpoint, $query);
  ```
* **Dampak & Vektor Serangan:**
  1. `str_ends_with($villageUrl, '.desa.id')` memeriksa URL mentah, bukan host terurai. Parameter seperti `http://192.168.1.1:8080/probe?.desa.id` atau `http://127.0.0.1:3306/.desa.id` dapat lolos validasi.
  2. Tidak ada resolusi DNS (`gethostbyname`) untuk memblokir IP rentang privat/loopback (`127.0.0.0/8`, `10.0.0.0/8`, `192.168.0.0/16`, dll).
  3. Penonaktifan verifikasi TLS (`verify => false`) memungkinkan penyerang melakukan intersepsi lalu lintas Man-in-the-Middle (MITM).
  4. Nilai `$endpoint` dapat dimanipulasi oleh penyerang untuk memindai path internal lain pada server target.

---

### 3.5. Open Redirect / Phishing via Endpoint QR Code
* **Lokasi Berkas:** [routes/web.php:17-45](file:///home/gbc/Projects/jdih/routes/web.php#L17-L45)
* **Status:** 🟡 **SEDANG (Unvalidated URL Redirection / Phishing Generator)**
* **Detail Faktual:**
  * Route `/qrcode` menerima parameter `?url=`. Meskipun sudah ada validasi dasar terhadap IP privat (`127.0.0.1`, `localhost`), rute ini masih memperbolehkan domain luar sembarang selama lolos `FILTER_VALIDATE_URL`.
  * Penyerang dapat memanfaatkan generator resmi Pemda untuk membuat QR Code yang mengarah ke situs phishing eksternal (misal: `/qrcode?url=https://situs-phishing.com`), menyamarkan tautan jahat dengan kredibilitas domain pemerintah daerah.

---

### 3.6. Manajemen Kunci API pada Lingkungan (`.env.example`)
* **Lokasi Berkas:** [.env.example](file:///home/gbc/Projects/jdih/.env.example)
* **Status:** 🟡 **SEDANG (Undocumented Environment Keys)**
* **Detail Faktual:**
  * Variabel `GROQ_API_KEY`, `CFROUTER_API_KEY`, dan kunci sinkronisasi JDIHN tidak terdokumentasi sama sekali di `.env.example`.
  * Ketiadaan template resmi meningkatkan potensi pengembang menyalin kredensial asli atau melakukan hardcoding pada kode sumber.

---

## 4. Matriks Rekomendasi Perbaikan (Security Action Items)

Jika aplikasi ini nantinya diperbaiki oleh tim pengembang resminya, berikut adalah daftar perbaikan spesifik yang direkomendasikan:

| # | Komponen Masalah | Tindakan Perbaikan yang Direkomendasikan |
|---|---|---|
| 1 | **Rate Limiting Terpisah** | Daftarkan 6 named limiter di `AppServiceProvider.php` (`ai-chat`, `public-forms`, `village-proxy`, `qr-generator`, `jdihn-sync`, `auth-attempts`) dan pasangkan pada masing-masing rute di `routes/web.php` dan `routes/auth.php`. |
| 2 | **Autentikasi JDIHN Sync** | Masukkan rute `settings` dan `sync-logs` ke dalam `middleware(['auth'])`. Tambahkan verifikasi header secret key (`X-JDIH-API-KEY`) pada rute `sync/documents` dan `sync/members`. |
| 3 | **Enkripsi Token di DB** | Gunakan `Crypt::encryptString()` saat menyimpan `jdihnh_api_token` dan `Crypt::decryptString()` saat membacanya di [JdihApiSetting.php](file:///home/gbc/Projects/jdih/app/Models/JdihApiSetting.php). |
| 4 | **Pengamanan Ekstraksi PDF** | Tambahkan validasi `realpath()` terhadap `storage_path('app/public')` di `RagService.php`, dan alihkan ekstraksi teks utama menggunakan library PHP `Smalot\PdfParser\Parser`. |
| 5 | **Pengamanan SSRF Desa** | Urai host dengan `parse_url()`, validasi DNS dengan `gethostbyname()`, blokir IP privat (`FILTER_FLAG_NO_PRIV_RANGE`), dan kunci `$endpoint` ke daftar putih resmi. |
| 6 | **Domain Whitelist QR Code** | Batasi pembuatan QR Code hanya untuk path lokal internal atau domain berakhiran `.banjarnegarakab.go.id`, `.desa.id`, dan `.kemkumham.go.id`. |
| 7 | **Dokumentasi `.env.example`**| Cantumkan placeholder `GROQ_API_KEY=`, `CFROUTER_API_KEY=`, dan `JDIH_API_SYNC_KEY=` pada `.env.example`. |
