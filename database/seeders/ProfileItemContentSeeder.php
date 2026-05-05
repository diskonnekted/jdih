<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProfileItem;

class ProfileItemContentSeeder extends Seeder
{
    public function run(): void
    {
        // Format pakai {value: "..."} agar kompatibel dengan Filament Repeater
        
        // VISI MISI
        ProfileItem::where('slug', 'visi-misi')->update([
            'content' => json_encode([
                'visi' => 'Profesional dan Proporsional dalam penyusunan produk hukum daerah, pemberian bantuan hukum dan hak asasi manusia, pelayanan informasi dan dokumentasi hukum serta pengawasan produk hukum daerah kabupaten/kota',
                'misi' => [
                    ['value' => 'Menyusun Produk Hukum daerah selaras dengan kepentingan umum, peraturan perundang-undangan yang lebih tinggi dan/atau peraturan perundang-undangan lainnya serta harmonisasi dengan produk hukum setingkat.'],
                    ['value' => 'Menyelesaikan penanganan perkara dan pemberian bantuan dan perlindungan hukum berdasarkan kepastian hukum, berazaskan kebenaran dan keadilan.'],
                    ['value' => 'Melayani informasi dan dokumentasi hukum.'],
                    ['value' => 'Mewujudkan sumber daya manusia yang profesional dan handal di bidang hukum.'],
                ],
            ]),
        ]);

        // DASAR HUKUM
        ProfileItem::where('slug', 'dasar-hukum')->update([
            'content' => json_encode([
                'items' => [
                    ['no' => 1, 'peraturan' => 'Undang-Undang Nomor 12 Tahun 2011', 'tentang' => 'Pembentukan Peraturan Perundang-Undangan'],
                    ['no' => 2, 'peraturan' => 'Peraturan Presiden Nomor 33 Tahun 2012', 'tentang' => 'Jaringan Dokumentasi dan Informasi Hukum Nasional'],
                    ['no' => 3, 'peraturan' => 'Peraturan Menteri Hukum dan Hak Asasi Manusia Nomor 8 Tahun 2019', 'tentang' => 'Standar Pengelolaan Dokumen dan Informasi Hukum'],
                    ['no' => 4, 'peraturan' => 'Peraturan Daerah Kabupaten Banjarnegara Nomor 1 Tahun 2024', 'tentang' => 'Perubahan Ketiga Atas Peraturan Daerah Nomor 2 Tahun 2016 tentang Pembentukan dan Susunan Perangkat Daerah'],
                    ['no' => 5, 'peraturan' => 'Peraturan Bupati Banjarnegara Nomor 54 Tahun 2021', 'tentang' => 'Kedudukan, Susunan Organisasi, Tugas dan Fungsi serta Tata Kerja Sekretariat Daerah Kabupaten Banjarnegara'],
                ],
            ]),
        ]);

        // TUPOKSI
        ProfileItem::where('slug', 'tupoksi')->update([
            'content' => json_encode([
                'tugas_pokok' => 'Bagian Hukum mempunyai tugas melaksanakan pengkoordinasian perumusan kebijakan daerah, pengkoordinasian pelaksanaan tugas Perangkat Daerah, pemantauan dan evaluasi pelaksanaan kebijakan daerah di bidang perundang-undangan, bantuan hukum, serta dokumentasi dan informasi.',
                'fungsi' => [
                    ['value' => 'Pengkoordinasian penyusunan kebijakan daerah di bidang perundang-undangan, bantuan hukum, serta dokumentasi dan informasi.'],
                    ['value' => 'Pengkoordinasian pelaksanaan tugas Perangkat Daerah di bidang perundang-undangan, bantuan hukum, serta dokumentasi dan informasi.'],
                    ['value' => 'Pemantauan dan evaluasi pelaksanaan kebijakan daerah terkait bidang hukum.'],
                    ['value' => 'Pelaksanaan fungsi kedinasan lain yang diberikan oleh Asisten Pemerintahan dan Kesejahteraan Rakyat yang berkaitan dengan tugasnya.'],
                ],
            ]),
        ]);

        // KEDUDUKAN DAN ALAMAT
        ProfileItem::where('slug', 'kedudukan-alamat')->update([
            'content' => json_encode([
                'instansi' => 'Bagian Hukum SETDA Kabupaten Banjarnegara',
                'alamat'   => 'Lantai 2, Jalan A. Yani Nomor 16 Banjarnegara 591187, Jawa Tengah, Indonesia',
                'telepon'  => '(0286) 591218',
                'fax'      => '(0286) 591187',
                'email'    => 'jdihbanjarnegara@gmail.com',
                'jam_layanan' => [
                    ['hari' => 'Senin – Jumat', 'jam' => '08.00 – 11.00 WIB'],
                    ['hari' => 'Sabtu – Minggu', 'jam' => 'Libur'],
                ],
                'maps_url' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.624220178036!2d109.69379512548414!3d-7.395934914095323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7aa91649242607%3A0x7cf16e25160c9389!2sSekretariat%20Daerah%20Kabupaten%20Banjarnegara!5e0!3m2!1sid!2sid!4v1777905689780!5m2!1sid!2sid',
                'maps_link' => 'https://maps.google.com/?q=Jl.+A.+Yani+No.16+Banjarnegara',
            ]),
        ]);

        // SOP
        ProfileItem::where('slug', 'sop')->update([
            'content' => json_encode([
                'groups' => [
                    [
                        'nomorSop'          => '100.3.8/32/Setda/2024',
                        'namaSop'           => 'Layanan Perpustakaan JDIH',
                        'tanggalPengesahan' => '31 Desember 2024',
                        'disahkanOleh'      => 'Kepala Bagian Hukum',
                        'tujuan'            => 'Menjamin berjalannya proses layanan perpustakaan JDIH, yang meliputi peminjaman dan pengembalian koleksi perpustakaan hukum, sehingga penyedia dokumen dan informasi hukum dapat berjalan dengan baik.',
                        'pages' => [
                            ['src' => '/images/SOP_JDIH_001.webp', 'label' => 'Halaman 1 – Prosedur Peminjaman (Langkah 1–6)'],
                            ['src' => '/images/SOP_JDIH_002.webp', 'label' => 'Halaman 2 – Prosedur Peminjaman (Langkah 7–14)'],
                        ],
                    ],
                    [
                        'nomorSop'          => '100.3.8/33/Setda/2024',
                        'namaSop'           => 'Pendaftaran Keanggotaan Perpustakaan JDIH',
                        'tanggalPengesahan' => '31 Desember 2024',
                        'disahkanOleh'      => 'Kepala Bagian Hukum',
                        'tujuan'            => 'Keanggotaan Perpustakaan JDIH dibutuhkan untuk mengetahui aktivitas layanan perpustakaan JDIH, sehingga perlu menjamin proses pendaftaran anggota secara cepat, mudah dan akurat.',
                        'pages' => [
                            ['src' => '/images/SOP_JDIH_003.webp', 'label' => 'Prosedur Pendaftaran Anggota Perpustakaan JDIH'],
                        ],
                    ],
                    [
                        'nomorSop'          => '100.3.8/34/Setda/2024',
                        'namaSop'           => 'Pengolahan Dokumen Hukum',
                        'tanggalPengesahan' => '31 Desember 2024',
                        'disahkanOleh'      => 'Kepala Bagian Hukum',
                        'tujuan'            => 'Prosedur pengolahan dokumen hukum agar tertata dengan rapi dan mudah ditemukan kembali.',
                        'pages' => [
                            ['src' => '/images/SOP_JDIH_004.webp', 'label' => 'Prosedur Pengolahan Dokumen Hukum'],
                        ],
                    ],
                ],
            ]),
        ]);

        // STRUKTUR ORGANISASI
        ProfileItem::where('slug', 'struktur-organisasi')->update([
            'content' => json_encode([
                'description' => 'Bagan Struktur Organisasi Bagian Hukum Sekretariat Daerah Kabupaten Banjarnegara sesuai Peraturan Bupati Banjarnegara Nomor 54 Tahun 2021.',
            ]),
        ]);

        $this->command->info('ProfileItem content seeded with Filament-compatible JSON data.');
    }
}
