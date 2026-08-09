import React, { useState, useEffect, useCallback } from 'react';
import {
    Accessibility, Volume2, VolumeX,
    Type, Contrast, Moon, Sun, MoveHorizontal,
    Underline, Sparkles, X, Plus, Minus, RefreshCw,
    Eye, EyeOff, TextSelect
} from 'lucide-react';

interface A11ySettings {
    ttsEnabled: boolean;
    fontSize: number;      // 0 = normal, -1 = small, -2 = smaller, 1 = large, 2 = larger
    highContrast: boolean;
    darkMode: boolean;
    textSpacing: boolean;
    underlineLinks: boolean;
    hideImages: boolean;
    readingGuide: boolean;
}

const STORAGE_KEY = 'jdih_a11y_settings';

const defaultSettings: A11ySettings = {
    ttsEnabled: false,
    fontSize: 0,
    highContrast: false,
    darkMode: false,
    textSpacing: false,
    underlineLinks: false,
    hideImages: false,
    readingGuide: false,
};

function loadSettings(): A11ySettings {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return { ...defaultSettings, ...JSON.parse(stored) };
        }
    } catch { /* ignore */ }
    return { ...defaultSettings };
}

function saveSettings(settings: A11ySettings) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch { /* ignore */ }
}

/* ------------------------------------------------------------------ */
/* GLOBAL STYLE INJECTOR                                               */
/* ------------------------------------------------------------------ */
function injectGlobalStyles(settings: A11ySettings) {
    let styleEl = document.getElementById('a11y-global-styles') as HTMLStyleElement;
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'a11y-global-styles';
        document.head.appendChild(styleEl);
    }

    const pct = settings.fontSize === 0 ? '100%'
              : settings.fontSize === 1 ? '110%'
              : settings.fontSize === 2 ? '125%'
              : settings.fontSize === -1 ? '90%'
              : '80%';

    const lineH = settings.textSpacing ? '2.2' : '1.6';
    const letterS = settings.textSpacing ? '0.08em' : 'normal';
    const wordS = settings.textSpacing ? '0.18em' : 'normal';

    let css = `
        /* Font size */
        #a11y-overlay { font-size: ${pct} !important; }

        /* Text spacing */
        #a11y-overlay {
            line-height: ${lineH} !important;
            letter-spacing: ${letterS} !important;
            word-spacing: ${wordS} !important;
        }
        #a11y-overlay p,
        #a11y-overlay li,
        #a11y-overlay td,
        #a11y-overlay th,
        #a11y-overlay span,
        #a11y-overlay div,
        #a11y-overlay a,
        #a11y-overlay h1, #a11y-overlay h2, #a11y-overlay h3,
        #a11y-overlay h4, #a11y-overlay h5, #a11y-overlay h6 {
            line-height: ${lineH} !important;
            letter-spacing: ${letterS} !important;
            word-spacing: ${wordS} !important;
        }

        /* Underline links */
        ${settings.underlineLinks ? `
        #a11y-overlay a {
            text-decoration: underline !important;
            text-underline-offset: 3px !important;
            font-weight: 700 !important;
        }` : ''}

        /* Hide images */
        ${settings.hideImages ? `
        #a11y-overlay img,
        #a11y-overlay svg,
        #a11y-overlay picture,
        #a11y-overlay .banner,
        #a11y-overlay [class*="banner"] {
            visibility: hidden !important;
            opacity: 0 !important;
        }` : ''}

        /* High contrast */
        ${settings.highContrast ? `
        #a11y-overlay {
            background: #000 !important;
            color: #fff !important;
        }
        #a11y-overlay *,
        #a11y-overlay p, #a11y-overlay span, #a11y-overlay div,
        #a11y-overlay h1, #a11y-overlay h2, #a11y-overlay h3,
        #a11y-overlay h4, #a11y-overlay h5, #a11y-overlay h6,
        #a11y-overlay li, #a11y-overlay td, #a11y-overlay th {
            color: #fff !important;
        }
        #a11y-overlay a {
            color: #88ccff !important;
            text-decoration: underline !important;
        }
        #a11y-overlay [class*="bg-white"],
        #a11y-overlay .bg-white {
            background: #000 !important;
        }
        #a11y-overlay [class*="bg-slate"],
        #a11y-overlay .bg-slate {
            background: #111 !important;
        }
        #a11y-overlay [class*="text-slate-"],
        #a11y-overlay .text-slate {
            color: #fff !important;
        }
        #a11y-overlay [class*="border-slate"],
        #a11y-overlay .border-slate {
            border-color: #555 !important;
        }
        #a11y-overlay table {
            border-collapse: collapse !important;
        }
        #a11y-overlay th, #a11y-overlay td {
            border: 1px solid #fff !important;
            padding: 8px !important;
        }
        #a11y-overlay th {
            background: #333 !important;
        }` : ''}

        /* Dark mode (content only) */
        ${settings.darkMode ? `
        #a11y-overlay {
            background: #0f172a !important;
            color: #e2e8f0 !important;
        }
        #a11y-overlay .bg-white {
            background: #1e293b !important;
        }
        #a11y-overlay p, #a11y-overlay span, #a11y-overlay div,
        #a11y-overlay h1, #a11y-overlay h2, #a11y-overlay h3,
        #a11y-overlay h4, #a11y-overlay h5, #a11y-overlay h6,
        #a11y-overlay li {
            color: #cbd5e1 !important;
        }
        #a11y-overlay a {
            color: #93c5fd !important;
        }
        #a11y-overlay [class*="border-slate-100"],
        #a11y-overlay .border-slate-100 {
            border-color: #334155 !important;
        }
        #a11y-overlay input, #a11y-overlay textarea, #a11y-overlay select {
            background: #334155 !important;
            color: #e2e8f0 !important;
            border-color: #475569 !important;
        }
        #a11y-overlay table {
            border-color: #334155 !important;
        }
        #a11y-overlay th {
            background: #334155 !important;
            color: #f1f5f9 !important;
        }
        #a11y-overlay td {
            border-color: #334155 !important;
            color: #cbd5e1 !important;
        }` : ''}

        /* Reading guide - highlight current paragraph */
        ${settings.readingGuide ? `
        #a11y-overlay p,
        #a11y-overlay li {
            transition: background 0.2s ease;
        }
        #a11y-overlay p:hover,
        #a11y-overlay li:hover {
            background: rgba(255, 255, 0, 0.1) !important;
            outline: 2px solid rgba(255, 255, 0, 0.3) !important;
        }` : ''}

        /* Skip to content link */
        #a11y-skip-link {
            position: absolute;
            top: -100%;
            left: 50%;
            transform: translateX(-50%);
            background: #2563eb;
            color: #fff;
            padding: 12px 24px;
            border-radius: 0 0 8px 8px;
            z-index: 10000;
            font-weight: 600;
            text-decoration: none;
            transition: top 0.2s;
        }
        #a11y-skip-link:focus {
            top: 0;
        }
    `;

    styleEl.textContent = css;
}

/* ------------------------------------------------------------------ */
/* COMPONENT                                                           */
/* ------------------------------------------------------------------ */
export default function AccessibilityWidget() {
    const [settings, setSettings] = useState<A11ySettings>(loadSettings);
    const [expanded, setExpanded] = useState(false);
    const [ttsActive, setTtsActive] = useState(settings.ttsEnabled);

    // Inject global styles whenever settings change
    useEffect(() => {
        injectGlobalStyles(settings);
    }, [settings]);

    // Persist settings
    useEffect(() => {
        saveSettings(settings);
    }, [settings]);

    /* ---------------------------------------------------------------- */
    /* TTS HOVER: Baca teks saat hover                                   */
    /* ---------------------------------------------------------------- */
    const [ttsActiveRef, setTtsActiveRef] = useState(false);
    let hoverTimer: ReturnType<typeof setTimeout> | undefined;

    useEffect(() => {
        setTtsActiveRef(ttsActive);
    }, [ttsActive]);

    useEffect(() => {
        const overlay = document.getElementById('a11y-overlay');
        if (!overlay || !ttsActiveRef) {
            window.speechSynthesis.cancel();
            return;
        }

        const shouldSkip = (el: HTMLElement) => {
            const cls = typeof el.className === 'string' ? el.className : '';
            const tag = el.tagName.toLowerCase();
            if (tag === 'button' || tag === 'input' || tag === 'select' || tag === 'a') return true;
            if (cls.includes('fixed') || cls.includes('a11y') || cls.includes('z-[9')) return true;
            return false;
        };

        const speakHandler = (target: HTMLElement) => {
            const sel = window.getSelection();
            if (sel && sel.toString().trim().length > 0) return;

            const text = target.textContent?.trim() || '';
            if (text && text.length > 1 && !shouldSkip(target)) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(text.substring(0, 500));
                utterance.lang = 'id-ID';
                utterance.rate = 0.9;
                window.speechSynthesis.speak(utterance);
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!overlay.contains(target)) return;
            if (shouldSkip(target)) return;

            clearTimeout(hoverTimer);
            hoverTimer = setTimeout(() => speakHandler(target), 400);
        };

        const handleMouseOut = (e: MouseEvent) => {
            const related = e.relatedTarget as Node;
            if (overlay.contains(related)) return;
            window.speechSynthesis.cancel();
            clearTimeout(hoverTimer);
        };

        overlay.addEventListener('mouseover', handleMouseOver);
        overlay.addEventListener('mouseout', handleMouseOut);

        return () => {
            overlay.removeEventListener('mouseover', handleMouseOver);
            overlay.removeEventListener('mouseout', handleMouseOut);
            window.speechSynthesis.cancel();
            clearTimeout(hoverTimer);
            hoverTimer = undefined;
        };
    }, [ttsActiveRef]);

    // Toggle TTS from topbar
    useEffect(() => {
        const handler = () => setTtsActive(prev => {
            setSettings(s => ({ ...s, ttsEnabled: !prev }));
            return !prev;
        });
        window.addEventListener('toggle-accessibility', handler);
        return () => window.removeEventListener('toggle-accessibility', handler);
    }, []);

    const update = useCallback(<K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) => {
        setSettings(prev => {
            const next = { ...prev, [key]: value };
            if (key === 'ttsEnabled') setTtsActive(value as boolean);
            return next;
        });
    }, []);

    const resetAll = useCallback(() => {
        const reset = { ...defaultSettings };
        setSettings(reset);
        setTtsActive(false);
        saveSettings(reset);
    }, []);

    /* ---------------------------------------------------------------- */
    /* TOOLBAR FEATURES DEFINITION                                       */
    /* ---------------------------------------------------------------- */
    const features = [
        {
            id: 'ttsEnabled',
            label: 'Pembaca Suara (Hover)',
            icon: ttsActive ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />,
            toggle: true,
        },
        {
            id: 'fontSize',
            label: 'Ukuran Font',
            icon: <Type className="h-4 w-4" />,
            control: true,
        },
        {
            id: 'highContrast',
            label: 'Kontras Tinggi',
            icon: <Contrast className="h-4 w-4" />,
            toggle: true,
        },
        {
            id: 'darkMode',
            label: 'Mode Gelap',
            icon: <Moon className="h-4 w-4" />,
            toggle: true,
        },
        {
            id: 'textSpacing',
            label: 'Jarak Teks',
            icon: <MoveHorizontal className="h-4 w-4" />,
            toggle: true,
        },
        {
            id: 'underlineLinks',
            label: 'Garis Bawah Link',
            icon: <Underline className="h-4 w-4" />,
            toggle: true,
        },
        {
            id: 'hideImages',
            label: 'Sembunyikan Gambar',
            icon: settings.hideImages ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />,
            toggle: true,
        },
        {
            id: 'readingGuide',
            label: 'Panduan Membaca',
            icon: <TextSelect className="h-4 w-4" />,
            toggle: true,
        },
    ];

    const activeCount = features.filter(f => settings[f.id as keyof A11ySettings]).length;

    return (
        <>
            {/* Skip to content link */}
            <a
                href="#main-content"
                id="a11y-skip-link"
                className="fixed top-0 left-1/2 -translate-x-1/2 z-[10001] bg-blue-600 text-white px-6 py-3 rounded-b-xl font-semibold shadow-lg hover:bg-blue-700 focus:z-[10001] transition-colors"
                onClick={(e) => {
                    e.preventDefault();
                    const main = document.getElementById('main-content');
                    main?.focus();
                }}
            >
                Lewati ke Konten Utama
            </a>

            {/* Main Accessibility Toggle Button */}
            <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-center gap-2">
                {/* Expanded Toolbar Panel */}
                {expanded && (
                    <div className="mb-2 bg-white rounded-2xl shadow-2xl border border-slate-200 w-72 overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-yellow-300" />
                                <span className="text-white font-bold text-sm">Panel Aksesibilitas</span>
                                {activeCount > 0 && (
                                    <span className="ml-2 bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                                        {activeCount} aktif
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={() => setExpanded(false)}
                                className="text-white/70 hover:text-white transition-colors"
                                aria-label="Tutup panel"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Features List */}
                        <div className="p-3 space-y-1 max-h-80 overflow-y-auto">
                            {features.map((feature) => (
                                <div
                                    key={feature.id}
                                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${settings[feature.id as keyof A11ySettings]
                                                ? 'bg-blue-100 text-blue-600'
                                                : 'bg-slate-100 text-slate-500'
                                            }`}>
                                            {feature.icon}
                                        </div>
                                        <span className="text-sm font-medium text-slate-700">{feature.label}</span>
                                    </div>

                                    {feature.toggle && (
                                        <button
                                            onClick={() => update(feature.id as keyof A11ySettings, !settings[feature.id as keyof A11ySettings])}
                                            className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                                                settings[feature.id as keyof A11ySettings]
                                                    ? 'bg-blue-600'
                                                    : 'bg-slate-300'
                                            }`}
                                            aria-label={`${feature.label} ${settings[feature.id as keyof A11ySettings] ? 'aktif' : 'nonaktif'}`}
                                        >
                                            <span
                                                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                                                    settings[feature.id as keyof A11ySettings] ? 'translate-x-5' : 'translate-x-0'
                                                }`}
                                            />
                                        </button>
                                    )}

                                    {feature.control && (
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => update('fontSize', Math.max(-2, settings.fontSize - 1))}
                                                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors"
                                                aria-label="Perkecil font"
                                            >
                                                <Minus className="h-3.5 w-3.5" />
                                            </button>
                                            <span className="text-xs font-bold text-slate-600 w-8 text-center">
                                                {settings.fontSize === 0 ? '100'
                                                    : settings.fontSize === 1 ? '110'
                                                    : settings.fontSize === 2 ? '125'
                                                    : settings.fontSize === -1 ? '90'
                                                    : '80'}%
                                            </span>
                                            <button
                                                onClick={() => update('fontSize', Math.min(2, settings.fontSize + 1))}
                                                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors"
                                                aria-label="Perbesar font"
                                            >
                                                <Plus className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="px-3 py-3 border-t border-slate-100">
                            <button
                                onClick={resetAll}
                                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                                <RefreshCw className="h-4 w-4" />
                                Reset Semua Pengaturan
                            </button>
                        </div>
                    </div>
                )}

                {/* Toggle Button */}
                <button
                    onClick={() => setExpanded(!expanded)}
                    className={`h-14 w-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 relative group ${
                        expanded
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 text-slate-300'
                    }`}
                    title={expanded ? "Tutup Panel Aksesibilitas" : "Buka Panel Aksesibilitas"}
                    aria-label={expanded ? "Tutup panel aksesibilitas" : "Buka panel aksesibilitas"}
                >
                    {expanded ? <X className="h-7 w-7" /> : <Accessibility className="h-7 w-7" />}

                    {/* Badge for active features */}
                    {activeCount > 0 && !expanded && (
                        <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping" />
                            <span className="relative inline-flex rounded-full h-6 w-6 bg-blue-600 border-2 border-white items-center justify-center">
                                <span className="text-[10px] font-bold text-white">{activeCount}</span>
                            </span>
                        </span>
                    )}

                    {/* Tooltip */}
                    <span className="absolute left-full ml-4 bg-white px-4 py-2 rounded-xl text-slate-900 text-xs font-black shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap z-[10000]">
                        {expanded ? "Tutup Panel Aksesibilitas" : "Panel Aksesibilitas Lengkap"}
                    </span>
                </button>
            </div>

            {/* TTS Status Indicator (visible when expanded & TTS active) */}
            {expanded && ttsActive && (
                <div className="fixed bottom-28 left-6 z-[999] bg-blue-600 text-white px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 animate-pulse">
                    <Volume2 className="h-4 w-4" />
                    <span className="text-xs font-semibold">Pembaca Suara Aktif — Hover teks untuk mendengar</span>
                </div>
            )}

            {/* WhatsApp Button (LEFT, ABOVE ACCESSIBILITY) */}
            <div className="fixed bottom-24 left-6 z-[999]">
                <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Chat Admin WhatsApp"
                    className="flex flex-col items-center justify-center h-16 w-16 bg-[#25D366] text-white rounded-2xl shadow-2xl hover:scale-110 hover:shadow-green-400/40 active:scale-95 transition-all duration-200 group relative"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-8 w-8"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span className="text-[9px] font-bold leading-none mt-0.5 tracking-wide">WA</span>

                    <span className="absolute left-full ml-4 bg-white px-4 py-2 rounded-xl text-slate-900 text-xs font-black shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap border border-slate-100 z-[10000]">
                        Chat Admin WhatsApp
                    </span>
                </a>
            </div>
        </>
    );
}
