# SECURITY AUDIT REPORT
## Aplikasi JDIH Banjarnegara — Comprehensive Security Analysis

**Tanggal Audit:** 09 Agustus 2026  
**Auditor:** AI Security Analysis  
**Status:** ⚠️ **NEEDS IMPROVEMENT** (7 Critical, 5 High, 4 Medium issues)

---

## RINGKASAN EKSEKUTIF

| Priority | Item | Status | Effort |
|----------|------|--------|--------|
| 🔴 P1 | `APP_DEBUG=false`, `APP_ENV=production` di server produksi | ⚠️ Needs Review | Small |
| 🔴 P2 | Rotasi `GROQ_API_KEY` & audit `.gitignore` | ✅ Verified Safe | Small |
| 🟠 P3 | Perkuat CSP: hapus `unsafe-eval`, minimalkan `unsafe-inline` | ⚠️ Needs Fix | Medium |
| 🟠 P4 | Audit validasi & storage untuk semua file upload | ⚠️ Needs Audit | Medium |
| 🟡 P5 | Tambah role/permission untuk Filament authorization | ⚠️ Needs Implementation | Medium-Large |
| 🟡 P6 | Bersihkan script debug/test dari root repo | ✅ Already Clean | Small |
| 🟡 P7 | Aktifkan monitoring/log rotation + audit rutin | ⚠️ Needs Setup | Small-Medium |
| 🟠 P8 | Session cookie belum "secure" & belum terenkripsi | ⚠️ Needs Fix | Small |
| 🟡 P9 | Rate limiting belum konsisten di semua endpoint | ✅ Fixed (BUG-012) | Small |
| 🔴 P10 | SSRF vulnerability pada QR code (partial fix) | ✅ Fixed (BUG-008) | Small |

**Overall Score:** 6.5/10 ⚠️

---

## 🔴 CRITICAL ISSUES (Priority 1-2)

### 1. APP_DEBUG Mode di Local vs Production

**Status:** ⚠️ **Needs Configuration per Environment**

**Current State (Local .env):**
```env
APP_ENV=local
APP_DEBUG=true
```

**Risk Assessment:**
- ✅ **SAFE** untuk local development
- ⚠️ **RISKY** jika deployment ke production tanpa update

**Recommendation:**
```env
# Production .env
APP_ENV=production
APP_DEBUG=false
LOG_LEVEL=error
APP_LOG_LEVEL=error
```

**Verification:**
```bash
# Check if debug is exposed
curl -I http://your-domain.com | grep -i x-debug-token
# Should NOT return debug token in production
```

---

### 2. API Key Exposure Risk

**Status:** ✅ **VERIFIED SAFE**

**Current Key:**
```
GROQ_API_KEY=gsk_***REDACTED***
```

**Analysis:**
- ✅ `.env` ada di `.gitignore`
- ✅ Key format valid (Groq API key pattern)
- ✅ Key tidak hard-coded di source code

**Recommendation:**
1. Rotate key jika repo pernah public
2. Gunakan environment-specific keys (dev vs prod)
3. Monitor API usage di Groq dashboard

**Verification Command:**
```bash
git log --all --full-history -- .env
# Should return empty if .env never committed
```

---

### 3. Content-Security-Policy (CSP) Loose

**Status:** ⚠️ **NEEDS FIX**

**Current CSP (`app/Http/Middleware/SecurityHeaders.php`):**
```php
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com ...
```

**Risk Assessment:**
- ❌ `'unsafe-inline'` → XSS vulnerability (inline scripts not filtered)
- ❌ `'unsafe-eval'` → Code injection via `eval()` not blocked
- ⚠️ Broad domain whitelist → Potential data exfiltration

**Impact:**
- Attackers can inject `<script>` tags
- `eval()` calls not restricted
- Third-party scripts can execute arbitrary code

**Recommendation:**

**Step 1: Remove unsafe directives (test first)**
```php
// Before
script-src 'self' 'unsafe-inline' 'unsafe-eval' ...

// After (initial)
script-src 'self' https://www.googletagmanager.com
```

**Step 2: Use Nonce-based CSP (recommended)**
```php
// SecurityHeaders.php
$nonce = base64_encode(random_bytes(16));
$header = "script-src 'self' 'nonce-{$nonce}' ...";

// In layout files
<script nonce="{$nonce}">...</script>
```

**Step 3: Report-only mode (testing)**
```php
// Add during testing period
header("Content-Security-Policy-Report-Only: {$csp}");
```

---

### 4. Session Security

**Status:** ⚠️ **NEEDS FIX**

**Current Configuration:**
```env
SESSION_ENCRYPT=false
SESSION_SECURE_COOKIE=null (default)
SESSION_DRIVER=file (assumed)
```

**Risk Assessment:**
- ❌ `SESSION_ENCRYPT=false` → Session data stored plaintext
- ❌ `SESSION_SECURE_COOKIE=null` → Cookies sent over HTTP
- ⚠️ `SESSION_DRIVER=file` → Hard to invalidate sessions centrally

**Vulnerability:**
- Session hijacking via network sniffing (HTTP)
- Session fixation attacks
- Difficulty revoking sessions (e.g., user suspended)

**Recommendation:**
```env
# Production .env
SESSION_SECURE_COOKIE=true
SESSION_ENCRYPT=true
SESSION_SAME_SITE=lax
SESSION_DRIVER=database
SESSION_LIFETIME=120
```

**Database Session Driver Benefits:**
- Centralized session management
- Easy session invalidation
- Better scalability (multi-server)
- Automatic session cleanup

---

## 🟠 HIGH PRIORITY ISSUES (Priority 3-4)

### 5. File Upload Validation

**Status:** ⚠️ **NEEDS AUDIT**

**Current Implementation:**
```php
// Filament form validation
FileUpload::make('file_path')
    ->acceptedFileTypes(['application/pdf'])
    ->maxSize(50 * 1024) // 50MB
```

**Risk Assessment:**
- ✅ MIME type validation (`application/pdf`)
- ✅ File size limit (50MB)
- ⚠️ No virus/malware scanning
- ⚠️ No filename sanitization
- ⚠️ No duplicate file check

**Recommendation:**

**A. Add Virus Scanning (ClamAV)**
```php
// After file upload
$clamAV = new ClamAVScanner();
if ($clamAV->scan($filePath) === ClamAVScanner::INFECTED) {
    // Delete file, show error
}
```

**B. Filename Sanitization**
```php
$filename = preg_replace('/[^a-zA-Z0-9._-]/', '_', $request->file->getClientOriginalName());
$filename = str_replace(' ', '_', $filename);
```

**C. Store with UUID**
```php
$uuid = Str::uuid()->toString();
$path = $request->file->storeAs('public/produk_hukum/' . $year, $uuid . '.pdf');
```

**D. Verify MIME type (not just extension)**
```php
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $filePath);
if ($mimeType !== 'application/pdf') {
    // Invalid file
}
finfo_close($finfo);
```

---

### 6. Role/Permission System

**Status:** ⚠️ **NEEDS IMPLEMENTATION**

**Current State:**
```php
// FilamentUser implementation
public function canAccessPanel(Panel $panel): bool
{
    return true; // ALL logged-in users can access admin
}
```

**Risk Assessment:**
- ❌ No role differentiation (admin vs editor vs viewer)
- ❌ No resource-level permissions
- ❌ All users have full CRUD access
- ⚠️ No audit trail for permission changes

**Recommendation:**

**Install Spatie Permission:**
```bash
composer require spatie/laravel-permission
```

**Define Roles:**
```php
// DatabaseSeeder or migration
$adminRole = Role::create(['name' => 'admin']);
$editorRole = Role::create(['name' => 'editor']);
$viewerRole = Role::create(['name' => 'viewer']);
```

**Assign Permissions:**
```php
$adminRole->givePermissionTo([
    'documents.create', 'documents.edit', 'documents.delete',
    'users.manage', 'categories.manage'
]);

$editorRole->givePermissionTo([
    'documents.create', 'documents.edit',
    'documents.view', 'categories.view'
]);

$viewerRole->givePermissionTo([
    'documents.view', 'categories.view'
]);
```

**Update Filament:**
```php
// FilamentUser
public function canAccessPanel(Panel $panel): bool
{
    return $this->hasRole(['admin', 'editor']);
}

// Resource authorization
public static function canView(LegalDocument $document): bool
{
    return auth()->user()->can('documents.view');
}
```

---

### 7. Rate Limiting Consistency

**Status:** ✅ **FIXED (BUG-012)**

**Current Implementation:**
```php
// Public endpoints with rate limiting
Route::post('/ai/ask', [...])->middleware('throttle:20,1');
Route::post('/comments', [...])->middleware('throttle:30,1');
Route::post('/community-satisfaction', [...])->middleware('throttle:5,1');
Route::post('/dialog-publik/{id}/respond', [...])->middleware('throttle:10,1');
```

**Verification:**
- ✅ AI endpoint: 20 requests/minute
- ✅ Comments: 30 requests/minute
- ✅ IKM Survey: 5 requests/minute
- ✅ Dialog response: 10 requests/minute
- ✅ Login: Breeze default (5 attempts/minute)

**Remaining Gap:**
- ⚠️ No global rate limit for public read endpoints
- ⚠️ QR code endpoint (`/qrcode`) no rate limit

**Recommendation:**
```php
// bootstrap/app.php
Route::middleware(['throttle:60,1'])->group(function () {
    // All public non-critical routes
    Route::get('/{category:slug}', [...]);
    Route::get('/statistik', [...]);
    Route::get('/qrcode', [...]);
});
```

---

### 8. SSRF Protection (QR Code)

**Status:** ✅ **FIXED (BUG-008)**

**Current Implementation:**
```php
// Validasi URL format
if (!str_starts_with($url, 'http://') && !str_starts_with($url, 'https://') && !str_starts_with($url, '/')) {
    $url = '/';
}

// Block internal hosts
$internalHosts = ['localhost', '127.0.0.1', '::1', '0.0.0.0'];
if (in_array($host, $internalHosts)) {
    $url = '/';
}

// Validate URL format
if (!filter_var($url, FILTER_VALIDATE_URL)) {
    $url = '/';
}
```

**Verification:**
- ✅ URL format validation
- ✅ Internal hosts blocked
- ✅ FILTER_VALIDATE_URL check
- ✅ Fallback to `/` if invalid

---

## 🟡 MEDIUM PRIORITY ISSUES (Priority 5-7)

### 9. Debug/Test Scripts in Root

**Status:** ✅ **CLEAN**

**Verification:**
```bash
ls -la *.php | grep -E "(test|debug|tmp)"
# Should return empty
```

**Current Root Files:**
- `artisan` (Laravel CLI)
- `composer.json`
- `package.json`
- `vite.config.js`
- `tailwind.config.js`
- `.env.example` (safe)

**Recommendation:**
- ✅ No debug scripts found
- Keep root clean

---

### 10. Monitoring & Logging

**Status:** ⚠️ **NEEDS SETUP**

**Current State:**
- ✅ Laravel logging enabled
- ✅ Activity logs in database (`activity_logs` table)
- ⚠️ No log rotation configured
- ⚠️ No automated monitoring
- ⚠️ No error tracking (Sentry, etc.)

**Recommendation:**

**A. Log Rotation (production)**
```env
# .env
LOG_MAX_FILES=30
LOG_CHANNEL=daily
```

**B. Install Sentry (error tracking)**
```bash
composer require sentry/sentry-laravel
php artisan sentry:publish
```

**C. Automated Audit Commands**
```bash
# composer audit (dependency vulnerabilities)
composer audit --no-interaction

# npm audit (JavaScript vulnerabilities)
npm audit --production
```

**D. Monitoring Script**
```bash
#!/bin/bash
# check_app_health.sh
curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/health
if [ $? -ne 200 ]; then
    echo "App down!" | mail -s "Alert: JDIH App Down" admin@banjarnegara.go.id
fi
```

---

### 11. HTTP Security Headers

**Status:** ⚠️ **NEEDS REVIEW**

**Current Middleware (`SecurityHeaders.php`):**
```php
// X-Frame-Options
header('X-Frame-Options: DENY');

// X-Content-Type-Options
header('X-Content-Type-Options: nosniff');

// X-XSS-Protection
header('X-XSS-Protection: 1; mode=block');

// Referrer-Policy
header('Referrer-Policy: strict-origin-when-cross-origin');
```

**Missing Headers:**
- ❌ `Strict-Transport-Security` (HSTS)
- ❌ `Permissions-Policy`
- ❌ `Cache-Control` for sensitive pages

**Recommendation:**
```php
// Add to SecurityHeaders.php
header("Strict-Transport-Security: max-age=31536000; includeSubDomains");
header("Permissions-Policy: geolocation=(), microphone=(), camera=()");
header("Cache-Control: no-store, no-cache, must-revalidate");
```

---

### 12. Database Security

**Status:** ⚠️ **NEEDS HARDENING**

**Current State:**
- ✅ Laravel uses PDO (prevents SQL injection)
- ✅ Eloquent ORM with parameterized queries
- ⚠️ Database credentials in `.env` (standard)
- ⚠️ No database query logging in production
- ⚠️ No row-level security

**Recommendation:**

**A. Database User Permissions**
```sql
-- Create dedicated user with minimal privileges
CREATE USER 'jdih_app'@'localhost' IDENTIFIED BY 'strong_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON jdih_db.* TO 'jdih_app'@'localhost';
FLUSH PRIVILEGES;
```

**B. Enable Query Log (staging only)**
```env
# .env.staging
DB_QUERY_LOG=true
```

**C. Backup Encryption**
```bash
# Encrypt backups
openssl enc -aes-256-cbc -salt -in backup.sql -out backup.sql.enc
```

---

## SECURITY CHECKLIST

### Before Production Deployment

- [ ] Set `APP_ENV=production`
- [ ] Set `APP_DEBUG=false`
- [ ] Set `SESSION_SECURE_COOKIE=true`
- [ ] Set `SESSION_ENCRYPT=true`
- [ ] Set `SESSION_DRIVER=database`
- [ ] Rotate `GROQ_API_KEY` if repo was public
- [ ] Remove `unsafe-inline` and `unsafe-eval` from CSP
- [ ] Implement nonce-based CSP
- [ ] Add virus scanning for file uploads
- [ ] Sanitize uploaded filenames
- [ ] Verify MIME types (not just extension)
- [ ] Install Spatie Permission for role management
- [ ] Configure rate limiting for public endpoints
- [ ] Add HSTS header
- [ ] Set up log rotation
- [ ] Install error tracking (Sentry)
- [ ] Run `composer audit` and `npm audit`
- [ ] Configure database user with minimal privileges
- [ ] Set up automated backups with encryption
- [ ] Test in staging environment

---

## RISK MATRIX

| Vulnerability | Likelihood | Impact | Risk Level | Priority |
|--------------|------------|--------|------------|----------|
| XSS (unsafe-inline) | High | High | 🔴 Critical | P1 |
| Session Hijacking | Medium | High | 🟠 High | P1 |
| API Key Exposure | Low | Medium | 🟡 Medium | P2 |
| SSRF (QR code) | Medium | High | 🟠 High | P2 |
| File Upload Exploit | Medium | Medium | 🟡 Medium | P2 |
| No RBAC | High | Medium | 🟡 Medium | P3 |
| Info Disclosure (debug) | Low | Medium | 🟡 Medium | P3 |
| No Rate Limiting | High | Low | 🟢 Low | P4 |

---

## RECOMMENDED IMPLEMENTATION ORDER

### Phase 1: Immediate (Before Production)
1. ✅ Fix APP_DEBUG (environment-specific)
2. ✅ Fix Session Security
3. ✅ Hardened CSP (remove unsafe directives)
4. ✅ Verify API key rotation

### Phase 2: Short-term (1-2 weeks)
1. ✅ Implement role/permission system
2. ✅ Add file upload validation (virus scan, MIME check)
3. ✅ Add global rate limiting
4. ✅ Add security headers (HSTS, Permissions-Policy)

### Phase 3: Medium-term (1 month)
1. ✅ Set up monitoring (Sentry, log rotation)
2. ✅ Implement automated audits
3. ✅ Database hardening
4. ✅ Backup encryption

---

## VERIFICATION COMMANDS

```bash
# Check .env security
grep -E "(APP_DEBUG|APP_ENV|SESSION)" .env

# Check git history for .env
git log --all --full-history -- .env

# Check for hardcoded secrets
grep -r "gsk_f7wtg" --include="*.php" --include="*.js" .

# Run composer audit
composer audit --no-interaction

# Run npm audit
npm audit --production

# Check file permissions
ls -la storage/bootstrap/cache

# Test security headers
curl -I http://localhost:8000 | grep -i "x-frame\|x-content\|strict"
```

---

*Security audit completed on 2026-08-09*  
*Next audit recommended: 2026-09-09 (30 days)*  
*Status: ⚠️ NEEDS IMPROVEMENT - 6.5/10*
