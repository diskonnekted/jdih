# Dokumentasi Resmi JDIH Banjarnegara
## Tim Exadata — Divisi App, Clasnet Group

---

Folder ini berisi laporan resmi pengembangan dan pengamanan Portal JDIH Kabupaten Banjarnegara Tahun Anggaran 2026.

## Daftar Dokumen

| No | File | Keterangan | No. Dokumen |
|----|------|------------|-------------|
| 1 | [laporan_migrasi_jdih.md](./laporan_migrasi_jdih.md) | Laporan Resmi Migrasi Sistem dari PHP Legacy ke Laravel 11 | EXD/JDIH/MIG/2026/001 |
| 2 | [laporan_pentest_jdih.md](./laporan_pentest_jdih.md) | Laporan Uji Penetrasi — OWASP Top 10 & BSSN ITSA (Revisi 2) | EXD/JDIH/SEC/2026/002 |
| 3 | [laporan_optimasi_database.md](./laporan_optimasi_database.md) | Laporan Optimasi Database — MyISAM ke InnoDB | EXD/JDIH/DB/2026/003 |

## Cara Konversi ke HTML

### Menggunakan Pandoc
```bash
pandoc laporan_migrasi_jdih.md       -o laporan_migrasi_jdih.html       --standalone
pandoc laporan_pentest_jdih.md       -o laporan_pentest_jdih.html       --standalone
pandoc laporan_optimasi_database.md  -o laporan_optimasi_database.html  --standalone
```

### Konversi Semua Sekaligus
```bash
for f in *.md; do pandoc "$f" -o "${f%.md}.html" --standalone; done
```

## Catatan

- Semua diagram menggunakan **Mermaid** (portrait/vertikal `TD`)
- Kompatibel dengan Mermaid v8.x ke atas
- Untuk preview diagram: gunakan VS Code + ekstensi *Markdown Preview Mermaid Support*

---
*© 2026 Clasnet Group / Exadata Divisi App*
*Portal: https://jdih.rapidnet.id*
