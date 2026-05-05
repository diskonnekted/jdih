<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Daftar Putusan Hukum – JDIH Banjarnegara</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; font-size: 11px; color: #000; background: #fff; }
        .header { text-align: center; margin-bottom: 16px; border-bottom: 2px solid #000; padding-bottom: 10px; }
        .header img { height: 60px; margin-bottom: 6px; }
        .header h1 { font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
        .header h2 { font-size: 12px; font-weight: normal; margin-top: 2px; }
        .header .meta { font-size: 10px; color: #555; margin-top: 6px; }
        .filter-info { background: #f5f5f5; border: 1px solid #ddd; padding: 6px 10px; margin-bottom: 12px; font-size: 10px; }
        table { width: 100%; border-collapse: collapse; margin-top: 8px; }
        thead th { background: #1e3a5f; color: #fff; padding: 6px 8px; text-align: left; font-size: 10px; font-weight: bold; border: 1px solid #1e3a5f; }
        tbody tr:nth-child(even) { background: #f9f9f9; }
        tbody td { padding: 5px 8px; border: 1px solid #ddd; vertical-align: top; font-size: 10px; }
        .footer { margin-top: 20px; font-size: 10px; color: #555; text-align: right; }
        .footer .signature { margin-top: 40px; }
        .no-print { margin-bottom: 12px; }
        .btn-print { padding: 8px 20px; background: #1e3a5f; color: #fff; border: none; border-radius: 6px; font-size: 12px; cursor: pointer; font-weight: bold; }
        .btn-print:hover { background: #0d9488; }
        @media print {
            .no-print { display: none !important; }
            @page { margin: 1.5cm; size: A4 landscape; }
        }
    </style>
</head>
<body>

<div class="no-print">
    <button class="btn-print" onclick="window.print()">🖨️ Cetak / Simpan PDF</button>
    <span style="margin-left:12px;font-size:11px">
        Total: <strong>{{ $total }}</strong> putusan | Halaman <strong>{{ $page }}</strong> dari <strong>{{ $totalPages }}</strong>
    </span>
</div>

<div class="header">
    <img src="{{ asset('images/logo-jdih.webp') }}" alt="Logo JDIH">
    <h1>Daftar Putusan Hukum</h1>
    <h2>JDIH Kabupaten Banjarnegara</h2>
    <div class="meta">
        Dicetak: {{ now()->format('d F Y, H:i') }} WIB
        &nbsp;|&nbsp;
        Menampilkan {{ $decisions->count() }} dari {{ $total }} putusan
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
            <th style="width:4%">No</th>
            <th style="width:10%">No Peraturan</th>
            <th style="width:6%">Tahun</th>
            <th style="width:38%">Judul</th>
            <th style="width:12%">Jenis Peradilan</th>
            <th style="width:12%">Status</th>
            <th style="width:10%">Publish</th>
            <th style="width:8%">Dibuat</th>
        </tr>
    </thead>
    <tbody>
        @forelse($decisions as $i => $d)
        <tr>
            <td>{{ $offset + $i + 1 }}</td>
            <td>{{ $d->document_number }}</td>
            <td>{{ $d->year }}</td>
            <td>{{ $d->title }}</td>
            <td>{{ $d->court_type ?? '-' }}</td>
            <td>{{ $d->status ?? '-' }}</td>
            <td>{{ $d->is_published ? 'Aktif' : 'Non Aktif' }}</td>
            <td>{{ $d->created_at->format('d/m/Y') }}</td>
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
