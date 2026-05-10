import { ImgHTMLAttributes } from 'react';

export default function ApplicationLogo(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img 
            {...props} 
            src="/logo_jdih.webp" 
            alt="Logo JDIH Banjarnegara" 
            className={`h-20 w-auto object-contain ${props.className || ''}`} 
        />
    );
}
