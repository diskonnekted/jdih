<?php

namespace App\Providers\Filament;

use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages\Dashboard;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Enums\ThemeMode;
use Filament\Widgets\AccountWidget;
use Filament\Widgets\FilamentInfoWidget;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login(\App\Filament\Pages\Auth\Login::class)
            ->colors([
                'primary' => '#0d9488', // JDIH Teal
                'info' => Color::Blue,
                'success' => Color::Emerald,
                'warning' => Color::Orange,
                'danger' => Color::Rose,
            ])
            ->darkMode(true)
            ->defaultThemeMode(ThemeMode::System)
            ->font('Outfit')
            ->brandName('JDIH Banjarnegara')
            ->brandLogo(asset('images/logo-jdih.png'))
            ->brandLogoHeight('2.5rem')
            ->favicon(asset('favicon.png'))
            ->maxContentWidth(\Filament\Support\Enums\Width::Full)
            // Urutan grup navigasi sidebar
            ->navigationGroups([
                \Filament\Navigation\NavigationGroup::make('Produk Hukum')
                    ->collapsed(false),
                \Filament\Navigation\NavigationGroup::make('Profil JDIH')
                    ->collapsed(false),
                \Filament\Navigation\NavigationGroup::make('Berita & Media')
                    ->collapsed(false),
                \Filament\Navigation\NavigationGroup::make('Layanan & Interaksi')
                    ->collapsed(true),
                \Filament\Navigation\NavigationGroup::make('Data Master')
                    ->collapsed(true),
            ])
            ->renderHook(
                'panels::auth.login.before',
                fn (): string => \Illuminate\Support\Facades\Blade::render('
                    <style>
                        .fi-simple-main-ctn { 
                            padding: 3rem !important; 
                        }
                        .fi-simple-card { 
                            border-radius: 3rem !important; 
                            padding: 4rem !important; 
                            box-shadow: 0 25px 50px -12px rgba(13, 148, 136, 0.25) !important;
                        }
                        .fi-logo {
                            background: #0f172a;
                            padding: 1.5rem;
                            border-radius: 1.5rem;
                            margin-bottom: 2rem !important;
                            display: inline-block;
                            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.2);
                        }
                        .fi-logo img {
                            filter: drop-shadow(0 0 10px rgba(255,255,255,0.2)) !important;
                        }
                        .fi-fo-field-wrp {
                            margin-bottom: 2rem !important;
                        }
                        .fi-simple-header-heading {
                            font-size: 2rem !important;
                            font-weight: 900 !important;
                        }
                        /* Captcha Label Styling */
                        [data-field-name="captcha"] label span {
                            background: #0d9488 !important;
                            color: white !important;
                            padding: 0.5rem 1rem !important;
                            border-radius: 0.5rem !important;
                            font-weight: 800 !important;
                        }
                    </style>
                '),
            )
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\Filament\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\Filament\Pages')
            ->pages([
                Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\Filament\Widgets')
            ->widgets([
                // Widgets will be discovered automatically or registered here later
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}
