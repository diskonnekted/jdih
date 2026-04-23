import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    Home, Search, Bell, Info, ExternalLink, 
    BookOpen, Scale, Globe, Newspaper, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    children: React.ReactNode;
}

export default function MobileLayout({ children }: Props) {
    const { url } = usePage();

    const tabs = [
        { label: 'Home', icon: <Home className="h-6 w-6" />, href: '/' },
        { label: 'Search', icon: <Search className="h-6 w-6" />, href: '/katalog' },
        { label: 'Berita', icon: <Newspaper className="h-6 w-6" />, href: '/berita' },
        { label: 'Info', icon: <Info className="h-6 w-6" />, href: '/kedudukan-dan-alamat' },
    ];

    const isActive = (href: string) => {
        if (href === '/' && url === '/') return true;
        if (href !== '/' && url.startsWith(href)) return true;
        return false;
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-24 font-sans select-none overflow-x-hidden">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 z-50">
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-[#003399] p-1.5 rounded-lg shadow-blue-900/10">
                        <Scale className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-black text-[#003399] leading-tight">JDIH BNA</span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Banjarnegara</span>
                    </div>
                </Link>
                <div className="flex items-center gap-4">
                    <button 
                        className="p-2 text-slate-400 hover:text-[#003399] transition-colors relative"
                        aria-label="Notifikasi"
                    >
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
                    </button>
                </div>
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
                            className={`flex flex-col items-center gap-1 p-2 transition-all relative ${active ? 'text-[#003399]' : 'text-slate-400'}`}
                        >
                            {active && (
                                <motion.div 
                                    layoutId="navbg"
                                    className="absolute -top-1 h-1 w-8 bg-[#003399] rounded-full"
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
