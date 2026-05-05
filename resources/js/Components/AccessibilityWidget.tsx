import React, { useState, useEffect } from 'react';
import { Accessibility, Volume2, VolumeX } from 'lucide-react';

export default function AccessibilityWidget() {
    const [isEnabled, setIsEnabled] = useState(false);

    const speakText = (text: string) => {
        if (!text) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'id-ID';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const handleMouseUp = () => {
        if (!isEnabled) return;
        
        const selection = window.getSelection();
        const text = selection ? selection.toString().trim() : '';
        if (text && text.length > 1) {
            speakText(text);
        }
    };

    useEffect(() => {
        if (isEnabled) {
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mouseup', handleMouseUp);
            window.speechSynthesis.cancel();
        }
        return () => document.removeEventListener('mouseup', handleMouseUp);
    }, [isEnabled]);

    // Dengarkan event dari tombol Aksesibilitas di topbar
    useEffect(() => {
        const handler = () => setIsEnabled(prev => !prev);
        window.addEventListener('toggle-accessibility', handler);
        return () => window.removeEventListener('toggle-accessibility', handler);
    }, []);

    return (
        <>
            {/* ACCESSIBILITY / TTS TOGGLE BUTTON (LEFT) */}
            <div className="fixed bottom-6 left-6 z-[999]">
                <button 
                    onClick={() => setIsEnabled(!isEnabled)}
                    className={`h-14 w-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all relative group ${
                        isEnabled 
                        ? 'bg-blue-600 text-white animate-pulse' 
                        : 'bg-slate-800 text-slate-300'
                    }`}
                    title={isEnabled ? "Matikan Pembaca Suara" : "Aktifkan Pembaca Suara"}
                >
                    {isEnabled ? <Volume2 className="h-7 w-7" /> : <Accessibility className="h-7 w-7" />}
                    
                    {/* Tooltip */}
                    <span className="absolute left-full ml-4 bg-white px-4 py-2 rounded-xl text-slate-900 text-xs font-black shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap">
                        {isEnabled ? "Pembaca Suara Aktif (Sorot teks untuk mendengar)" : "Aktifkan Fitur Suara (Aksesibilitas)"}
                    </span>
                    
                    {/* Status Indicator */}
                    {isEnabled && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 border-2 border-white"></span>
                        </span>
                    )}
                </button>
            </div>

            {/* WHATSAPP BUTTON (RIGHT) */}
            <div className="fixed bottom-6 right-6 z-[999]">
                <a 
                    href="https://wa.me/6281234567890" 
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Chat Admin WhatsApp"
                    className="flex flex-col items-center justify-center h-16 w-16 bg-[#25D366] text-white rounded-2xl shadow-2xl hover:scale-110 hover:shadow-green-400/40 active:scale-95 transition-all duration-200 group relative"
                >
                    {/* WhatsApp SVG Icon (inline, tidak bergantung CDN eksternal) */}
                    <svg 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="h-8 w-8"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span className="text-[9px] font-bold leading-none mt-0.5 tracking-wide">WA</span>

                    {/* Tooltip */}
                    <span className="absolute right-full mr-4 bg-white px-4 py-2 rounded-xl text-slate-900 text-xs font-black shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap border border-slate-100">
                        💬 Chat Admin WhatsApp
                    </span>
                </a>
            </div>
        </>
    );
}
