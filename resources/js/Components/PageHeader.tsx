import React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronRight, Home } from 'lucide-react';

interface Breadcrumb {
    label: string;
    href?: string;
}

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    breadcrumbs?: Breadcrumb[];
}

export default function PageHeader({ title, subtitle, breadcrumbs = [] }: PageHeaderProps) {
    return (
        <div className="bg-[#1e293b] py-8 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                    <Link href="/" className="hover:text-[#0d9488] transition-colors flex items-center gap-1">
                        <Home className="h-3.5 w-3.5" /> Beranda
                    </Link>
                    {breadcrumbs.map((bc, i) => (
                        <React.Fragment key={i}>
                            <ChevronRight className="h-3.5 w-3.5 text-slate-600 shrink-0" />
                            {bc.href && i < breadcrumbs.length - 1 ? (
                                <Link href={bc.href} className="hover:text-[#0d9488] transition-colors">{bc.label}</Link>
                            ) : (
                                <span className="text-slate-300">{bc.label}</span>
                            )}
                        </React.Fragment>
                    ))}
                </nav>

                {/* Title */}
                <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-[#0d9488] rounded-full shrink-0" />
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white">{title}</h1>
                        {subtitle && <p className="text-slate-400 text-sm mt-1">{subtitle}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
