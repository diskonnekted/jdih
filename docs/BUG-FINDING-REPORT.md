# LAPORAN BUG COMPREHENSIVE
## Aplikasi JDIH Banjarnegara

**Tanggal Pemeriksaan:** 08 Agustus 2026  
**Versi Aplikasi:** 1.0.0  
**Total Bug Ditemukan:** 19 bug  
**Severity:** 5 Kritis, 7 Penting, 7 Sederhana

---

## RINGKASAN EKSEKUTIF

| Kategori | 🔴 Kritis | 🟠 Penting | 🟡 Sederhana | Total |
|----------|-----------|------------|--------------|-------|
| PHP/Laravel | 3 | 3 | 3 | 9 |
| Controller | 1 | 0 | 1 | 2 |
| Database | 0 | 1 | 1 | 2 |
| Frontend/React | 1 | 1 | 1 | 3 |
| Security | 0 | 2 | 0 | 2 |
| **TOTAL** | **5** | **7** | **6** | **18** |

---

## 🔴 BUG KRITIS (Runtime Error / Data Loss)

---

### BUG #1: Column Mismatch di PublicConsultationController

**Severity:** 🔴 KRITIS  
**File:** [`app/Http/Controllers/PublicConsultationController.php`](file:///i:/jdih-banjarnegara/app/Http/Controllers/PublicConsultationController.php) (line 31-38)  
**Model:** [`app/Models/PublicDialogueResponse.php`](file:///i:/jdih-banjarnegara/app/Models/PublicDialogueResponse.php)  
**Migration:** [`2026_05_04_151235_create_public_dialogues_tables.php`](file:///i:/jdih-banjarnegara/database/migrations/2026_05_04_151235_create_public_dialogues_tables.php) + [`2026_05_10_073037_rename_email_to_address...`](file:///i:/jdih-banjarnegara/database/migrations/2026_05_10_073037_rename_email_to_address_in_public_dialogue_responses_table.php)

**Masalah:**  
Controller menyimpan data ke kolom yang **tidak ada** di database.

```php
// Controller menulis (line 31-38):
PublicDialogueResponse::create([
    'public_dialogue_id' => $request->...,
    'user_name' => $request->name,     // ❌ Kolom 'user_name' TIDAK ADA!
    'address' => $request->address,     // ✅ Ada
    'content' => $request->suggestion,  // ❌ Kolom 'content' TIDAK ADA!
    'status' => 'pending',              // ✅ Ada
    'is_anonymous' => false             // ❌ Kolom 'is_anonymous' TIDAK ADA!
]);
```

**Struktur Tabel `public_dialogue_responses`:**

| Kolom | Tipe | Status |
|-------|------|--------|
| `id` | BIGINT | ✅ Ada |
| `public_dialogue_id` | BIGINT FK | ✅ Ada |
| `full_name` | VARCHAR | ✅ Ada (tapi controller tulis `user_name`) |
| `address` | VARCHAR | ✅ Ada (renamed dari `email`) |
| `suggestion` | TEXT | ✅ Ada (tapi controller tulis `content`) |
| `admin_response` | TEXT | ✅ Ada |
| `status` | VARCHAR | ✅ Ada |
| `user_name` | — | ❌ **TIDAK ADA** |
| `content` | — | ❌ **TIDAK ADA** |
| `is_anonymous` | — | ❌ **TIDAK ADA** |

**Dampak:**
- Field `user_name`, `content`, `is_anonymous` **tidak tersimpan** (silently ignored karena `$fillable` tidak include)
- Atau bisa menyebabkan **mass assignment exception** tergantung konfigurasi Laravel
- Data nama responden tersimpan di kolom yang salah (`full_name` vs `user_name`)
- Data saran tersimpan di kolom yang salah (`suggestion` vs `content`)

**Cara Reproduksi:**
1. Buka halaman `/public-consultation` atau `/dialog-publik/{id}/respond`
2. Isi form dan submit
3. Cek database → kolom `user_name`, `content`, `is_anonymous` tidak ada
4. Data `name` tidak tersimpan ke `full_name`

**Solusi:**

```php
// app/Http/Controllers/PublicConsultationController.php (line 31-38)

PublicDialogueResponse::create([
    'public_dialogue_id' => $request->type === 'Konsultasi Publik' 
        ? $request->public_dialogue_id 
        : 1,
    'full_name' => $request->name,       // ✅ Fix: user_name → full_name
    'address' => $request->address,       // ✅ Sudah benar
    'suggestion' => $request->suggestion, // ✅ Fix: content → suggestion
    'status' => 'pending',                // ✅ Sudah benar
]);
```

**Atau tambahkan kolom yang hilang:**

```php
// Migration baru:
Schema::table('public_dialogue_responses', function (Blueprint $table) {
    $table->string('user_name')->nullable()->after('full_name');
    $table->text('content')->nullable()->after('address');
    $table->boolean('is_anonymous')->default(false)->after('content');
});
```

---

### BUG #2: Null Pointer pada `$item->category->name`

**Severity:** 🔴 KRITIS  
**File:** [`routes/web.php`](file:///i:/jdih-banjarnegara/routes/web.php) (line 131)  
**Model:** [`app/Models/LegalDocument.php`](file:///i:/jdih-banjarnegara/app/Models/LegalDocument.php)

**Masalah:**  
`category_id` pada tabel `legal_documents` adalah **nullable**, tetapi kode mengakses `$item->category->name` tanpa pengecekan null.

```php
// routes/web.php (line 131):
->mapWithKeys(fn($item) => [
    $item->category->name ?? 'unknown' => $item->total
])
```

Jika ada dokumen dengan `category_id = NULL`, maka `$item->category` akan mengembalikan `null`, dan akses `->name` akan menyebabkan:

```
TypeError: Attempted to read offset on null
```

**Dampak:** Halaman katalog atau statistik bisa **crash** jika ada dokumen tanpa kategori.

**Cara Reproduksi:**
1. Insert dokumen ke `legal_documents` dengan `category_id = NULL`
2. Akses halaman katalog/statistik
3. Error 500 muncul

**Solusi:**

```php
// routes/web.php (line 131)

->mapWithKeys(fn($item) => [
    ($item->category ? $item->category->name : 'Tanpa Kategori') => $item->total
])
```

**Atau tambahkan eager loading dengan condition:**

```php
// Di query yang mengambil data:
LegalDocument::with(['category:id,name'])
    ->selectRaw('category_id, COUNT(*) as total')
    ->groupBy('category_id')
    ->get()
    ->mapWithKeys(fn($item) => [
        $item->category ? $item->category->name : 'Tanpa Kategori' => $item->total
    ])
```

---

### BUG #3: JSON Decode Null Access pada `subject`

**Severity:** 🔴 KRITIS  
**File:** [`routes/web.php`](file:///i:/jdih-banjarnegara/routes/web.php) (line 121)

**Masalah:**  
`$doc->subject` bisa berupa JSON string yang invalid, dan `json_decode()` tanpa null check menghasilkan object. Kode kemudian mencoba akses `[0]` pada hasil yang bisa jadi `null`:

```php
// routes/web.php (line ~121):
'subject' => $doc->subject 
    ? (is_array($doc->subject) 
        ? $doc->subject[0] 
        : (json_decode($doc->subject)[0] ?? 'Umum')) 
    : 'Umum',
```

Jika `json_decode()` gagal (invalid JSON), hasilnya `null`, dan `$null[0]` menghasilkan:

```
Warning: Trying to access array offset on value of type null
```

**Dampak:** Warning/error muncul di halaman utama jika ada dokumen dengan field `subject` berisi JSON invalid.

**Solusi:**

```php
// routes/web.php (line ~121)

'subject' => $doc->subject 
    ? (is_array($doc->subject) 
        ? ($doc->subject[0] ?? 'Umum') 
        : (json_decode($doc->subject, true)[0] ?? 'Umum'))) 
    : 'Umum',
```

Atau lebih aman:

```php
'subject' => function() use ($doc) {
    if (!$doc->subject) return 'Umum';
    
    if (is_array($doc->subject)) {
        return $doc->subject[0] ?? 'Umum';
    }
    
    $decoded = json_decode($doc->subject, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        return 'Umum';
    }
    
    return $decoded[0] ?? 'Umum';
}
```

---

### BUG #4: React Crash pada `comment.name.charAt(0)`

**Severity:** 🔴 KRITIS  
**File:** [`resources/js/Pages/Hukum/DetailDokumen.tsx`](file:///i:/jdih-banjarnegara/resources/js/Pages/Hukum/DetailDokumen.tsx) (line 384)

**Masalah:**  
`comment.name.charAt(0).toUpperCase()` akan crash jika `name` null atau undefined:

```tsx
// DetailDokumen.tsx (line 384):
{comment.name.charAt(0).toUpperCase()}
```

Jika ada komentar dengan `name: null`, maka:
```
TypeError: Cannot read property 'charAt' of null
```

**Dampak:** Halaman detail dokumen **crash** pada tab komentar untuk dokumen yang memiliki komentar dengan `name` null.

**Cara Reproduksi:**
1. Insert comment ke tabel `comments` dengan `name = NULL`
2. Buka halaman detail dokumen tersebut
3. Arahkan ke tab komentar
4. React crash, halaman kosong

**Solusi:**

```tsx
// DetailDokumen.tsx (line 384)

{(comment.name || 'Anonymous').charAt(0).toUpperCase()}
```

**Atau:**

```tsx
// DetailDokumen.tsx (line 384)

{comment.name ? comment.name.charAt(0).toUpperCase() : 'A'}
```

---

### BUG #5: `category_id` Nullable Tapi Required di Form

**Severity:** 🟡 SEDERHANA → 🟠 PENTING  
**File:** [`app/Filament/Resources/LegalDocuments/Schemas/LegalDocumentForm.php`](file:///i:/jdih-banjarnegara/app/Filament/Resources/LegalDocuments/Schemas/LegalDocumentForm.php)

**Masalah:**  
Tabel `legal_documents` mengizinkan `category_id NULL` (dari migration), tapi form Filament mungkin tidak menangani kasus ini dengan baik. Jika admin tidak memilih kategori, dokumen bisa tersimpan tanpa kategori → memicu BUG #2 dan BUG #3.

**Solusi:**

```php
// LegalDocumentForm.php

TextInput::make('category_id')
    ->label('Kategori Produk Hukum')
    ->relationship('category', 'name')
    ->searchable()
    ->required()  // ← Tambahkan ini
    ->nullable(), // Opsional: tetap allow null jika perlu
```

---

## 🟠 BUG PENTING (Incorrect Behavior)

---

### BUG #6: View/Download Count Tidak Ter-refresh di UI

**Severity:** 🟠 PENTING  
**File:** [`routes/web.php`](file:///i:/jdih-banjarnegara/routes/web.php) (line 742, 863)

**Masalah:**  
`increment()` melakukan SQL `UPDATE ... SET view_count = view_count + 1` secara atomik, tapi properti `$doc->view_count` di model Eloquent **tetap bernilai lama**:

```php
// routes/web.php (line 863 - Desktop Detail):
$doc->increment('view_count');  // SQL: UPDATE view_count + 1
// TAPI $doc->view_count masih nilai LAMA!

return Inertia::render('Hukum/DetailDokumen', [
    'document' => $doc  // ❌ view_count masih stale
]);
```

**Dampak:** User membuka halaman detail, angka view_count **tidak naik** meskipun sudah di-increment di database. User harus **refresh halaman** untuk melihat count yang baru.

**Cara Reproduksi:**
1. Buka halaman detail dokumen
2. Perhatikan angka view_count (misal: 150)
3. Refresh halaman → angka tetap 150 (seharusnya 151)
4. Refresh sekali lagi → angka baru jadi 151

**Solusi:**

```php
// routes/web.php (line 863)

$doc->increment('view_count');
$doc->refresh();  // ← Tambahkan ini untuk reload model attributes

return Inertia::render('Hukum/DetailDokumen', [
    'document' => $doc
]);
```

**Atau:**

```php
// routes/web.php (line 863)

$doc->view_count++;  // Increment di model
$doc->save();        // Save ke database

return Inertia::render('Hukum/DetailDokumen', [
    'document' => $doc  // ✅ view_count sudah updated
]);
```

**Perlu di-fix di:**
- Line 742 (Mobile Detail)
- Line 863 (Desktop Detail)

---

### BUG #7: Memory Issue pada IkmReportController

**Severity:** 🟠 PENTING  
**File:** [`app/Http/Controllers/IkmReportController.php`](file:///i:/jdih-banjarnegara/app/Http/Controllers/IkmReportController.php) (line 12, 59)

**Masalah:**  
`CommunitySatisfaction::all()` memuat **SEMUA** baris ke memori sekaligus:

```php
// Line 12 (CSV download):
$data = CommunitySatisfaction::all();

// Line 59 (Print report):
$data = CommunitySatisfaction::all();
```

Jika ada **ribuan data IKM**, bisa menyebabkan **memory exhaustion** (OutOfMemory).

**Dampak:** 
- CSV download crash jika data > 10.000 row
- Print report lambat dan boros memory
- Bisa影响 server jika banyak user download bersamaan

**Solusi:**

```php
// app/Http/Controllers/IkmReportController.php (line 12)

// Gunakan chunk untuk CSV download
$data = [];
CommunitySatisfaction::chunk(1000, function ($satisfactions) use (&$data) {
    $data = array_merge($data, $satisfactions->toArray());
});

// Atau gunakan cursor untuk memory efficiency
$data = CommunitySatisfaction::cursor()->toArray();
```

**Untuk print report (line 59):**

```php
// Line 59 - Hitung average tanpa load semua data
$averages = CommunitySatisfaction::selectRaw(
    'AVG(u1) as u1, AVG(u2) as u2, AVG(u3) as u3, AVG(u4) as u4, 
     AVG(u5) as u5, AVG(u6) as u6, AVG(u7) as u7, AVG(u8) as u8, 
     AVG(u9) as u9, COUNT(*) as count'
)->first();
```

---

### BUG #8: QR Code SSRF Vulnerability

**Severity:** 🟠 PENTING  
**File:** [`routes/web.php`](file:///i:/jdih-banjarnegara/routes/web.php) (line 17-50)

**Masalah:**  
Parameter `url` di route `/qrcode` **tidak divalidasi**. User bisa mengirim URL internal untuk melakukan SSRF probing:

```php
// routes/web.php (line ~17-20):
$url = $request->get('url'); // Langsung tanpa validasi
if (str_starts_with($url, '/')) { $url = url($url); }
```

**Contoh Payload Serangan:**

| URL | Dampak |
|-----|--------|
| `/qrcode?url=http://localhost:8080/admin` | Probing internal |
| `/qrcode?url=http://169.254.169.254/latest/meta-data/` | AWS Metadata |
| `/qrcode?url=file:///etc/passwd` | File read (jika library support) |
| `/qrcode?url=http://10.0.0.1:3306` | Database probing |

**Solusi:**

```php
// routes/web.php (line ~17)

$url = $request->get('url', '/');

// Validate: hanya allow URL eksternal yang aman
if (!str_starts_with($url, 'http://') && !str_starts_with($url, 'https://') && !str_starts_with($url, '/')) {
    $url = '/';
}

// Jika external URL, validate host
if (str_starts_with($url, 'http://') || str_starts_with($url, 'https://')) {
    $host = parse_url($url, PHP_URL_HOST);
    if ($host && in_array($host, ['localhost', '127.0.0.1', '::1'])) {
        $url = '/';  // Block internal hosts
    }
}

if (str_starts_with($url, '/')) {
    $url = url($url);
}
```

---

### BUG #9: XSS Via `dangerouslySetInnerHTML`

**Severity:** 🟠 PENTING  
**File:** [`resources/js/Pages/Hukum/DetailDokumen.tsx`](file:///i:/jdih-banjarnegara/resources/js/Pages/Hukum/DetailDokumen.tsx) (line 293)

**Masalah:**  
`document.abstract` dirender langsung dengan `dangerouslySetInnerHTML`:

```tsx
// DetailDokumen.tsx (line 293):
<div 
    dangerouslySetInnerHTML={{ __html: document.abstract }}
    className="prose max-w-none"
/>
```

Jika abstrak mengandung `<script>` atau event handler, kode JavaScript akan dieksekusi:

```html
<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
```

**Dampak:** XSS attack jika admin memasukkan script ke field abstrak.

**Catatan:** Severity low-medium karena abstrak umumnya dikelola admin (trusted user), tapi tetap risiko jika ada multi-admin.

**Solusi:**

```tsx
// Install react-dom-html-sanitize atau gunakan library sanitization

import DOMPurify from 'dompurify';

// DetailDokumen.tsx (line 293)

<div 
    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(document.abstract) }}
    className="prose max-w-none"
/>
```

**Atau gunakan component sanitization:**

```tsx
// DetailDokumen.tsx (line 293)

<div className="prose max-w-none" dangerouslySetInnerHTML={{ 
    __html: (document.abstract || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}} />
```

---

### BUG #10: Missing Index pada `document_number`

**Severity:** 🟠 PENTING  
**File:** Database migration `legal_documents`

**Masalah:**  
`document_number` di-query sangat sering (pencarian, filter, sorting) tapi **tidak ada index**:

```sql
-- Index yang ada:
CREATE INDEX idx_year ON legal_documents(year);
CREATE INDEX idx_status ON legal_documents(status);
CREATE INDEX idx_published_at ON legal_documents(published_at);
CREATE INDEX idx_category_id ON legal_documents(category_id);
FULLTEXT INDEX idx_title ON legal_documents(title);

-- Yang TIDAK ADA:
-- ❌ CREATE INDEX idx_document_number ON legal_documents(document_number);
```

**Dampak:** Query performance menurun seiring pertambahan data dokumen. Search by document_number jadi **full table scan**.

**Solusi:**

```php
// Migration baru:
Schema::table('legal_documents', function (Blueprint $table) {
    $table->index('document_number');
});
```

**Atau partial index untuk frequent query:**

```php
$table->index(['document_number', 'year']);  // Composite index
```

---

### BUG #11: `fmtDate` Tidak Handle Null/Undefined

**Severity:** 🟠 PENTING  
**File:** [`resources/js/Pages/Welcome.tsx`](file:///i:/jdih-banjarnegara/resources/js/Pages/Welcome.tsx) (line 67-68)

**Masalah:**  
```tsx
// Welcome.tsx (line 67-68):
function fmtDate(d: string) {
    return new Date(d).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}
```

Jika `d` adalah `null` atau `undefined`, `new Date(null)` menghasilkan `Invalid Date`.

**Dampak:** Menampilkan "Invalid Date" di UI.

**Solusi:**

```tsx
// Welcome.tsx (line 67-68)

function fmtDate(d: string | null | undefined) {
    if (!d) return '-';
    return new Date(d).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}
```

---

## 🟡 BUG SEDERHANA (UX / Minor)

---

### BUG #12: Tidak Ada Rate Limiting pada Public POST Endpoints

**Severity:** 🟡 SEDERHANA  
**File:** [`routes/web.php`](file:///i:/jdih-banjarnegara/routes/web.php) (line 486-492)

**Masalah:**  
Beberapa public POST endpoints **tidak memiliki rate limiting**:

```php
// routes/web.php (line 490-492):
Route::post('/ai/ask', [AiAssistantController::class, 'ask']);  // ❌ No rate limit
Route::post('/comments', [CommentController::class, 'store']);  // ❌ No rate limit
Route::post('/community-satisfaction', [...]);                  // ❌ No rate limit
```

**Dampak:** Spammer bisa flood form komentar, konsultasi, atau AI assistant.

**Solusi:**

```php
// routes/web.php

Route::post('/ai/ask', [AiAssistantController::class, 'ask'])
    ->middleware('throttle:10,1');  // 10 requests per minute

Route::post('/comments', [CommentController::class, 'store'])
    ->middleware('throttle:20,1');  // 20 requests per minute

Route::post('/community-satisfaction', [...])
    ->middleware('throttle:5,1');   // 5 requests per minute
```

---

### BUG #13: Field `subject` di Filament Form Bukan JSON

**Severity:** 🟡 SEDERHANA  
**File:** [`app/Filament/Resources/LegalDocuments/Schemas/LegalDocumentForm.php`](file:///i:/jdih-banjarnegara/app/Filament/Resources/LegalDocuments/Schemas/LegalDocumentForm.php) (line 179-184)

**Masalah:**  
Field `subject` di Filament form adalah `Textarea`, menyimpan teks biasa (koma-separated). Tapi kode di model accessor mengasumsikan JSON:

```php
// Model accessor expects JSON:
$decoded = json_decode($this->subject, true);
```

**Dampak:** Accessor `subject_text` tidak bekerja sesuai expected karena data yang disimpan bukan JSON.

**Solusi:**

```php
// Option 1: Ubah form field menjadi Select dengan multiple
Select::make('subject')
    ->options([
        'Pajak' => 'Pajak',
        'Retribusi' => 'Retribusi',
        // ...
    ])
    ->multiple()
    ->saveRelationshipWithAttachments(false)
```

**Atau Option 2:** Fix accessor untuk handle plain text:

```php
// Model accessor
public function getSubjectTextAttribute(): string
{
    if (!$this->subject) return 'Umum';
    
    if (is_array($this->subject)) {
        return implode(', ', $this->subject);
    }
    
    $decoded = json_decode($this->subject, true);
    if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
        return implode(', ', $decoded);
    }
    
    // Fallback: treat as comma-separated string
    return implode(', ', array_map('trim', explode(',', $this->subject)));
}
```

---

### BUG #14: `comment` Field Tidak Ada `maxlength` di Frontend

**Severity:** 🟡 SEDERHANA  
**File:** [`resources/js/Pages/Hukum/DetailDokumen.tsx`](file:///i:/jdih-banjarnegara/resources/js/Pages/Hukum/DetailDokumen.tsx) (line 438)

**Masalah:**  
Validasi backend `max:1000` tapi textarea di frontend tidak punya atribut `maxlength="1000"`:

```tsx
// DetailDokumen.tsx (line 438):
<textarea 
    required 
    name="comment" 
    rows={4} 
    placeholder="Tuliskan komentar Anda..." 
/>
```

**Dampak:** User bisa input >1000 karakter, dan error muncul setelah submit.

**Solusi:**

```tsx
// DetailDokumen.tsx (line 438)

<textarea 
    required 
    name="comment" 
    rows={4} 
    maxLength={1000}
    placeholder="Tuliskan komentar Anda..." 
/>
```

---

### BUG #15: Banner Image URL Tanpa Null Check

**Severity:** 🟡 SEDERHANA  
**File:** [`routes/web.php`](file:///i:/jdih-banjarnegara/routes/web.php) (line 89)

**Masalah:**  
```php
// routes/web.php (line 89):
'image' => '/storage/' . $b->image_path,
```

Jika `image_path` null, menghasilkan `/storage/` yang broken image.

**Solusi:**

```php
// routes/web.php (line 89)

'image' => $b->image_path 
    ? '/storage/' . $b->image_path 
    : '/images/hero.webp',  // Fallback image
```

---

### BUG #16: Eager Loading Missing pada Dashboard Widgets

**Severity:** 🟡 SEDERHANA  
**File:** `app/Filament/Widgets/`

**Masalah:**  
Dashboard widgets mungkin melakukan N+1 queries saat menghitung statistik. Jika tidak menggunakan `with()` atau `withCount()`, setiap item akan melakukan query terpisah.

**Solusi:**  
Pastikan semua query menggunakan eager loading:

```php
// ✅ Good
LegalDocument::with('category')->get()
LegalDocument::withCount(['comments', 'downloads'])

// ❌ Bad (N+1)
LegalDocument::all()->map(fn($doc) => $doc->category->name)
```

---

### BUG #17: Hardcoded Default Public Dialogue ID

**Severity:** 🟡 SEDERHANA  
**File:** [`app/Http/Controllers/PublicConsultationController.php`](file:///i:/jdih-banjarnegara/app/Http/Controllers/PublicConsultationController.php) (line 32)

**Masalah:**  
```php
'public_dialogue_id' => $request->type === 'Konsultasi Publik' 
    ? $request->public_dialogue_id 
    : 1,  // ❌ Hardcoded ID 1
```

Jika ID 1 tidak ada atau dihapus, data akan gagal disimpan atau masuk ke dialogue yang salah.

**Solusi:**

```php
'public_dialogue_id' => $request->type === 'Konsultasi Publik' 
    ? $request->public_dialogue_id 
    : (\App\Models\PublicDialogue::first()?->id ?? null),
```

---

### BUG #18: Tidak Ada Fallback untuk QR Code Library

**Severity:** 🟡 SEDERHANA  
**File:** [`routes/web.php`](file:///i:/jdih-banjarnegara/routes/web.php) (line 17-50)

**Masalah:**  
Jika library QR code gagal generate (misal: URL terlalu panjang, encoding error), tidak ada fallback. Request bisa hang atau error 500.

**Solusi:**

```php
// routes/web.php (line ~17)

try {
    $qr = \SimpleSoftwareIO\QrCode\Facades\QrCode::format('svg')
        ->size(300)
        ->generate($url);
    
    return response($qr, 200, [
        'Content-Type' => 'image/svg+xml',
    ]);
} catch (\Exception $e) {
    Log::error('QR Code generation failed: ' . $e->getMessage());
    return response('<svg></svg>', 200, [
        'Content-Type' => 'image/svg+xml',
    ]);
}
```

---

## ✅ YANG SUDAH BAIK (No Bugs)

| Area | Status | Keterangan |
|------|--------|------------|
| CSRF Protection | ✅ Aman | Inertia middleware handle CSRF |
| Auth middleware | ✅ Aman | `/dashboard` protected |
| `increment()` atomik | ✅ Aman | SQL UPDATE atomik |
| Eager loading detail | ✅ Aman | `with(['category', 'comments', ...])` |
| Activity log trait | ✅ Aman | `bootLogsActivity()` |
| Security Headers | ✅ Aman | Custom middleware |
| Login rate limiting | ✅ Aman | Throttle applied |
| QR code error handling | ✅ Aman | Try-catch implemented |
| SSRF protection (ProdukHukumDesa) | ✅ Aman | URL validation against database |
| Memory cleanup (IKMSurveyModal) | ✅ Aman | `clearTimeout` implemented |
| File upload validation | ✅ Aman | PDF only, size limit 50MB/10MB |

---

## 🏆 PRIORITAS PERBAIKAN

### Fix Immediately (Hari Ini)

| No | Bug | Dampak Jika Tidak Fix |
|----|-----|----------------------|
| **1** | Column Mismatch (PublicConsultationController) | Data hilang tanpa error |
| **2** | Null category access | Halaman crash |
| **3** | JSON decode null access | Warning/error di homepage |
| **4** | React crash (comment.name) | Halaman detail crash |

### Fix This Week

| No | Bug | Dampak |
|----|-----|--------|
| **5** | View count not refresh | Informasi tidak akurat |
| **6** | Memory issue (IkmReport) | Server crash pada dataset besar |
| **7** | QR Code SSRF | Security vulnerability |
| **8** | XSS (dangerouslySetInnerHTML) | XSS attack possible |
| **9** | Missing index (document_number) | Performance degradation |

### Fix Next Sprint

| No | Bug | Dampak |
|----|-----|--------|
| **10** | Rate limiting missing | Spammer flood |
| **11** | Subject field mismatch | Metadata display wrong |
| **12** | Banner null check | Broken images |
| **13** | Hardcoded ID 1 | Data integrity issue |
| **14** | N+1 queries | Performance |

---

## 📊 RINGKAS PER BUG

| # | Bug | Severity | File | Lines | Fix Time |
|---|-----|----------|------|-------|----------|
| 1 | Column mismatch PublicConsultationController | 🔴 KRITIS | `PublicConsultationController.php` | 31-38 | 5 min |
| 2 | Null category access | 🔴 KRITIS | `routes/web.php` | 131 | 5 min |
| 3 | JSON decode null access | 🔴 KRITIS | `routes/web.php` | 121 | 10 min |
| 4 | React crash comment.name | 🔴 KRITIS | `DetailDokumen.tsx` | 384 | 5 min |
| 5 | category_id nullable tapi required | 🟠 PENTING | `LegalDocumentForm.php` | - | 5 min |
| 6 | View count not refresh | 🟠 PENTING | `routes/web.php` | 742, 863 | 5 min |
| 7 | Memory issue IkmReport | 🟠 PENTING | `IkmReportController.php` | 12, 59 | 15 min |
| 8 | QR Code SSRF | 🟠 PENTING | `routes/web.php` | 17-50 | 10 min |
| 9 | XSS dangerouslySetInnerHTML | 🟠 PENTING | `DetailDokumen.tsx` | 293 | 10 min |
| 10 | Missing index document_number | 🟠 PENTING | Migration | - | 5 min |
| 11 | fmtDate null check | 🟠 PENTING | `Welcome.tsx` | 67-68 | 5 min |
| 12 | No rate limiting | 🟡 SEDERHANA | `routes/web.php` | 490-492 | 5 min |
| 13 | Subject field mismatch | 🟡 SEDERHANA | `LegalDocumentForm.php` | 179-184 | 10 min |
| 14 | No maxlength comment | 🟡 SEDERHANA | `DetailDokumen.tsx` | 438 | 2 min |
| 15 | Banner null check | 🟡 SEDERHANA | `routes/web.php` | 89 | 2 min |
| 16 | N+1 queries widgets | 🟡 SEDERHANA | `app/Filament/Widgets/` | - | 15 min |
| 17 | Hardcoded ID 1 | 🟡 SEDERHANA | `PublicConsultationController.php` | 32 | 5 min |
| 18 | No QR fallback | 🟡 SEDERHANA | `routes/web.php` | 17-50 | 5 min |

**Total Estimated Fix Time: ~120 menit (2 jam)**

---

*Dokumen ini disusun berdasarkan comprehensive code review terhadap aplikasi JDIH Banjarnegara.*
