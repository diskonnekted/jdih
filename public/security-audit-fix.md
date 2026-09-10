# Laporan Perbaikan Security Audit — JDIH Banjarnegara

**Tanggal perbaikan:** 10 September 2026
**Berdasarkan:** `security-audit.md`
**Status:** Semua temuan telah ditangani, teruji lokal & produksi (https://jdih.rapidnet.id)

| # | Temuan | Severity | Status |
|---|--------|----------|--------|
| 1 | Rate limiting tidak konsisten | Tinggi | ✅ Diperbaiki |
| 2 | Endpoint sinkronisasi JDIHN tanpa autentikasi | Tinggi | ✅ Diperbaiki |
| 3 | Token API JDIHN tersimpan plaintext | Sedang | ✅ Diperbaiki |
| 4 | Path traversal pada pemrosesan PDF RAG | Tinggi | ✅ Diperbaiki |
| 5 | Potensi SSRF pada proxy desa | Tinggi | ✅ Diperbaiki |
| 6 | QR code open redirect + tanpa throttle | Sedang | ✅ Diperbaiki |
| 7 | Dokumentasi environment JDIHN tidak lengkap | Rendah | ✅ Diperbaiki |

---

## 1. Rate Limiting Tidak Konsisten (§2 Audit)

**Perubahan** (`routes/web.php`, `routes/auth.php`):

| Endpoint | Batas |
|----------|-------|
| `POST /public-consultation` | 10/menit |
| `POST /aspirations` | 10/menit |
| `POST /konsultasi-hukum` | 10/menit |
| `GET /api/produk-hukum-desa` | 30/menit |
| `GET /qrcode` | 30/menit |
| `POST /login`, `/register`, `/forgot-password`, `/reset-password` | 5/menit |
| `POST /confirm-password` | 6/menit |

Implementasi memakai middleware `throttle` langsung per-route (lebih eksplisit daripada named limiter terpusat).

## 2. Endpoint Sinkronisasi JDIHN Tanpa Autentikasi (§3.1)

**Perubahan** (`routes/web.php`): seluruh grup `Route::prefix('api/jdihn')` kini dilindungi `middleware(['auth', 'throttle:60,1'])` — mencakup `settings` (GET/POST), `sync-logs`, `sync/documents`, `sync/members`.

**Verifikasi:** akses tanpa login → `401 Unauthorized` (sebelumnya `200 OK`).

## 3. Token API JDIHN Tersimpan Plaintext (§3.2)

**Perubahan** (`app/Models/JdihApiSetting.php`):
- Daftar key sensitif (`$sensitiveKeys`, termasuk `jdihnh_api_token`) otomatis dienkripsi dengan `Crypt::encryptString()` saat `set()` dan didekripsi saat `get()`.
- **Fallback legacy**: nilai lama yang masih plaintext tetap terbaca normal (dekripsi gagal → kembalikan nilai asli), sehingga migrasi tidak merusak instalasi berjalan.
- Sumber kebenaran konfigurasi tetap tabel `jdih_api_settings` (bukan `.env`), dikelola via `/admin/jdih-sync-settings`.

## 4. Path Traversal pada Pemrosesan PDF RAG (§3.3)

**Perubahan** (`app/Services/RagService.php::extractTextFromPdf()`):
- Path dinormalisasi dengan `realpath()` dan **divalidasi berada di dalam** `storage/app/public` — di luar itu ditolak.
- Ekstensi wajib `.pdf`.
- Setiap percobaan traversal dicatat ke log (`Log::warning`) beserta path yang diminta.

## 5. Potensi SSRF pada Proxy Desa (§3.4)

**Perubahan** (`app/Http/Controllers/ProdukHukumDesaController.php::proxy()`) — ditulis ulang dengan pertahanan berlapis:

1. **Whitelist URL dari database**: hanya URL desa aktif di tabel `villages` yang boleh diproxy (dengan normalisasi trailing slash).
2. **Resolusi DNS & blokir IP privat**: host di-resolve, lalu IP diperiksa terhadap CIDR privat/loopback/reserved (`10.0.0.0/8`, `192.168.0.0/16`, `127.0.0.0/8`, `169.254.0.0/16`, dll.) via `ipInRange()`.
3. **Whitelist endpoint per-prefix**: hanya `internal_api/produk-hukum` (termasuk sub-path seperti `/kategori`), `internal_api/informasi-umum`, `internal_api/transparansi-publik`.
4. **Timeout 10 detik** dan pesan error generik (`502`) tanpa membocorkan detail internal.

**Verifikasi** (lokal & produksi):
- URL non-whitelist (google.com) → `403` ✅
- Endpoint di luar whitelist (`/api/users`) → `403` ✅
- `http://127.0.0.1:8000` → `403` ✅
- Desa valid + endpoint kategori → `200` ✅

**Regresi yang turut diperbaiki:** pencocokan whitelist semula terlalu ketat (exact match) sehingga `/internal_api/produk-hukum/kategori` dan URL tanpa trailing slash tertolak 403 — sudah dinormalisasi.

**Catatan sisa (rekomendasi lanjutan):** verifikasi TLS upstream (`'verify' => false`) masih dimatikan karena banyak situs `*.desa.id` memiliki sertifikat SSL yang rusak. Idealnya diaktifkan selektif setelah inventarisasi situs bermasalah.

## 6. QR Code Open Redirect + Tanpa Throttle (§3.5)

**Perubahan** (`routes/web.php`):
- Parameter `url` kini hanya menerima **path relatif internal** atau URL dengan **host yang sama** dengan `APP_URL`; URL eksternal arbitrer ditolak (dialihkan ke beranda) — menutup celah penyalahgunaan sebagai generator QR phishing.
- Pesan exception **tidak lagi dibocorkan** ke SVG fallback (detail hanya di log).
- Ditambahkan `throttle:30,1`.

**Verifikasi:** `?url=https://evil.example` menghasilkan QR ke beranda situs, bukan ke domain luar.

## 7. Dokumentasi Environment Tidak Lengkap (§3.6)

**Perubahan** (`.env.example`): ditambahkan dokumentasi:
- `CFROUTER_API_KEY`, `CFROUTER_API_URL`, model & parameter RAG (untuk asisten AI).
- Penjelasan bahwa konfigurasi JDIHN **tidak dibaca dari `.env`** melainkan dikelola via admin panel `/admin/jdih-sync-settings` dan tersimpan terenkripsi di database, beserta alternatif CLI `php artisan jdih:configure-api`.

---

## Deployment

| Lingkungan | Status |
|------------|--------|
| Lokal (XAMPP) | ✅ Teruji |
| GitHub (`main`) | ✅ Ter-push (commit `8a99a0d`, `443d6b6`, `c9e11c1`) |
| Produksi (jdih.rapidnet.id) | ✅ Ter-deploy & ter-verifikasi via HTTP |
