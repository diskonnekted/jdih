<x-filament-panels::page>
    <div style="display:flex; flex-direction:column; gap:1rem;">

        {{-- Header Info --}}
        <div style="background:var(--fi-bg); border:1px solid color-mix(in srgb,currentColor 10%,transparent); border-radius:.75rem; padding:1.5rem; display:flex; gap:1rem; align-items:flex-start;">
            <div style="font-size:2rem; flex-shrink:0;">🗄️</div>
            <div>
                <h2 style="font-size:1rem; font-weight:600; margin:0 0 .25rem;">Backup & Snapshot Database</h2>
                <p style="font-size:.875rem; color:var(--fi-color-gray-500); margin:0 0 .25rem;">
                    Backup otomatis berjalan setiap hari pukul <strong>02:00 WIB</strong> dan disimpan selama <strong>30 hari</strong>.
                    File tersimpan di <code style="font-size:.75rem; background:rgba(0,0,0,.1); padding:.1rem .3rem; border-radius:.25rem;">storage/app/backups/</code>
                </p>
                <p style="font-size:.875rem; color:var(--fi-color-gray-500); margin:0;">
                    Total backup: <strong>{{ count($backups) }}</strong> file
                </p>
            </div>
        </div>

        {{-- Backup List --}}
        @if(count($backups) === 0)
            <div style="background:var(--fi-bg); border:1px solid color-mix(in srgb,currentColor 10%,transparent); border-radius:.75rem; padding:3rem; text-align:center;">
                <div style="font-size:3rem; margin-bottom:.75rem;">📭</div>
                <p style="color:var(--fi-color-gray-500); margin:0;">
                    Belum ada backup. Klik <strong>Buat Backup Sekarang</strong> untuk membuat snapshot pertama.
                </p>
            </div>
        @else
            <div style="background:var(--fi-bg); border:1px solid color-mix(in srgb,currentColor 10%,transparent); border-radius:.75rem; overflow:hidden;">
                <table style="width:100%; border-collapse:collapse; font-size:.875rem;">
                    <thead>
                        <tr style="background:rgba(0,0,0,.05);">
                            <th style="padding:.75rem 1rem; text-align:left; font-weight:500; color:var(--fi-color-gray-500);">📄 Nama File</th>
                            <th style="padding:.75rem 1rem; text-align:left; font-weight:500; color:var(--fi-color-gray-500);">Ukuran</th>
                            <th style="padding:.75rem 1rem; text-align:left; font-weight:500; color:var(--fi-color-gray-500);">Dibuat</th>
                            <th style="padding:.75rem 1rem; text-align:right; font-weight:500; color:var(--fi-color-gray-500);">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($backups as $i => $backup)
                            <tr style="border-top:1px solid color-mix(in srgb,currentColor 8%,transparent);">
                                <td style="padding:.75rem 1rem; font-family:monospace; font-size:.75rem;">{{ $backup['name'] }}</td>
                                <td style="padding:.75rem 1rem; color:var(--fi-color-gray-500);">{{ $backup['size'] }}</td>
                                <td style="padding:.75rem 1rem; color:var(--fi-color-gray-500);">{{ $backup['created'] }}</td>
                                <td style="padding:.75rem 1rem; text-align:right;">
                                    <div style="display:flex; gap:.5rem; justify-content:flex-end;">
                                        <button
                                            wire:click="downloadBackup('{{ $backup['name'] }}')"
                                            style="display:inline-flex; align-items:center; gap:.25rem; padding:.375rem .75rem; font-size:.75rem; font-weight:500; border-radius:.5rem; background:rgba(16,185,129,.1); color:#059669; border:none; cursor:pointer;">
                                            ⬇ Unduh
                                        </button>
                                        <button
                                            wire:click="deleteBackup('{{ $backup['name'] }}')"
                                            wire:confirm="Hapus backup {{ $backup['name'] }}?"
                                            style="display:inline-flex; align-items:center; gap:.25rem; padding:.375rem .75rem; font-size:.75rem; font-weight:500; border-radius:.5rem; background:rgba(239,68,68,.1); color:#dc2626; border:none; cursor:pointer;">
                                            🗑 Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @endif

        {{-- SOP Cron Job --}}
        <div style="background:rgba(245,158,11,.08); border:1px solid rgba(245,158,11,.3); border-radius:.75rem; padding:1.25rem;">
            <h3 style="font-size:.875rem; font-weight:600; color:#b45309; margin:0 0 .5rem; display:flex; align-items:center; gap:.5rem;">⏰ Jadwal Backup Otomatis</h3>
            <ul style="font-size:.875rem; color:#92400e; margin:0; padding-left:1.25rem; line-height:1.75;">
                <li>Backup harian setiap pukul <strong>02:00 WIB</strong></li>
                <li>Retensi: <strong>30 hari</strong> (lebih lama dihapus otomatis)</li>
                <li>Format: <strong>SQL terkompresi (.gz)</strong></li>
                <li>Aktifkan scheduler — tambah ke <strong>crontab</strong> server:<br>
                    <code style="display:inline-block; margin-top:.25rem; font-size:.75rem; background:rgba(0,0,0,.1); padding:.25rem .5rem; border-radius:.25rem; font-family:monospace;">
                        * * * * * php /home/rapidnet-jdih/htdocs/jdih.rapidnet.id/artisan schedule:run >> /dev/null 2>&1
                    </code>
                </li>
            </ul>
        </div>

    </div>
</x-filament-panels::page>
