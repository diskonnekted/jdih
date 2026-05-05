<x-filament-panels::page>
    <div class="space-y-4">

        {{-- Header Info --}}
        <div class="fi-section rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10 p-6">
            <div class="flex items-start gap-4">
                <div class="flex-shrink-0 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <x-heroicon-o-circle-stack class="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                    <h2 class="text-base font-semibold text-gray-950 dark:text-white">Backup & Snapshot Database</h2>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Backup otomatis berjalan setiap hari pukul 02:00 WIB dan disimpan selama 30 hari.
                        File backup disimpan di <code class="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">storage/app/backups/</code>
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Total backup tersimpan: <strong class="text-gray-900 dark:text-white">{{ count($backups) }}</strong> file
                    </p>
                </div>
            </div>
        </div>

        {{-- Backup List --}}
        @if(count($backups) === 0)
            <div class="fi-section rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10 p-8 text-center">
                <x-heroicon-o-inbox class="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                <p class="text-gray-500 dark:text-gray-400">Belum ada backup. Klik <strong>Buat Backup Sekarang</strong> untuk membuat snapshot pertama.</p>
            </div>
        @else
            <div class="fi-section rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10 overflow-hidden">
                <table class="w-full text-sm">
                    <thead class="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th class="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-400">Nama File</th>
                            <th class="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-400">Ukuran</th>
                            <th class="px-4 py-3 text-left font-medium text-gray-600 dark:text-gray-400">Dibuat</th>
                            <th class="px-4 py-3 text-right font-medium text-gray-600 dark:text-gray-400">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                        @foreach($backups as $backup)
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                                <td class="px-4 py-3">
                                    <div class="flex items-center gap-2">
                                        <x-heroicon-o-document-arrow-down class="w-4 h-4 text-gray-400 flex-shrink-0" />
                                        <span class="font-mono text-xs text-gray-700 dark:text-gray-300">{{ $backup['name'] }}</span>
                                    </div>
                                </td>
                                <td class="px-4 py-3 text-gray-600 dark:text-gray-400">{{ $backup['size'] }}</td>
                                <td class="px-4 py-3 text-gray-600 dark:text-gray-400">{{ $backup['created'] }}</td>
                                <td class="px-4 py-3 text-right">
                                    <div class="flex items-center justify-end gap-2">
                                        <a wire:click="downloadBackup('{{ $backup['name'] }}')"
                                           class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 dark:bg-primary-900/20 dark:text-primary-400 cursor-pointer transition">
                                            <x-heroicon-m-arrow-down-tray class="w-3.5 h-3.5" />
                                            Unduh
                                        </a>
                                        <button wire:click="deleteBackup('{{ $backup['name'] }}')"
                                                wire:confirm="Hapus backup {{ $backup['name'] }}?"
                                                class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-danger-50 text-danger-700 hover:bg-danger-100 dark:bg-danger-900/20 dark:text-danger-400 transition">
                                            <x-heroicon-m-trash class="w-3.5 h-3.5" />
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @endif

        {{-- SOP Info --}}
        <div class="fi-section rounded-xl bg-amber-50 dark:bg-amber-900/10 ring-1 ring-amber-200 dark:ring-amber-800 p-5">
            <h3 class="text-sm font-semibold text-amber-800 dark:text-amber-400 mb-2 flex items-center gap-2">
                <x-heroicon-o-clock class="w-4 h-4" /> Jadwal Backup Otomatis
            </h3>
            <ul class="text-sm text-amber-700 dark:text-amber-300 space-y-1 list-disc list-inside">
                <li>Backup harian: setiap hari pukul <strong>02:00 WIB</strong></li>
                <li>Retensi: <strong>30 hari</strong> (backup lebih lama dihapus otomatis)</li>
                <li>Format: <strong>SQL terkompresi (.gz)</strong></li>
                <li>Untuk mengaktifkan jadwal otomatis, tambahkan cron job di server:<br>
                    <code class="text-xs bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded mt-1 inline-block">* * * * * php /path/to/artisan schedule:run >> /dev/null 2>&1</code>
                </li>
            </ul>
        </div>

    </div>
</x-filament-panels::page>
