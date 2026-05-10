# JDIH Kabupaten Banjarnegara

[![Laravel Version](https://img.shields.io/badge/Laravel-11.x-red.svg)](https://laravel.com)
[![Filament Version](https://img.shields.io/badge/Filament-v3-yellow.svg)](https://filamentphp.com)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-React-purple.svg)](https://inertiajs.com)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-blue.svg)](#-mobile-pwa-experience)

Portal Jaringan Dokumentasi dan Informasi Hukum (JDIH) Kabupaten Banjarnegara yang modern, responsif, dan inovatif. Aplikasi ini dirancang untuk memberikan akses transparan kepada masyarakat terhadap produk hukum daerah dengan pengalaman pengguna (UX) yang premium.

---

## ✨ Fitur Unggulan Terbaru

### 🎪 Dynamic Hero Slider
- **Manajemen Slider Penuh**: Admin dapat menambah, mengurutkan, dan mengatur konten teks (Subtitle, Headline, Deskripsi) pada setiap slide Hero.
- **Quote Optimized**: Slider didesain untuk menampilkan kutipan hukum dengan ikonografi yang elegan.
- **Smart Toggle**: Opsi untuk menampilkan atau menyembunyikan statistik pada tiap banner secara mandiri.

### 🗳️ Forum Konsultasi Publik & Aspirasi
- **Partisipasi Aktif**: Pengunjung dapat memberikan masukan langsung melalui form di halaman depan.
- **Komentar Draft Produk Hukum**: Terintegrasi dengan sistem "Dialog Publik" untuk menampung feedback masyarakat terhadap rancangan peraturan sebelum disahkan.
- **Admin Integration**: Semua aspirasi terekam secara sistematis di panel admin untuk ditindaklanjuti.

### 📊 Visualisasi Data & Statistik
- **Grafik Interaktif**: Implementasi Chart berbasis database untuk tren produk hukum per tahun dan distribusi jenis dokumen.
- **Mobile Optimized Charts**: Tampilan statistik khusus yang responsif dan ringan untuk perangkat seluler.
- **Rekap IKM**: Fitur cetak laporan dan unduh data Indeks Kepuasan Masyarakat (IKM) dalam format CSV dan PDF.

### ⚡ Optimasi & Branding
- **Logo Optimization**: Migrasi aset logo ke format **WebP** yang memangkas ukuran file hingga 87% untuk loading yang lebih instan.
- **Modern Loader**: Animasi transisi halaman yang premium dengan logo pulsing dan spinning ring.
- **Unified Branding**: Penggunaan `jdih-black.png` untuk latar terang (Header/Cetak) dan `logo_jdih.webp` untuk latar gelap (Footer/Hero).

---

## 🚀 Tech Stack

- **Backend**: Laravel 11
- **Admin Panel**: Filament v3 (Professional Dashboard)
- **Frontend**: React.js with Inertia.js
- **Styling**: Tailwind CSS & Framer Motion
- **Iconography**: Lucide React
- **Chart Library**: Recharts (Lazy-loaded)

---

## 🚢 Prosedur Deployment (Rapidnet Server)

Aplikasi ini menggunakan sistem **Local Build** untuk memudahkan deployment:

1. **Build Aset di Lokal**:
   ```bash
   npm run build
   git add .
   git commit -m "feat: finalized latest features"
   git push origin main
   ```

2. **Update di Server (SSH)**:
   ```bash
   git pull origin main
   composer install --no-dev
   php artisan migrate
   php artisan storage:link
   php artisan optimize:clear
   ```

---

## 📄 Lisensi
Hak Cipta © 2026 JDIH Kabupaten Banjarnegara. Seluruh hak cipta dilindungi undang-undang.

---
*Created with ❤️ by Gemini CLI Assistant.*
