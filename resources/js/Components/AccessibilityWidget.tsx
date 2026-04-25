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
            <div className="fixed bottom-24 right-6 z-[999]">
                <a 
                    href="https://wa.me/6281234567890" 
                    target="_blank"
                    rel="noreferrer"
                    className="h-14 w-14 bg-[#25D366] text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group relative"
                >
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                        alt="WA" 
                        className="h-8 w-8" 
                    />
                    <span className="absolute right-full mr-4 bg-white px-4 py-2 rounded-xl text-slate-900 text-xs font-black shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap">
                        Chat Admin WhatsApp
                    </span>
                </a>
            </div>
        </>
    );
}
