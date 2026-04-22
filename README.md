# JDIH Kabupaten Banjarnegara

[![Laravel Version](https://img.shields.io/badge/Laravel-11.x-red.svg)](https://laravel.com)
[![Filament Version](https://img.shields.io/badge/Filament-v3-yellow.svg)](https://filamentphp.com)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-React-purple.svg)](https://inertiajs.com)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-blue.svg)](#-mobile-pwa-experience)

Portal Jaringan Dokumentasi dan Informasi Hukum (JDIH) Kabupaten Banjarnegara yang modern, responsif, dan inovatif. Aplikasi ini dirancang untuk memberikan akses transparan kepada masyarakat terhadap produk hukum daerah dengan pengalaman pengguna (UX) yang premium.

---

## ✨ Fitur Unggulan

### 🖥️ Desktop Portal (Dual Experience)
- **Classic Mode**: Tampilan korporat yang bersih dan formal dengan navigasi dropdown yang presisi.
- **Modern Mode**: Tampilan futuristik dengan searching yang lebih dinamis.
- **Pencarian Lanjut**: Filter berdasarkan jenis dokumen, nomor, tahun, dan subjek.

### 📱 Mobile PWA Experience
- **Native-Look**: Antarmuka khusus mobile dengan *Bottom Navigation* ala aplikasi Android/iOS.
- **PWA Integration**: Mendukung fitur "Add to Home Screen" untuk akses instan langsung dari ponsel.
- **Performance**: Optimalisasi aset Vite untuk pemuatan halaman kilat di jaringan seluler.

### 🛠️ Powerful Admin Dashboard (Filament v3)
- **Statistik Interaktif**: Dashboard dengan bagan pengunjung dan tren produk hukum tahunan.
- **Management Khusus**:
  - **Produk Hukum**: Manajemen dokumen hukum dengan filter canggih.
  - **Infografis Hukum**: Galeri visual (1:1 ratio) untuk edukasi hukum masyarakat.
  - **Inovasi Desa**: Integrasi produk hukum desa via OpenSID API secara otomatis.
- **Theme Switcher**: Dukungan Mode Terang (Light) dan Gelap (Dark) dengan mode terang sebagai default.

---

## 🚀 Tech Stack

- **Backend**: Laravel 11
- **Admin Panel**: Filament v3
- **Frontend**: React.js with Inertia.js
- **Styling**: Tailwind CSS
- **PWA**: Custom Service Worker & Manifest integration
- **Database**: MySQL / MariaDB

---

## 🛠️ Instalasi Lokal

1. **Clone repository**:
   ```bash
   git clone https://github.com/diskonnekted/jdih.git
   cd jdih
   ```

2. **Pasang dependensi**:
   ```bash
   composer install
   npm install
   ```

3. **Konfigurasi Environment**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Migrasi & Seed Database**:
   ```bash
   php artisan migrate --seed
   ```

5. **Build Aset & Jalankan**:
   ```bash
   npm run build
   php artisan serve
   ```

---

## 🚢 Prosedur Deployment (Rapidnet Server)

Aplikasi ini menggunakan sistem **Local Build** untuk memudahkan deployment di server yang tidak memiliki `npm`:

1. Pastikan folder `public/build` sudah ter-upload (via `git push` dari lokal).
2. Di terminal SSH server:
   ```bash
   git pull origin main
   php artisan migrate --force
   php artisan livewire:publish --assets
   php artisan optimize:clear
   ```
3. Pastikan `APP_URL` di `.env` server menggunakan `https://`.

---

## 📄 Lisensi
Hak Cipta © 2024 JDIH Kabupaten Banjarnegara. Seluruh hak cipta dilindungi undang-undang.

---
*Created with ❤️ by Antigravity AI Assistant.*
