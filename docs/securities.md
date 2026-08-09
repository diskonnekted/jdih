# CATATAN SECURITY HARDENING
## Aplikasi JDIH Banjarnegara

**Tanggal Audit:** 09 Agustus 2026
**Dibuat oleh:** Audit keamanan internal (AI Analysis)
**Status:** ⚠️ **PERLU TINDAK LANJUT** (Score: 6.5/10)

**Full Report:** [`SECURITY-AUDIT-REPORT.md`](./SECURITY-AUDIT-REPORT.md)

---

## QUICK SUMMARY

| Category | Issues | Fixed | Pending |
|----------|--------|-------|---------|
| 🔴 Critical | 4 | 1 | 3 |
| 🟠 High | 4 | 1 | 3 |
| 🟡 Medium | 4 | 1 | 3 |
| **TOTAL** | **12** | **3** | **9** |

### Fixed (✅)
1. ✅ **BUG-008** — SSRF protection on QR code endpoint
2. ✅ **BUG-012** — Rate limiting on public POST endpoints
3. ✅ **BUG-018** — QR code fallback error handling

### Needs Fix (⚠️)
1. ⚠️ CSP policy masih longgar (`unsafe-inline`, `unsafe-eval`)
2. ⚠️ Session belum secure (`SESSION_SECURE_COOKIE`, `SESSION_ENCRYPT`)
3. ⚠️ File upload validation perlu diperkuat (virus scan, MIME check)
4. ⚠️ Role/permission system belum ada (all users = admin)
5. ⚠️ Monitoring & logging perlu setup

---

## RINGKASAN EKSEKUTIF

| Prioritas | Item | Status | Effort |
|---|---|---|---|
| 1 | `APP_DEBUG=false`, `APP_ENV=production`, `SESSION_SECURE_COOKIE=true` di server produksi | ❌ Belum | Kecil |
| 2 | Rotasi `GROQ_API_KEY` jika pernah ter-commit ke git; audit `.gitignore` | ❌ Belum | Kecil |
| 3 | Perkuat CSP: hapus `unsafe-eval`, minimalkan `unsafe-inline` | ❌ Belum | Sedang |
| 4 | Audit validasi & storage untuk semua file upload (dokumen PDF, gambar) | ❌ Belum | Sedang |
| 5 | Tambah role/permission (Spatie Permission) untuk Filament Resource authorization | ❌ Belum | Sedang-Besar |
| 6 | Bersihkan script debug/test dari root repo | ❌ Belum | Kecil |
| 7 | Aktifkan monitoring/log rotation + `composer audit`/`npm audit` rutin | ❌ Belum | Kecil-Sedang |

---

## 🔴 KRITIS — Perlu Segera Dibenahi

### 1. `.env` masih dalam mode debug/local

**File:** `.env`

```
APP_ENV=local
APP_DEBUG=true
```

**Risiko:** Jika konfigurasi ini juga terpasang di server produksi, setiap error PHP/Laravel akan menampilkan stack trace lengkap ke publik — termasuk path server, query SQL, nama variabel environment, dan potongan source code. Ini adalah salah satu kebocoran informasi paling umum dieksploitasi attacker untuk reconnaissance.

**Solusi (produksi):**
```
APP_ENV=production
APP_DEBUG=false
LOG_LEVEL=error
```

---

### 2. API key tertulis polos di `.env`

**File:** `.env`

```
GROQ_API_KEY=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
```

**Risiko:** Jika file `.env` ini pernah ter-commit ke git history (meskipun sekarang ada di `.gitignore`), key tersebut tetap bisa ditemukan siapa saja yang punya akses ke history repo (`git log --all -- .env`).

**Solusi:**
- Jalankan `git log --all --full-history -- .env` untuk memastikan file `.env` tidak pernah masuk commit history.
- Jika pernah, **rotasi/ganti `GROQ_API_KEY` segera** di dashboard Groq, lalu bersihkan history git (`git filter-repo` / BFG Repo-Cleaner).
- Pastikan `.env` selalu ada di `.gitignore` di semua environment (local, staging, production).

---

### 3. Session cookie belum "secure" & belum terenkripsi

**File:** `.env`, `config/session.php`

```
SESSION_ENCRYPT=false
# SESSION_SECURE_COOKIE tidak diset -> default null
```

**Risiko:**
- Tanpa `SESSION_SECURE_COOKIE=true`, cookie sesi bisa terkirim melalui koneksi HTTP biasa (tidak HTTPS), rawan disadap (man-in-the-middle) terutama di jaringan publik/WiFi.
- `SESSION_ENCRYPT=false` membuat payload session tersimpan tanpa enkripsi di storage server.

**Solusi (produksi, asumsi sudah pakai HTTPS):**
```
SESSION_SECURE_COOKIE=true
SESSION_ENCRYPT=true
SESSION_SAME_SITE=lax
SESSION_DRIVER=database
```
> `SESSION_DRIVER=database` disarankan dibanding `file` karena memudahkan invalidasi sesi terpusat (misal saat user di-suspend) dan lebih scalable untuk multi-server.

---

### 4. Content-Security-Policy (CSP) masih longgar

**File:** `app/Http/Middleware/SecurityHeaders.php`

```php
$csp .= "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com ...";
```

**Risiko:** `'unsafe-inline'` dan `'unsafe-eval'` melemahkan CSP secara signifikan terhadap serangan XSS. Jika penyerang berhasil menyuntikkan satu tag `<script>` inline atau memanggil `eval()`, CSP tidak akan memblokirnya.

**Solusi (bertahap):**
1. Cek apakah Alpine.js/Livewire versi yang dipakai Filament masih membutuhkan `unsafe-eval` — versi modern umumnya tidak. Coba hapus dulu dan uji.
2. Untuk script inline yang memang perlu (misal `renderHook` di `AdminPanelProvider.php`), migrasikan ke **nonce-based CSP**: generate nonce per-request, tempelkan ke setiap `<script>`/`<style>` inline, lalu set `script-src 'self' 'nonce-{random}' ...`.
3. Tinjau ulang daftar domain di `frame-src` (misal `https://www.google.com`) — hapus jika tidak dipakai (misal reCAPTCHA), untuk mengurangi permukaan serangan clickjacking.

---

### 5. Rate limiting belum konsisten di semua endpoint

**File:** `routes/web.php`, `app/Http/Requests/Auth/LoginRequest.php`

**Sudah baik:**
- Login Breeze (`LoginRequest::ensureIsNotRateLimited()`) sudah membatasi 5x percobaan per kombinasi email+IP dengan lockout — aman.
- Beberapa endpoint (`/ai/ask`, `/comments`, `/community-satisfaction`) sudah diberi `throttle:X,1` sesuai catatan di `docs/BUG.md`.

**Belum ada:**
- Tidak ada rate limit baseline global untuk seluruh route publik (pencarian dokumen, endpoint kategori, `/qrcode`, dll).
- Belum jelas apakah halaman login **Filament Admin** (`App\Filament\Pages\Auth\Login`) punya rate limiting/lockout terpisah dari Breeze, atau captcha custom-nya divalidasi di server-side dengan benar.

**Solusi:**
```php
// bootstrap/app.php atau grup route publik
Route::middleware(['throttle:60,1'])->group(function () {
    // seluruh route publik non-critical
});
```
Serta audit ulang halaman login Filament untuk memastikan lockout + captcha tervalidasi di server, bukan cuma tampilan.

---
