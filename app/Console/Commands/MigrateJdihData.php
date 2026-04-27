<?php

namespace App\Console\Commands;

use App\Models\LegalDocument;
use App\Models\Category;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class MigrateJdihData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'migrate:jdih-data {file : Path to the SQL file}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate legal documents from old JDIH SQL file';

    /**
     * Mapping from old category singkatan/id to new category ID
     */
    protected $categoryMapping = [
        'PERDA' => 1,
        'PERBUP' => 2,
        'KEPBUP' => 3,
        'KepBUp' => 3,
        'SURATEDARAN' => 4,
        'RAPERDA' => 9,
        'NASKAH' => 7,
        'RANHAM' => 11,
        'ARTIKELHUKUM' => 13,
        'DOKUMENHUKUMLANGKA' => 29,
        'perda' => 1,
        'PerBup' => 2,
    ];

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $filePath = $this->argument('file');

        if (!file_exists($filePath)) {
            $this->error("File not found: $filePath");
            return 1;
        }

        $this->info("Starting migration from $filePath...");

        $handle = fopen($filePath, "r");
        $buffer = "";
        $currentTable = null;
        $count = 0;

        // Disable foreign key checks for speed
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        while (($line = fgets($handle)) !== false) {
            // Find start of INSERT INTO
            if (preg_match("/INSERT INTO `(?P<table>.*?)` VALUES/i", $line, $matches)) {
                $currentTable = $matches['table'];
                $line = preg_replace("/INSERT INTO `.*?` VALUES/i", "", $line);
            }

            if ($currentTable) {
                $buffer .= $line;
                
                if (str_ends_with(trim($line), ";")) {
                    $this->processBuffer($currentTable, $buffer);
                    $buffer = "";
                    $currentTable = null;
                }
            }
        }

        fclose($handle);
        
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        
        $this->info("Migration completed!");
        return 0;
    }

    protected function processBuffer($table, $buffer)
    {
        $buffer = trim($buffer);
        if (str_ends_with($buffer, ";")) {
            $buffer = substr($buffer, 0, -1);
        }

        // Instead of regex, let's use a manual parser to handle ),( correctly
        // while respecting quotes
        $rows = [];
        $current = "";
        $inString = false;
        $quoteChar = "";
        $depth = 0;

        for ($i = 0; $i < strlen($buffer); $i++) {
            $char = $buffer[$i];
            $prevChar = ($i > 0) ? $buffer[$i-1] : "";

            if (($char === "'" || $char === '"') && $prevChar !== "\\") {
                if (!$inString) {
                    $inString = true;
                    $quoteChar = $char;
                } elseif ($char === $quoteChar) {
                    $inString = false;
                }
            }

            if (!$inString) {
                if ($char === "(") {
                    $depth++;
                    if ($depth === 1) {
                        $current = "";
                        continue;
                    }
                } elseif ($char === ")") {
                    $depth--;
                    if ($depth === 0) {
                        $rows[] = $current;
                        $current = "";
                        continue;
                    }
                }
            }

            if ($depth > 0) {
                $current .= $char;
            }
        }
        
        foreach ($rows as $rowValues) {
            try {
                $values = str_getcsv($rowValues, ",", "'", "\\");
                
                switch ($table) {
                    case 'inventarisasi_hukum':
                        if (count($values) >= 50) $this->migrateLegalDocument($values);
                        break;
                    case 'berita':
                        if (count($values) >= 13) $this->migrateNews($values);
                        break;
                    case 'slider':
                        if (count($values) >= 4) $this->migrateBanner($values);
                        break;
                    case 'anggota_jdih':
                        if (count($values) >= 4) $this->migrateMember($values);
                        break;
                }
            } catch (\Exception $e) {
                $this->error("Failed to parse row in $table: " . $e->getMessage());
            }
        }
    }

    private function toValue($value)
    {
        $val = trim($value, "' ");
        if ($val === 'NULL' || $val === 'null' || $val === '') {
            return '-';
        }
        return $val;
    }

    protected function migrateLegalDocument($values)
    {
        $number = $values[10];
        $year = $values[19];
        $typeShort = $values[9];
        $categoryId = $this->categoryMapping[$typeShort] ?? 1;

        if (\App\Models\LegalDocument::where('document_number', $number)->where('year', $year)->where('category_id', $categoryId)->exists()) {
            return;
        }

        $legalFields = [
            1 => 'Hukum Umum',
            2 => 'Hukum Adat',
            3 => 'Hukum Administrasi Negara',
            4 => 'Hukum Agraria',
            5 => 'Hukum Dagang',
            6 => 'Hukum Islam',
            7 => 'Hukum Internasional',
            8 => 'Hukum Lingkungan',
            9 => 'Hukum Perburuhan',
            10 => 'Hukum Perdata',
            11 => 'Hukum Pidana',
            12 => 'Hukum Tata Negara',
        ];

        \App\Models\LegalDocument::create([
            'title' => $this->sanitize($values[20]) ?: 'Tanpa Judul',
            'document_number' => $number,
            'year' => $year,
            'category_id' => $categoryId,
            'document_type' => 'Peraturan Perundang-undangan',
            'entity' => 'Pemerintah Kabupaten Banjarnegara',
            'teu' => $this->toValue($values[16] ?: 'Banjarnegara'),
            'abbreviation' => $typeShort,
            'status' => 'Berlaku',
            'abstract' => str_ends_with($values[21], '.pdf') ? null : $this->sanitize($values[21]),
            'abstract_file_path' => str_ends_with($values[21], '.pdf') ? "abstrak/" . $values[21] : null,
            'file_path' => $values[35] ? "produk_hukum/" . $values[35] : null,
            'published_at' => $this->isValidDate($values[17]) ? $values[17] : null,
            'promulgated_at' => $this->isValidDate($values[18]) ? $values[18] : null,
            'place_of_enactment' => $this->toValue($values[25] ?: 'Banjarnegara'),
            'source' => $this->toValue($values[26]),
            'subject' => $this->toValue($values[36]),
            'signer' => $this->toValue($values[14]),
            'author' => $this->toValue($values[12] ?: 'Bagian Hukum'),
            'publisher_place' => $this->toValue($values[25] ?: 'Banjarnegara'),
            'judicial_review' => $this->toValue($values[15]),
            'initiator' => $this->toValue($values[13]),
            'legal_field' => $legalFields[(int)$values[29]] ?? '-',
            'language' => (int)$values[28] === 1 ? 'Bahasa Indonesia' : '-',
            'view_count' => (int) $values[45],
            'download_count' => (int) $values[44],
            'created_at' => $this->isValidDate($values[47]) ? $values[47] : now(),
            'updated_at' => $this->isValidDate($values[48]) ? $values[48] : now(),
        ]);
    }

    protected function migrateNews($values)
    {
        // 0:id, 2:nama, 5:isi, 7:images, 8:views, 10:penulis, 11:tgl, 12:publish
        $title = $this->sanitize($values[2]);
        $slug = $values[4] ?: \Illuminate\Support\Str::slug($title);

        if (\App\Models\News::where('slug', $slug)->exists()) return;

        \App\Models\News::create([
            'title' => $title,
            'slug' => $slug,
            'content' => $values[5],
            'image' => $values[7] ? "berita/" . $values[7] : null,
            'published_at' => $this->isValidDate($values[11]) ? $values[11] : now(),
            'status' => $values[12] ? 'published' : 'draft',
            'category' => 'Berita',
        ]);
    }

    protected function migrateBanner($values)
    {
        // 0:id, 1:gambar, 2:name, 4:status
        if (!$values[1]) return;
        
        \App\Models\Banner::create([
            'title' => $values[2] ?: 'Banner',
            'image_path' => "slider/" . $values[1],
            'is_active' => $values[4] === 'aktif',
        ]);
    }

    protected function migrateMember($values)
    {
        // 0:id, 1:logo, 2:name, 3:website, 6:desc_anggota
        if (\App\Models\JdihMember::where('name', $values[2])->exists()) return;

        \App\Models\JdihMember::create([
            'name' => $values[2],
            'url' => $values[3],
            'photo_path' => $values[1] ? "anggota/" . $values[1] : null,
            'position' => $values[6] ?: 'Anggota JDIH',
            'category' => 'Lainnya',
            'sort_order' => 0,
        ]);
    }

    protected function sanitize($text)
    {
        if (!$text) return $text;
        return strip_tags($text);
    }

    protected function isValidDate($date)
    {
        if (!$date || $date == '0000-00-00' || $date == '0000-00-00 00:00:00' || $date == 'NULL') return false;
        return true;
    }
}
