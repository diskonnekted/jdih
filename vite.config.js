import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
    ],
    build: {
        // ⚡ Pisahkan vendor besar ke chunk terpisah
        // Manfaat: browser cache vendor chunk lebih lama,
        // tidak perlu re-download recharts saat konten page berubah
        rollupOptions: {
            output: {
                manualChunks: {
                    // React core — dipakai di semua halaman
                    'vendor-react': ['react', 'react-dom'],
                    // Inertia — framework SPA
                    'vendor-inertia': ['@inertiajs/react'],
                    // Recharts — BESAR (~270KB), hanya /statistik & chart mini
                    'vendor-recharts': ['recharts'],
                    // Lucide — icon library (tree-shaken, tapi tetap pisahkan)
                    'vendor-lucide': ['lucide-react'],
                    // Axios — HTTP client
                    'vendor-axios': ['axios'],
                },
            },
        },
        // Tampilkan warning untuk chunk > 500KB
        chunkSizeWarningLimit: 500,
    },
});
