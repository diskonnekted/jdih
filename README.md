# JDIH Kabupaten Banjarnegara

[![Laravel Version](https://img.shields.io/badge/Laravel-11.x-red.svg)](https://laravel.com)
[![Filament Version](https://img.shields.io/badge/Filament-v3-yellow.svg)](https://filamentphp.com)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-React-purple.svg)](https://inertiajs.com)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-blue.svg)](#-mobile-pwa-experience)

Portal Jaringan Dokumentasi dan Informasi Hukum (JDIH) Kabupaten Banjarnegara yang modern, responsif, dan inovatif. Aplikasi ini dirancang untuk memberikan akses transparan kepada masyarakat terhadap produk hukum daerah dengan pengalaman pengguna (UX) yang premium.

---

## ✨ Fitur Unggulan Terbaru

### 💎 Premium Profile Content
- **Smart Dynamic System**: Menggabungkan konten teks dinamis dari database dengan elemen visual premium (grafis, peta, dan tabel) secara otomatis.
- **Enhanced Pages**:
  - **Visi & Misi**: Tampilan kutipan visi yang elegan.
  - **Tugas & Fungsi**: Visualisasi tupoksi dengan ikonografi modern.
  - **Kedudukan & Alamat**: Integrasi Google Maps dinamis dan informasi kontak interaktif.
  - **Struktur Organisasi**: 3-tier diagram organisasi yang interaktif.
  - **SOP**: Galeri alur kerja yang jernih untuk standar pelayanan.

### 🎥 Management Video & Media
- **Custom Covers**: Admin dapat mengunggah thumbnail kustom untuk setiap video media sosial (TikTok/Instagram/Youtube).
- **Auto Metadata**: Penambahan informasi platform, durasi, dan tahun pada setiap konten video.
- **Static Storage Path**: Penggunaan direktori `public/images/covers` untuk akses aset yang lebih cepat dan kompatibilitas server maksimal.

### 🖥️ Desktop Portal (Dual Experience)
- **Classic Mode**: Tampilan korporat yang bersih dan formal dengan navigasi dropdown yang presisi.
- **Modern Mode**: Tampilan futuristik dengan searching yang lebih dinamis.
- **Pencarian Lanjut**: Filter berdasarkan jenis dokumen, nomor, tahun, dan subjek.

### 📱 Mobile PWA Experience
- **Native-Look**: Antarmuka khusus mobile dengan *Bottom Navigation* ala aplikasi Android/iOS.
- **PWA Integration**: Mendukung fitur "Add to Home Screen" untuk akses instan langsung dari ponsel.

---

## 🚀 Tech Stack

- **Backend**: Laravel 11
- **Admin Panel**: Filament v3 (Professional Dashboard)
- **Frontend**: React.js with Inertia.js
- **Styling**: Vanilla CSS with Tailwind CSS Utilities
- **Iconography**: Lucide React
- **Database**: MySQL / MariaDB

---

## 🚢 Prosedur Deployment (Rapidnet Server)

Aplikasi ini menggunakan sistem **Local Build** untuk memudahkan deployment di server yang tidak memiliki `npm`:

1. **Build Aset di Lokal**:
   ```bash
   npm run build
   git add .
   git commit -m "build: finalized assets"
   git push origin main
   ```

2. **Update di Server (SSH)**:
   ```bash
   git pull origin main
   php artisan migrate --force
   php artisan storage:link
   php artisan optimize:clear
   ```

3. **Penting**: Pastikan `APP_URL` di `.env` server menggunakan `https://` yang sesuai dengan domain utama.

---

## 📄 Lisensi
Hak Cipta © 2024 JDIH Kabupaten Banjarnegara. Seluruh hak cipta dilindungi undang-undang.

---
*Created with ❤️ by Antigravity AI Assistant.*
