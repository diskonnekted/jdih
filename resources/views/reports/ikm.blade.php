<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan IKM JDIH Banjarnegara</title>
    <style>
        body { font-family: sans-serif; padding: 20px; color: #333; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
        .title { font-size: 20px; font-weight: bold; margin-bottom: 5px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: center; font-size: 12px; }
        th { bg-color: #f4f4f4; font-weight: bold; }
        .summary { margin-top: 30px; padding: 15px; background: #f9f9f9; border-radius: 8px; }
        .ikm-score { font-size: 24px; font-weight: bold; color: #0d9488; }
        @media print {
            .no-print { display: none; }
            body { padding: 0; }
        }
    </style>
</head>
<body>
    <div class="no-print" style="margin-bottom: 20px;">
        <button onclick="window.print()" style="padding: 10px 20px; cursor: pointer; background: #0d9488; color: white; border: none; border-radius: 5px;">Cetak Laporan</button>
        <button onclick="window.close()" style="padding: 10px 20px; cursor: pointer; background: #64748b; color: white; border: none; border-radius: 5px;">Tutup</button>
    </div>

    <div class="header">
        <div class="title">REKAPITULASI INDEKS KEPUASAN MASYARAKAT (IKM)</div>
        <div>JDIH Kabupaten Banjarnegara</div>
        <div style="font-size: 12px; margin-top: 5px;">Dicetak pada: {{ date('d F Y H:i') }}</div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Unsur Pelayanan</th>
                <th>Nilai Rata-rata</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>U1 - Persyaratan</td><td>{{ number_format($averages['u1'], 2) }}</td></tr>
            <tr><td>U2 - Prosedur</td><td>{{ number_format($averages['u2'], 2) }}</td></tr>
            <tr><td>U3 - Waktu Pelayanan</td><td>{{ number_format($averages['u3'], 2) }}</td></tr>
            <tr><td>U4 - Biaya/Tarif</td><td>{{ number_format($averages['u4'], 2) }}</td></tr>
            <tr><td>U5 - Produk Spesifikasi Jenis Pelayanan</td><td>{{ number_format($averages['u5'], 2) }}</td></tr>
            <tr><td>U6 - Kompetensi Pelaksana</td><td>{{ number_format($averages['u6'], 2) }}</td></tr>
            <tr><td>U7 - Perilaku Pelaksana</td><td>{{ number_format($averages['u7'], 2) }}</td></tr>
            <tr><td>U8 - Sarana dan Prasarana</td><td>{{ number_format($averages['u8'], 2) }}</td></tr>
            <tr><td>U9 - Penanganan Pengaduan, Saran dan Masukan</td><td>{{ number_format($averages['u9'], 2) }}</td></tr>
        </tbody>
    </table>

    <div class="summary">
        <div style="font-size: 14px; margin-bottom: 10px;">Total Responden: <strong>{{ $count }}</strong></div>
        <div style="font-size: 14px;">Nilai IKM (Konversi):</div>
        <div class="ikm-score">{{ number_format($ikmValue, 2) }}</div>
        <div style="font-weight: bold; margin-top: 5px;">
            Mutu Pelayanan: 
            @if($ikmValue >= 88.31) Sangat Baik (A)
            @elseif($ikmValue >= 76.61) Baik (B)
            @elseif($ikmValue >= 65.00) Kurang Baik (C)
            @else Tidak Baik (D)
            @endif
        </div>
    </div>

    <h3 style="margin-top: 40px; font-size: 16px;">Detail Responden (Saran & Masukan)</h3>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Profil (Gender/Usia/Pekerjaan)</th>
                <th>Saran & Masukan</th>
            </tr>
        </thead>
        <tbody>
            @foreach($data as $index => $row)
            @if($row->suggestion)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $row->gender }} / {{ $row->age_group }} / {{ $row->occupation }}</td>
                <td style="text-align: left;">{{ $row->suggestion }}</td>
            </tr>
            @endif
            @endforeach
        </tbody>
    </table>
</body>
</html>
