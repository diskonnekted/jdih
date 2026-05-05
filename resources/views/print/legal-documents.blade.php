<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Produk Hukum – JDIH Banjarnegara</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; font-size: 11px; color: #000; background: #fff; }

        .header { text-align: center; margin-bottom: 16px; border-bottom: 2px solid #000; padding-bottom: 10px; }
        .header img { height: 60px; margin-bottom: 6px; }
        .header h1 { font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
        .header h2 { font-size: 12px; font-weight: normal; margin-top: 2px; }
        .header .meta { font-size: 10px; color: #555; margin-top: 6px; }

        .filter-info { background: #f5f5f5; border: 1px solid #ddd; padding: 6px 10px; margin-bottom: 12px; font-size: 10px; }
        .filter-info strong { font-size: 10px; }

        table { width: 100%; border-collapse: collapse; margin-top: 8px; }
        thead th {
            background: #1e3a5f;
            color: #fff;
            padding: 6px 8px;
            text-align: left;
            font-size: 10px;
            font-weight: bold;
            border: 1px solid #1e3a5f;
        }
        tbody tr:nth-child(even) { background: #f9f9f9; }
        tbody td { padding: 5px 8px; border: 1px solid #ddd; vertical-align: top; font-size: 10px; }
        .badge-berlaku { color: #15803d; font-weight: bold; }
        .badge-dicabut { color: #dc2626; font-weight: bold; }
        .badge-diubah  { color: #d97706; font-weight: bold; }
        .file-ok   { color: #15803d; }
        .file-none { color: #dc2626; }

        .footer { margin-top: 20px; font-size: 10px; color: #555; text-align: right; }
        .footer .signature { margin-top: 40px; }

        .no-print { margin-bottom: 12px; }
        .btn-print {
            display: inline-block;
            padding: 8px 20px;
            background: #1e3a5f;
            color: #fff;
            border: none;
            border-radius: 6px;
            font-size: 12px;
            cursor: pointer;
            font-weight: bold;
        }
        .btn-print:hover { background: #0d9488; }
        .total-info { display: inline-block; margin-left: 12px; font-size: 11px; color: #444; }

        @media print {
            .no-print { display: none !important; }
            body { font-size: 10px; }
            @page { margin: 1.5cm; size: A4 landscape; }
        }
    </style>
</head>
<body>

<div class="no-print">
    <button class="btn-print" onclick="window.print()">🖨️ Cetak / Simpan PDF</button>
    <span class="total-info">Total: <strong>{{ $total }}</strong> dokumen | Halaman: <strong>{{ $page }}</strong> dari <strong>{{ $totalPages }}</strong></span>
</div>

<div class="header">
    <img src="{{ asset('images/logo-jdih.webp') }}" alt="Logo JDIH">
    <h1>Jaringan Dokumentasi dan Informasi Hukum</h1>
    <h2>Kabupaten Banjarnegara</h2>
    <div class="meta">
        Dicetak: {{ now()->format('d F Y, H:i') }} WIB
        &nbsp;|&nbsp;
        Menampilkan {{ $documents->count() }} dari {{ $total }} dokumen
        @if($page && $totalPages)
            &nbsp;|&nbsp; Halaman {{ $page }} dari {{ $totalPages }}
        @endif
    </div>
</div>

@if($activeFilters)
<div class="filter-info">
    <strong>Filter Aktif:</strong>
    @foreach($activeFilters as $label => $value)
        &nbsp; <em>{{ $label }}:</em> <strong>{{ $value }}</strong> &nbsp;|
    @endforeach
</div>
@endif

<table>
    <thead>
        <tr>
            <th style="width:3%">No</th>
            <th style="width:14%">Kategori</th>
            <th style="width:8%">Nomor</th>
            <th style="width:5%">Tahun</th>
            <th style="width:43%">Judul</th>
            <th style="width:10%">Tgl Penetapan</th>
            <th style="width:8%">Status</th>
            <th style="width:9%">File</th>
        </tr>
    </thead>
    <tbody>
        @forelse($documents as $i => $doc)
        <tr>
            <td>{{ $offset + $i + 1 }}</td>
            <td>{{ $doc->category->name ?? '-' }}</td>
            <td>{{ $doc->document_number }}</td>
            <td>{{ $doc->year }}</td>
            <td>{{ $doc->title }}</td>
            <td>{{ $doc->published_at ? $doc->published_at->format('d/m/Y') : '-' }}</td>
            <td class="{{ $doc->status === 'Berlaku' ? 'badge-berlaku' : ($doc->status === 'Dicabut' || $doc->status === 'Tidak Berlaku' ? 'badge-dicabut' : 'badge-diubah') }}">
                {{ $doc->status }}
            </td>
            <td class="{{ $doc->file_path ? 'file-ok' : 'file-none' }}">
                {{ $doc->file_path ? '✓ Tersedia' : '✗ Kosong' }}
            </td>
        </tr>
        @empty
        <tr><td colspan="8" style="text-align:center;padding:20px;color:#999">Tidak ada data</td></tr>
        @endforelse
    </tbody>
</table>

<div class="footer">
    <p>JDIH Banjarnegara &mdash; jdih.banjarnegarakab.go.id</p>
    <div class="signature">
        <p>Banjarnegara, {{ now()->format('d F Y') }}</p>
        <br><br><br>
        <p>( _________________________ )</p>
        <p style="font-size:9px;color:#888">Kepala Bagian Hukum</p>
    </div>
</div>

</body>
</html>
