<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Jenis Produk Hukum – JDIH Banjarnegara</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; font-size: 12px; color: #000; background: #fff; }
        .header { text-align: center; margin-bottom: 16px; border-bottom: 2px solid #000; padding-bottom: 10px; }
        .header img { height: 60px; margin-bottom: 6px; }
        .header h1 { font-size: 14px; font-weight: bold; text-transform: uppercase; }
        .header h2 { font-size: 12px; font-weight: normal; margin-top: 2px; }
        .header .meta { font-size: 10px; color: #555; margin-top: 6px; }
        table { width: 100%; border-collapse: collapse; margin-top: 8px; }
        thead th { background: #1e3a5f; color: #fff; padding: 7px 10px; text-align: left; font-size: 11px; border: 1px solid #1e3a5f; }
        tbody tr:nth-child(even) { background: #f9f9f9; }
        tbody td { padding: 6px 10px; border: 1px solid #ddd; font-size: 11px; }
        .footer { margin-top: 20px; font-size: 10px; color: #555; text-align: right; }
        .no-print { margin-bottom: 12px; }
        .btn-print { padding: 8px 20px; background: #1e3a5f; color: #fff; border: none; border-radius: 6px; font-size: 12px; cursor: pointer; font-weight: bold; }
        @media print {
            .no-print { display: none !important; }
            @page { margin: 1.5cm; size: A4 portrait; }
        }
    </style>
</head>
<body>

<div class="no-print">
    <button class="btn-print" onclick="window.print()">🖨️ Cetak / Simpan PDF</button>
    <span style="margin-left:12px;font-size:11px">Total: <strong>{{ $categories->count() }}</strong> kategori</span>
</div>

<div class="header">
    <img src="{{ asset('images/logo-jdih.webp') }}" alt="Logo JDIH">
    <h1>Daftar Jenis Produk Hukum</h1>
    <h2>JDIH Kabupaten Banjarnegara</h2>
    <div class="meta">Dicetak: {{ now()->format('d F Y, H:i') }} WIB</div>
</div>

<table>
    <thead>
        <tr>
            <th style="width:5%">No</th>
            <th style="width:40%">Nama Jenis Produk Hukum</th>
            <th style="width:10%">Kode</th>
            <th style="width:15%">Slug URL</th>
            <th style="width:15%">Jumlah Dokumen</th>
            <th style="width:15%">Dibuat</th>
        </tr>
    </thead>
    <tbody>
        @forelse($categories as $i => $cat)
        <tr>
            <td>{{ $i + 1 }}</td>
            <td><strong>{{ $cat->name }}</strong></td>
            <td>{{ $cat->code }}</td>
            <td>{{ $cat->slug }}</td>
            <td style="text-align:center"><strong>{{ $cat->legal_documents_count }}</strong></td>
            <td>{{ $cat->created_at->format('d/m/Y') }}</td>
        </tr>
        @empty
        <tr><td colspan="6" style="text-align:center;padding:20px;color:#999">Tidak ada data</td></tr>
        @endforelse
    </tbody>
</table>

<div class="footer">
    <p>JDIH Banjarnegara &mdash; jdih.banjarnegarakab.go.id</p>
</div>
</body>
</html>
