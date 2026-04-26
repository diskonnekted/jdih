# Handover Document: Pengembangan Portal JDIH Banjarnegara

Dokumen ini berisi ringkasan progres pengembangan sistem JDIH Banjarnegara, isu-isu teknis yang telah diselesaikan, serta panduan untuk pengembang selanjutnya. Aplikasi ini dibangun dengan stack **Laravel 11, Filament v3, Inertia.js, React, dan Tailwind CSS**.

## 1. Ringkasan Fitur yang Telah Diselesaikan
*   **Integrasi AI Assistant (Groq API)**: Menggunakan model `llama-3.1-8b-instant`. Telah ditambahkan *bypass* verifikasi SSL (`Http::withoutVerifying()`) untuk mencegah error cURL di server produksi.
*   **Pengelolaan Banner Beranda**: Perbaikan pada *ImageColumn* di Filament Admin Panel agar pratinjau gambar dapat dimuat dengan benar dari disk `public`.
*   **UI/UX Landing Page**: Modifikasi estetika komponen Tautan Terkait (Related Links) dengan penambahan animasi *hover*, bayangan interaktif, dan *layout* yang lebih proporsional.
*   **Fallback Video UI**: Penanganan *error* pada komponen video ketika *database* kosong dengan menggunakan *fallback placeholder* data konstan.
*   **Tabel Survei Admin**: Perbaikan definisi kolom `SurveysTable` sehingga data dari database dapat tampil secara utuh di panel admin.

## 2. Catatan Khusus Pengembangan Selanjutnya

### A. Isu Penyimpanan Media (Storage Disk)
Penting untuk diperhatikan dalam pengembangan modul baru yang melibatkan pengunggahan gambar atau dokumen:

1.  **Filament Disk Configuration**:
    *   Secara *default*, file `config/filesystems.php` mengatur default disk ke `local` (berada di `storage/app/private`).
    *   Setiap kali Anda menggunakan komponen `FileUpload` di form (Form Builder), **wajib** menambahkan `->disk('public')`.
    *   Setiap kali Anda menggunakan `ImageColumn` di tabel (Table Builder), **wajib** menambahkan `->disk('public')`. Jika terlewat, Filament akan membaca disk `local` dan mengakibatkan pratinjau gambar menjadi rusak (broken image) di Panel Admin.
2.  **Storage Link**:
    *   Setelah deploy ke server baru, jangan lupa untuk selalu menjalankan `php artisan storage:link` agar folder `storage/app/public` terbuka ke jaringan web sebagai `public/storage`.
    *   Bila pada server *shared hosting/cPanel* Anda menjumpai larangan *symlink*, konfigurasi symlink tersebut dapat diputar (di-*bypass*) lewat file `index.php` atau *cron job*.

### B. Konfigurasi Lingkungan (Environment Variables)
Beberapa kunci konfigurasi rentan menghilang atau kedaluwarsa setelah proses instalasi/deploy:
1.  **Groq API Key**: Harus selalu dideklarasikan di file `.env` produksi:
    ```env
    GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxx
    ```
2.  **Cache Server**: Jangan pernah menggunakan nilai `env()` secara langsung di dalam kode *controller* atau komponen, gunakan melalui `config()`. Setelah memperbarui isi `.env` di produksi, Anda wajib menjalankan:
    ```bash
    php artisan config:clear
    php artisan cache:clear
    ```
    Jika perintah ini tidak dijalankan, aplikasi akan tetap membaca konfigurasi lama yang tersimpan dalam *cache* yang dapat memunculkan *Error 500*.

### C. Frontend Deployment (Vite)
Karena arsitektur menggunakan Inertia dan React, pembaruan sekecil apapun di dalam folder `resources/js` **wajib** dikompilasi sebelum diunggah ke server:
```bash
npm run build
```
Seluruh perbaikan UI/UX yang dibuat dalam versi lokal harus di-*build* lalu di-*commit* (termasuk folder `public/build`) sebelum di-*pull* (ditarik) oleh server produksi.
