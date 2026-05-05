import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    Home, Search, Info, ExternalLink,
    Scale, Newspaper, Download, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    children: React.ReactNode;
}

export default function MobileLayout({ children }: Props) {
    const { url } = usePage();
    const [installPrompt, setInstallPrompt] = useState<any>(null);
    const [isInstalled, setIsInstalled] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        // Sudah terpasang sebagai PWA (standalone mode)
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInstalled(true);
            return;
        }
        // iOS Safari standalone
        const isInStandaloneIos = (navigator as any).standalone === true;
        if (isInStandaloneIos) { setIsInstalled(true); return; }

        const handler = (e: Event) => {
            e.preventDefault();
            setInstallPrompt(e);
            setShowTooltip(true);
            tooltipTimer.current = setTimeout(() => setShowTooltip(false), 4000);
        };
        window.addEventListener('beforeinstallprompt', handler as EventListener);
        window.addEventListener('appinstalled', () => {
            setInstallPrompt(null);
            setIsInstalled(true);
        });

        return () => {
            window.removeEventListener('beforeinstallprompt', handler as EventListener);
            if (tooltipTimer.current) clearTimeout(tooltipTimer.current);
        };
    }, []);

    const handleInstall = async () => {
        if (!installPrompt) return;
        setShowTooltip(false);
        installPrompt.prompt();
        const { outcome } = await installPrompt.userChoice;
        if (outcome === 'accepted') {
            setInstallPrompt(null);
            setIsInstalled(true);
        }
    };

    const tabs = [
        { label: 'Home',   icon: <Home className="h-6 w-6" />,      href: '/mobile' },
        { label: 'Cari',   icon: <Search className="h-6 w-6" />,    href: '/mobile/pencarian' },
        { label: 'Berita', icon: <Newspaper className="h-6 w-6" />, href: '/mobile/berita' },
        { label: 'Info',   icon: <Info className="h-6 w-6" />,      href: '/mobile/info' },
    ];

    const isActive = (href: string) => {
        if (href === '/mobile') return url === '/mobile' || url === '/mobile/';
        return url.startsWith(href);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-24 font-sans select-none overflow-x-hidden">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 z-50">
                <Link href="/mobile" className="flex items-center gap-2">
                    <div className="bg-[#0d9488] p-1.5 rounded-lg">
                        <Scale className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-black text-[#0d9488] leading-tight">JDIH BNA</span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Banjarnegara</span>
                    </div>
                </Link>

                {/* Tombol Install PWA — hanya muncul jika belum terinstall & prompt tersedia */}
                {!isInstalled && installPrompt && (
                    <div className="relative">
                        <AnimatePresence>
                            {showTooltip && (
                                <motion.div
                                    initial={{ opacity: 0, y: 4, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                                    className="absolute right-0 top-12 bg-[#0d9488] text-white text-[10px] font-black px-3 py-2 rounded-xl whitespace-nowrap shadow-lg z-50"
                                >
                                    <span className="absolute -top-1.5 right-4 w-3 h-3 bg-[#0d9488] rotate-45 rounded-sm" />
                                    Pasang aplikasi JDIH!
                                    <button onClick={() => setShowTooltip(false)} className="ml-2 opacity-70" aria-label="Tutup">
                                        <X className="h-3 w-3 inline" />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            onClick={handleInstall}
                            aria-label="Pasang Aplikasi JDIH (Install PWA)"
                            className="relative flex items-center gap-2 bg-[#0d9488] text-white pl-3 pr-4 py-2 rounded-2xl text-xs font-black shadow-md active:scale-95 transition-all"
                        >
                            <Download className="h-4 w-4" />
                            <span>Pasang</span>
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-300 opacity-75" />
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-400 border border-white" />
                            </span>
                        </button>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="pt-16 animate-in fade-in duration-500">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={url}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 px-4 pt-2 pb-8 flex justify-around items-center z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
                {tabs.map((tab) => {
                    const active = isActive(tab.href);
                    return (
                        <Link
                            key={tab.label}
                            href={tab.href}
                            className={`flex flex-col items-center gap-1 p-2 transition-all relative ${active ? 'text-[#0d9488]' : 'text-slate-400'}`}
                        >
                            {active && (
                                <motion.div
                                    layoutId="navbg"
                                    className="absolute -top-1 h-1 w-8 bg-[#0d9488] rounded-full"
                                />
                            )}
                            {tab.icon}
                            <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
                        </Link>
                    );
                })}
                <a
                    href="https://linktr.ee/PUUBAGIANHUKUMBNA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-[#0d9488] transition-all"
                >
                    <ExternalLink className="h-6 w-6" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Links</span>
                </a>
            </nav>
        </div>
    );
}
