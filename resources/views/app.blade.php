<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- PWA Meta Tags -->
        <meta name="theme-color" content="#0d9488">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="apple-mobile-web-app-title" content="JDIH BNA">
        <link rel="icon" type="image/png" href="/favicon.png">
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png">
        <link rel="manifest" href="/manifest.json">

        <!-- Fonts & Performance -->
        <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
        <link rel="preload" href="https://fonts.bunny.net/figtree/files/figtree-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
        <link rel="preload" href="https://fonts.bunny.net/figtree/files/figtree-latin-900-normal.woff2" as="font" type="font/woff2" crossorigin>
        
        <style>
            @font-face {
                font-family: 'Figtree';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: url(https://fonts.bunny.net/figtree/files/figtree-latin-400-normal.woff2) format('woff2');
                unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
            }
            @font-face {
                font-family: 'Figtree';
                font-style: normal;
                font-weight: 500;
                font-display: swap;
                src: url(https://fonts.bunny.net/figtree/files/figtree-latin-500-normal.woff2) format('woff2');
                unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
            }
            @font-face {
                font-family: 'Figtree';
                font-style: normal;
                font-weight: 600;
                font-display: swap;
                src: url(https://fonts.bunny.net/figtree/files/figtree-latin-600-normal.woff2) format('woff2');
                unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
            }
            @font-face {
                font-family: 'Figtree';
                font-style: normal;
                font-weight: 900;
                font-display: swap;
                src: url(https://fonts.bunny.net/figtree/files/figtree-latin-900-normal.woff2) format('woff2');
                unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
            }
        </style>

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx'])
        @inertiaHead
        
        <style>
            #nprogress .bar { background: #0d9488 !important; }
            #nprogress .spinner-icon { border-top-color: #0d9488 !important; border-left-color: #0d9488 !important; }
            
            /* Pre-render placeholder for LCP optimization */
            .pwa-pre-render {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                background: #f8fafc;
                font-family: 'Figtree', sans-serif;
            }
            .pwa-hero-placeholder {
                width: 90%;
                max-width: 400px;
                background: #0d9488;
                border-radius: 2rem;
                padding: 2rem;
                color: white;
                box-shadow: 0 20px 25px -5px rgba(13, 148, 136, 0.2);
            }
        </style>
    </head>
    <body class="font-sans antialiased">
        @inertia
        <div id="inertia-placeholder" style="display: none;">
            <div class="pwa-pre-render">
                <div class="pwa-hero-placeholder">
                    <p style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; color: #ccfbf1; margin-bottom: 0.5rem;">Selamat Datang di JDIH</p>
                    <h2 style="font-size: 1.5rem; font-weight: 900; line-height: 1.25; margin-bottom: 1.5rem;">Portal Dokumentasi Hukum Banjarnegara</h2>
                    <div style="height: 40px; background: rgba(255,255,255,0.2); border-radius: 1rem;"></div>
                </div>
            </div>
        </div>

        <script>
            // Show placeholder only on first load before Inertia takes over
            if (!document.querySelector('#app').children.length) {
                const placeholder = document.querySelector('#inertia-placeholder');
                const appRoot = document.querySelector('#app');
                if (placeholder && appRoot) {
                    appRoot.innerHTML = placeholder.innerHTML;
                }
            }
        </script>
    </body>
</html>
