<?php

namespace App\Filament\Pages\Auth;

use Filament\Forms\Components\TextInput;
use Filament\Auth\Pages\Login as BaseLogin;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\App;
use Filament\Notifications\Notification;
use Illuminate\Validation\ValidationException;
use App\Models\ActivityLog;

class Login extends BaseLogin
{
    public function mount(): void
    {
        parent::mount();

        // Skip captcha di environment lokal
        if (!App::isLocal() && !Session::has('captcha_answer')) {
            $this->generateCaptcha();
        }
    }

    protected function generateCaptcha(): void
    {
        $operators = ['+', '-', '*'];
        $op = $operators[array_rand($operators)];
        $a  = rand(2, 12);
        $b  = rand(1, 10);

        // Hindari hasil negatif pada pengurangan
        if ($op === '-' && $b > $a) [$a, $b] = [$b, $a];

        $answer = match($op) {
            '+'  => $a + $b,
            '-'  => $a - $b,
            '*'  => $a * $b,
        };

        $opLabel = match($op) {
            '+' => 'ditambah',
            '-' => 'dikurangi',
            '*' => 'dikali',
        };

        Session::put('captcha_question', "Berapa {$a} {$opLabel} {$b} ?");
        Session::put('captcha_answer', $answer);
        Session::put('captcha_generated_at', now()->timestamp);
    }

    public function form(Schema $schema): Schema
    {
        // Di lokal: hanya tampilkan email & password tanpa captcha
        if (App::isLocal()) {
            return $schema->components([
                $this->getEmailFormComponent(),
                $this->getPasswordFormComponent(),
                $this->getRememberFormComponent(),
            ]);
        }

        if (!Session::has('captcha_question')) {
            $this->generateCaptcha();
        }

        return $schema
            ->components([
                $this->getEmailFormComponent(),
                $this->getPasswordFormComponent(),
                $this->getRememberFormComponent(),
                TextInput::make('captcha')
                    ->label(fn() => Session::get('captcha_question'))
                    ->placeholder('Hasil angka...')
                    ->required()
                    ->numeric()
                    ->autocomplete(false)
                    ->extraAttributes(['autocomplete' => 'off']),
            ]);
    }

    protected function getCredentialsFromFormData(array $data): array
    {
        // Bypass validasi captcha di lokal
        if (!App::isLocal()) {
            $generatedAt = Session::get('captcha_generated_at', 0);
            $expired     = (now()->timestamp - $generatedAt) > 300; // 5 menit

            if ($expired) {
                $this->generateCaptcha();
                throw ValidationException::withMessages([
                    'data.captcha' => 'Captcha telah kadaluarsa. Silakan isi ulang.',
                ]);
            }

            if ((int)($data['captcha'] ?? -1) !== (int)Session::get('captcha_answer')) {
                $this->generateCaptcha(); // regenerate setiap jawaban salah
                throw ValidationException::withMessages([
                    'data.captcha' => 'Jawaban captcha salah. Silakan coba lagi.',
                ]);
            }

            // Hapus captcha setelah berhasil (single-use)
            Session::forget(['captcha_question', 'captcha_answer', 'captcha_generated_at']);
        }

        return [
            'email'    => $data['email'],
            'password' => $data['password'],
        ];
    }

    protected function afterLogin(): void
    {
        ActivityLog::log('login', null, 'Login berhasil ke admin panel');
    }
}

