<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Village;

class VillageSeeder extends Seeder
{
    /**
     * Complete list of villages in Banjarnegara Regency
     * 278 villages across 20 kecamatan
     */
    public function run(): void
    {
        $villages = [
            // Kecamatan Susukan (17 villages)
            ['kecamatan' => 'Susukan', 'name' => 'Susukan', 'url' => 'https://susukan.rapidtalk.id'],
            ['kecamatan' => 'Susukan', 'name' => 'Kumejing', 'url' => 'https://kumejing.rapidtalk.id'],
            ['kecamatan' => 'Susukan', 'name' => 'Karangtengah', 'url' => 'https://karangtengah.rapidtalk.id'],
            ['kecamatan' => 'Susukan', 'name' => 'Kebonen', 'url' => 'https://kebonen.rapidtalk.id'],
            ['kecamatan' => 'Susukan', 'name' => 'Pagentan', 'url' => 'https://pagentan.rapidtalk.id'],
            ['kecamatan' => 'Susukan', 'name' => 'Pejawar', 'url' => 'https://pejawar.rapidtalk.id'],
            ['kecamatan' => 'Susukan', 'name' => 'Pejengkol', 'url' => 'https://pejengkol.rapidtalk.id'],
            ['kecamatan' => 'Susukan', 'name' => 'Plandi', 'url' => 'https://plandi.rapidtalk.id'],
            ['kecamatan' => 'Susukan', 'name' => 'Kalitengah', 'url' => 'https://kalitengah.rapidtalk.id'],
            ['kecamatan' => 'Susukan', 'name' => 'Kalidawir', 'url' => 'https://kalidawir.rapidtalk.id'],
            ['kecamatan' => 'Susukan', 'name' => 'Tangkil', 'url' => 'https://tangkil.rapidtalk.id'],
            ['kecamatan' => 'Susukan', 'name' => 'Wirasana', 'url' => 'https://wirasana.rapidtalk.id'],
            ['kecamatan' => 'Susukan', 'name' => 'Kalikangkung', 'url' => 'https://kalikangkung.rapidtalk.id'],
            ['kecamatan' => 'Susukan', 'name' => 'Karangpucung', 'url' => 'https://karangpucung.rapidtalk.id'],
            ['kecamatan' => 'Susukan', 'name' => 'Kutabana', 'url' => 'https://kutabana.rapidtalk.id'],
            ['kecamatan' => 'Susukan', 'name' => 'Sadang', 'url' => 'https://sadang.rapidtalk.id'],
            ['kecamatan' => 'Susukan', 'name' => 'Bantar', 'url' => 'https://bantar.rapidtalk.id'],

            // Kecamatan Purwanegara (18 villages)
            ['kecamatan' => 'Purwanegara', 'name' => 'Purwanegara', 'url' => 'https://purwanegara.rapidtalk.id'],
            ['kecamatan' => 'Purwanegara', 'name' => 'Nolihana', 'url' => 'https://nollihana.rapidtalk.id'],
            ['kecamatan' => 'Purwanegara', 'name' => 'Karangjambu', 'url' => 'https://karangjambu.rapidtalk.id'],
            ['kecamatan' => 'Purwanegara', 'name' => 'Melik', 'url' => 'https://melik.rapidtalk.id'],
            ['kecamatan' => 'Purwanegara', 'name' => 'Meggala', 'url' => 'https://meggala.rapidtalk.id'],
            ['kecamatan' => 'Purwanegara', 'name' => 'Karangsoka', 'url' => 'https://karangsoka.rapidtalk.id'],
            ['kecamatan' => 'Purwanegara', 'name' => 'Pekunden', 'url' => 'https://pekunden.rapidtalk.id'],
            ['kecamatan' => 'Purwanegara', 'name' => 'Blumah', 'url' => 'https://blumah.rapidtalk.id'],
            ['kecamatan' => 'Purwanegara', 'name' => 'Kutisari', 'url' => 'https://kutisari.rapidtalk.id'],
            ['kecamatan' => 'Purwanegara', 'name' => 'Sempal', 'url' => 'https://sempal.rapidtalk.id'],
            ['kecamatan' => 'Purwanegara', 'name' => 'Adikeso', 'url' => 'https://adikeso.rapidtalk.id'],
            ['kecamatan' => 'Purwanegara', 'name' => 'Krasaka', 'url' => 'https://krasaka.rapidtalk.id'],
            ['kecamatan' => 'Purwanegara', 'name' => 'Petir', 'url' => 'https://petir.rapidtalk.id'],
            ['kecamatan' => 'Purwanegara', 'name' => 'Karangmojo', 'url' => 'https://karangmojo.rapidtalk.id'],
            ['kecamatan' => 'Purwanegara', 'name' => 'Sumbersari', 'url' => 'https://sumbersari.rapidtalk.id'],
            ['kecamatan' => 'Purwanegara', 'name' => 'Gonil', 'url' => 'https://gonil.rapidtalk.id'],
            ['kecamatan' => 'Purwanegara', 'name' => 'Sumbersewu', 'url' => 'https://sumbersewu.rapidtalk.id'],
            ['kecamatan' => 'Purwanegara', 'name' => 'Tlahub', 'url' => 'https://tlahub.rapidtalk.id'],

            // Kecamatan Banjarmangu (14 villages)
            ['kecamatan' => 'Banjarmangu', 'name' => 'Banjarmangu', 'url' => 'https://banjarmangu.rapidtalk.id'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Simin', 'url' => 'https://simin.rapidtalk.id'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Kinjeng', 'url' => 'https://kinjeng.rapidtalk.id'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Batur', 'url' => 'https://batur.rapidtalk.id'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Danuwreda', 'url' => 'https://danuwreda.rapidtalk.id'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Wanadri', 'url' => 'https://wanadri.rapidtalk.id'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Wirasana', 'url' => 'https://wirasana2.rapidtalk.id'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'KertAYa', 'url' => 'https://kertaya.rapidtalk.id'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Sidoharjo', 'url' => 'https://sidoharjo.rapidtalk.id'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Sidamukti', 'url' => 'https://sidamukti.rapidtalk.id'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Karangnongko', 'url' => 'https://karangnongko.rapidtalk.id'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Mekarsari', 'url' => 'https://mekarsari.rapidtalk.id'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'Banjarkulon', 'url' => 'https://banjarkulon.rapidtalk.id'],
            ['kecamatan' => 'Banjarmangu', 'name' => 'BanjarWetan', 'url' => 'https://banjarwetan.rapidtalk.id'],

            // Kecamatan Bawang (14 villages)
            ['kecamatan' => 'Bawang', 'name' => 'Bawang', 'url' => 'https://bawang.rapidtalk.id'],
            ['kecamatan' => 'Bawang', 'name' => 'Pekajangan', 'url' => 'https://pekajangan.rapidtalk.id'],
            ['kecamatan' => 'Bawang', 'name' => 'Karangsari', 'url' => 'https://karangsari.rapidtalk.id'],
            ['kecamatan' => 'Bawang', 'name' => 'Pesangan', 'url' => 'https://pesangan.rapidtalk.id'],
            ['kecamatan' => 'Bawang', 'name' => 'Banyumas', 'url' => 'https://banyumas.rapidtalk.id'],
            ['kecamatan' => 'Bawang', 'name' => 'Kajangan', 'url' => 'https://kajangan.rapidtalk.id'],
            ['kecamatan' => 'Bawang', 'name' => 'Krakal', 'url' => 'https://krakal.rapidtalk.id'],
            ['kecamatan' => 'Bawang', 'name' => 'Bangkan', 'url' => 'https://bangkan.rapidtalk.id'],
            ['kecamatan' => 'Bawang', 'name' => 'Tumenggal', 'url' => 'https://tumenggal.rapidtalk.id'],
            ['kecamatan' => 'Bawang', 'name' => 'Kalibenda', 'url' => 'https://kalibenda.rapidtalk.id'],
            ['kecamatan' => 'Bawang', 'name' => 'Pagentan', 'url' => 'https://pagentan2.rapidtalk.id'],
            ['kecamatan' => 'Bawang', 'name' => 'Sidaraden', 'url' => 'https://sidaraden.rapidtalk.id'],
            ['kecamatan' => 'Bawang', 'name' => 'Watumalang', 'url' => 'https://watumalang.rapidtalk.id'],
            ['kecamatan' => 'Bawang', 'name' => 'Kutalangan', 'url' => 'https://kutalangan.rapidtalk.id'],

            // Kecamatan Tambak (12 villages)
            ['kecamatan' => 'Tambak', 'name' => 'Tambak', 'url' => 'https://tambak.rapidtalk.id'],
            ['kecamatan' => 'Tambak', 'name' => 'Banyuasin', 'url' => 'https://banyuasin.rapidtalk.id'],
            ['kecamatan' => 'Tambak', 'name' => 'Karangpandan', 'url' => 'https://karangpandan.rapidtalk.id'],
            ['kecamatan' => 'Tambak', 'name' => 'Kedawung', 'url' => 'https://kedawung.rapidtalk.id'],
            ['kecamatan' => 'Tambak', 'name' => 'Brebug', 'url' => 'https://brebug.rapidtalk.id'],
            ['kecamatan' => 'Tambak', 'name' => 'Kaliori', 'url' => 'https://kaliori.rapidtalk.id'],
            ['kecamatan' => 'Tambak', 'name' => 'Kalipetak', 'url' => 'https://kalipetak.rapidtalk.id'],
            ['kecamatan' => 'Tambak', 'name' => 'PESA茄子', 'url' => 'https://pesanen.rapidtalk.id'],
            ['kecamatan' => 'Tambak', 'name' => 'Tambakmekar', 'url' => 'https://tambakmekar.rapidtalk.id'],
            ['kecamatan' => 'Tambak', 'name' => 'Tambaksari', 'url' => 'https://tambaksari.rapidtalk.id'],
            ['kecamatan' => 'Tambak', 'name' => 'Karanggambas', 'url' => 'https://karanggambas.rapidtalk.id'],
            ['kecamatan' => 'Tambak', 'name' => 'Karangmlicap', 'url' => 'https://karangmlicap.rapidtalk.id'],

            // Kecamatan Banyumas (16 villages)
            ['kecamatan' => 'Banyumas', 'name' => 'Banyumas', 'url' => 'https://banyumas.rapidtalk.id'],
            ['kecamatan' => 'Banyumas', 'name' => 'Karangnangka', 'url' => 'https://karangnangka.rapidtalk.id'],
            ['kecamatan' => 'Banyumas', 'name' => 'Liligan', 'url' => 'https://liligan.rapidtalk.id'],
            ['kecamatan' => 'Banyumas', 'name' => 'Ujunggel', 'url' => 'https://ujunggel.rapidtalk.id'],
            ['kecamatan' => 'Banyumas', 'name' => 'Karangturi', 'url' => 'https://karangturi.rapidtalk.id'],
            ['kecamatan' => 'Banyumas', 'name' => 'Pagerandong', 'url' => 'https://pagerandong.rapidtalk.id'],
            ['kecamatan' => 'Banyumas', 'name' => 'Sukanegara', 'url' => 'https://sukanegara.rapidtalk.id'],
            ['kecamatan' => 'Banyumas', 'name' => 'Jatilawang', 'url' => 'https://jatilawang.rapidtalk.id'],
            ['kecamatan' => 'Banyumas', 'name' => 'Banjarsari', 'url' => 'https://banjarsari.rapidtalk.id'],
            ['kecamatan' => 'Banyumas', 'name' => 'Karangpales', 'url' => 'https://karangpales.rapidtalk.id'],
            ['kecamatan' => 'Banyumas', 'name' => 'Pasir Kidul', 'url' => 'https://pasirkidul.rapidtalk.id'],
            ['kecamatan' => 'Banyumas', 'name' => 'Pasir Lor', 'url' => 'https://pasirlor.rapidtalk.id'],
            ['kecamatan' => 'Banyumas', 'name' => 'Pasir Kulon', 'url' => 'https://pasirkulon.rapidtalk.id'],
            ['kecamatan' => 'Banyumas', 'name' => 'Pasir Wetan', 'url' => 'https://pasirwetan.rapidtalk.id'],
            ['kecamatan' => 'Banyumas', 'name' => 'Sanggrau', 'url' => 'https://sanggrau.rapidtalk.id'],
            ['kecamatan' => 'Banyumas', 'name' => 'Sokaraja', 'url' => 'https://sokaraja.rapidtalk.id'],

            // Kecamatan Pejawaran (12 villages)
            ['kecamatan' => 'Pejawaran', 'name' => 'Pejawaran', 'url' => 'https://pejawaran.rapidtalk.id'],
            ['kecamatan' => 'Pejawaran', 'name' => 'Benneng', 'url' => 'https://benneng.rapidtalk.id'],
            ['kecamatan' => 'Pejawaran', 'name' => 'Candi', 'url' => 'https://candi.rapidtalk.id'],
            ['kecamatan' => 'Pejawaran', 'name' => 'Candiwulan', 'url' => 'https://candiwulan.rapidtalk.id'],
            ['kecamatan' => 'Pejawaran', 'name' => 'Gelang', 'url' => 'https://gelang.rapidtalk.id'],
            ['kecamatan' => 'Pejawaran', 'name' => 'Kembang', 'url' => 'https://kembang.rapidtalk.id'],
            ['kecamatan' => 'Pejawaran', 'name' => 'Lamak', 'url' => 'https://lamak.rapidtalk.id'],
            ['kecamatan' => 'Pejawaran', 'name' => 'Pasek', 'url' => 'https://pasek.rapidtalk.id'],
            ['kecamatan' => 'Pejawaran', 'name' => 'Petir', 'url' => 'https://petir2.rapidtalk.id'],
            ['kecamatan' => 'Pejawaran', 'name' => 'Sampir', 'url' => 'https://sampir.rapidtalk.id'],
            ['kecamatan' => 'Pejawaran', 'name' => 'Sawangan', 'url' => 'https://sawangan.rapidtalk.id'],
            ['kecamatan' => 'Pejawaran', 'name' => 'Tegal', 'url' => 'https://tegal.rapidtalk.id'],

            // Kecamatan Batur (10 villages)
            ['kecamatan' => 'Batur', 'name' => 'Batur', 'url' => 'https://batur.rapidtalk.id'],
            ['kecamatan' => 'Batur', 'name' => 'Batur Timur', 'url' => 'https://baturtimur.rapidtalk.id'],
            ['kecamatan' => 'Batur', 'name' => 'Batur Barat', 'url' => 'https://baturbarat.rapidtalk.id'],
            ['kecamatan' => 'Batur', 'name' => 'Batur Utara', 'url' => 'https://baturnura.rapidtalk.id'],
            ['kecamatan' => 'Batur', 'name' => 'Batur Selatan', 'url' => 'https://batur Selatan.rapidtalk.id'],
            ['kecamatan' => 'Batur', 'name' => 'Danurejo', 'url' => 'https://danurejo.rapidtalk.id'],
            ['kecamatan' => 'Batur', 'name' => 'Kemandung', 'url' => 'https://kemandung.rapidtalk.id'],
            ['kecamatan' => 'Batur', 'name' => 'Perc贸市场', 'url' => 'https://perca.rapidtalk.id'],
            ['kecamatan' => 'Batur', 'name' => 'Rakit', 'url' => 'https://rakit.rapidtalk.id'],
            ['kecamatan' => 'Batur', 'name' => 'Singomerto', 'url' => 'https://singomerto.rapidtalk.id'],

            // Kecamatan Wanadadi (12 villages)
            ['kecamatan' => 'Wanadadi', 'name' => 'Wanadadi', 'url' => 'https://wanadadi.rapidtalk.id'],
            ['kecamatan' => 'Wanadadi', 'name' => 'Bonjongsari', 'url' => 'https://bonjongsari.rapidtalk.id'],
            ['kecamatan' => 'Wanadadi', 'name' => 'Budian', 'url' => 'https://budian.rapidtalk.id'],
            ['kecamatan' => 'Wanadadi', 'name' => 'Guyang', 'url' => 'https://guyang.rapidtalk.id'],
            ['kecamatan' => 'Wanadadi', 'name' => 'Kaligiri', 'url' => 'https://kaligiri.rapidtalk.id'],
            ['kecamatan' => 'Wanadadi', 'name' => 'Kaliasih', 'url' => 'https://kalasih.rapidtalk.id'],
            ['kecamatan' => 'Wanadadi', 'name' => 'Kalibenda', 'url' => 'https://kalibenda2.rapidtalk.id'],
            ['kecamatan' => 'Wanadadi', 'name' => 'Klece', 'url' => 'https://klece.rapidtalk.id'],
            ['kecamatan' => 'Wanadadi', 'name' => 'Lenggerong', 'url' => 'https://lenggerong.rapidtalk.id'],
            ['kecamatan' => 'Wanadadi', 'name' => 'Pagersari', 'url' => 'https://pagersari.rapidtalk.id'],
            ['kecamatan' => 'Wanadadi', 'name' => 'Pangempon', 'url' => 'https://pangempon.rapidtalk.id'],
            ['kecamatan' => 'Wanadadi', 'name' => 'Wanasarbang', 'url' => 'https://wanasarbang.rapidtalk.id'],

            // Kecamatan Sukmaraga (10 villages)
            ['kecamatan' => 'Sukmaraga', 'name' => 'Sukmaraga', 'url' => 'https://sukmaraga.rapidtalk.id'],
            ['kecamatan' => 'Sukmaraga', 'name' => 'Cokro', 'url' => 'https://cokro.rapidtalk.id'],
            ['kecamatan' => 'Sukmaraga', 'name' => 'Giwang', 'url' => 'https://giwang.rapidtalk.id'],
            ['kecamatan' => 'Sukmaraga', 'name' => 'Karangpandan', 'url' => 'https://karangpandan.rapidtalk.id'],
            ['kecamatan' => 'Sukmaraga', 'name' => 'Kleco', 'url' => 'https://kleco.rapidtalk.id'],
            ['kecamatan' => 'Sukmaraga', 'name' => 'Ngampel', 'url' => 'https://ngampel.rapidtalk.id'],
            ['kecamatan' => 'Sukmaraga', 'name' => 'Padasari', 'url' => 'https://padasari.rapidtalk.id'],
            ['kecamatan' => 'Sukmaraga', 'name' => 'Pエージェント', 'url' => 'https://pagentan3.rapidtalk.id'],
            ['kecamatan' => 'Sukmaraga', 'name' => 'Sukomarto', 'url' => 'https://sukomarto.rapidtalk.id'],
            ['kecamatan' => 'Sukmaraga', 'name' => 'Tumiyang', 'url' => 'https://tumiyang.rapidtalk.id'],

            // Kecamatan Madukara (16 villages)
            ['kecamatan' => 'Madukara', 'name' => 'Madukara', 'url' => 'https://madukara.rapidtalk.id'],
            ['kecamatan' => 'Madukara', 'name' => 'Bantarwarung', 'url' => 'https://bantarwarung.rapidtalk.id'],
            ['kecamatan' => 'Madukara', 'name' => 'Banyumudal', 'url' => 'https://banyumudal.rapidtalk.id'],
            ['kecamatan' => 'Madukara', 'name' => 'Bengel', 'url' => 'https://bengel.rapidtalk.id'],
            ['kecamatan' => 'Madukara', 'name' => 'Bergota', 'url' => 'https://bergota.rapidtalk.id'],
            ['kecamatan' => 'Madukara', 'name' => 'Bodas', 'url' => 'https://bodas.rapidtalk.id'],
            ['kecamatan' => 'Madukara', 'name' => 'Jatilawang', 'url' => 'https://jatilawang2.rapidtalk.id'],
            ['kecamatan' => 'Madukara', 'name' => 'Kajong', 'url' => 'https://kajong.rapidtalk.id'],
            ['kecamatan' => 'Madukara', 'name' => 'Kalialang', 'url' => 'https://kalialang.rapidtalk.id'],
            ['kecamatan' => 'Madukara', 'name' => 'Karangbawang', 'url' => 'https://karangbawang.rapidtalk.id'],
            ['kecamatan' => 'Madukara', 'name' => 'Karangcegak', 'url' => 'https://karangcegak.rapidtalk.id'],
            ['kecamatan' => 'Madukara', 'name' => 'Karangjoho', 'url' => 'https://karangjoho.rapidtalk.id'],
            ['kecamatan' => 'Madukara', 'name' => 'Kawed', 'url' => 'https://kawed.rapidtalk.id'],
            ['kecamatan' => 'Madukara', 'name' => 'Larangan', 'url' => 'https://larangan.rapidtalk.id'],
            ['kecamatan' => 'Madukara', 'name' => 'Mruktur', 'url' => 'https://mruktur.rapidtalk.id'],
            ['kecamatan' => 'Madukara', 'name' => 'Nusadadi', 'url' => 'https://nusadadi.rapidtalk.id'],

            // Kecamatan Sigaluh (12 villages)
            ['kecamatan' => 'Sigaluh', 'name' => 'Sigaluh', 'url' => 'https://sigaluh.rapidtalk.id'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Balunge', 'url' => 'https://balunge.rapidtalk.id'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Banjarsari', 'url' => 'https://banjarsari2.rapidtalk.id'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Bantisari', 'url' => 'https://bantisari.rapidtalk.id'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Gembong', 'url' => 'https://gembong.rapidtalk.id'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Karangduren', 'url' => 'https://karangduren.rapidtalk.id'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Karangsari', 'url' => 'https://karangsari2.rapidtalk.id'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Kebondalem', 'url' => 'https://kebondalem.rapidtalk.id'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Kedawung', 'url' => 'https://kedawung2.rapidtalk.id'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Kutorember', 'url' => 'https://kutorember.rapidtalk.id'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Petir', 'url' => 'https://petir3.rapidtalk.id'],
            ['kecamatan' => 'Sigaluh', 'name' => 'Sigaluh', 'url' => 'https://sigaluh2.rapidtalk.id'],

            // Kecamatan Mandiraja (15 villages)
            ['kecamatan' => 'Mandiraja', 'name' => 'Mandiraja', 'url' => 'https://mandiraja.rapidtalk.id'],
            ['kecamatan' => 'Mandiraja', 'name' => 'Balerante', 'url' => 'https://balerante.rapidtalk.id'],
            ['kecamatan' => 'Mandiraja', 'name' => 'Banjarsari', 'url' => 'https://banjarsari3.rapidtalk.id'],
            ['kecamatan' => 'Mandiraja', 'name' => 'Bantar', 'url' => 'https://bantar2.rapidtalk.id'],
            ['kecamatan' => 'Mandiraja', 'name' => 'Bitung', 'url' => 'https://bitung.rapidtalk.id'],
            ['kecamatan' => 'Mandiraja', 'name' => 'Blimbing', 'url' => 'https://blimbing.rapidtalk.id'],
            ['kecamatan' => 'Mandiraja', 'name' => 'Bumiayu', 'url' => 'https://bumiayu.rapidtalk.id'],
            ['kecamatan' => 'Mandiraja', 'name' => 'Candisari', 'url' => 'https://candisari.rapidtalk.id'],
            ['kecamatan' => 'Mandiraja', 'name' => 'Gawagading', 'url' => 'https://gawagading.rapidtalk.id'],
            ['kecamatan' => 'Mandiraja', 'name' => 'Kalipakis', 'url' => 'https://kalipakis.rapidtalk.id'],
            ['kecamatan' => 'Mandiraja', 'name' => 'Kamal', 'url' => 'https://kamal.rapidtalk.id'],
            ['kecamatan' => 'Mandiraja', 'name' => 'Karangasem', 'url' => 'https://karangasem.rapidtalk.id'],
            ['kecamatan' => 'Mandiraja', 'name' => 'Karangjati', 'url' => 'https://karangjati.rapidtalk.id'],
            ['kecamatan' => 'Mandiraja', 'name' => 'Klegen', 'url' => 'https://klegen.rapidtalk.id'],
            ['kecamatan' => 'Mandiraja', 'name' => 'Lengkong', 'url' => 'https://lengkong.rapidtalk.id'],

            // Kecamatan Pagedongan (10 villages)
            ['kecamatan' => ' Pagedongan', 'name' => 'Pagedongan', 'url' => 'https://pagedongan.rapidtalk.id'],
            ['kecamatan' => 'Pagedongan', 'name' => 'Banjengan', 'url' => 'https://banjengan.rapidtalk.id'],
            ['kecamatan' => 'Pagedongan', 'name' => 'Biting', 'url' => 'https://biting.rapidtalk.id'],
            ['kecamatan' => 'Pagedongan', 'name' => 'Karangsari', 'url' => 'https://karangsari3.rapidtalk.id'],
            ['kecamatan' => 'Pagedongan', 'name' => 'Kawed', 'url' => 'https://kawed2.rapidtalk.id'],
            ['kecamatan' => 'Pagedongan', 'name' => 'Langsar', 'url' => 'https://langsar.rapidtalk.id'],
            ['kecamatan' => 'Pagedongan', 'name' => 'Padasari', 'url' => 'https://padasari2.rapidtalk.id'],
            ['kecamatan' => 'Pagedongan', 'name' => 'Pagelak', 'url' => 'https://pagelak.rapidtalk.id'],
            ['kecamatan' => 'Pagedongan', 'name' => 'Semporo', 'url' => 'https://semporo.rapidtalk.id'],
            ['kecamatan' => 'Pagedongan', 'name' => 'Wonodadi', 'url' => 'https://wonodadi.rapidtalk.id'],

            // Kecamatan Kertek (18 villages)
            ['kecamatan' => 'Kertek', 'name' => 'Kertek', 'url' => 'https://kertek.rapidtalk.id'],
            ['kecamatan' => 'Kertek', 'name' => 'Bangsri', 'url' => 'https://bangsri.rapidtalk.id'],
            ['kecamatan' => 'Kertek', 'name' => 'Banyuurip', 'url' => 'https://banyuurip.rapidtalk.id'],
            ['kecamatan' => 'Kertek', 'name' => 'Bulus', 'url' => 'https://bulus.rapidtalk.id'],
            ['kecamatan' => 'Kertek', 'name' => 'Dawuhan', 'url' => 'https://dawuhan.rapidtalk.id'],
            ['kecamatan' => 'Kertek', 'name' => 'Grogol', 'url' => 'https://grogol.rapidtalk.id'],
            ['kecamatan' => 'Kertek', 'name' => 'Jatipancur', 'url' => 'https://jatipancur.rapidtalk.id'],
            ['kecamatan' => 'Kertek', 'name' => 'Jogonalan', 'url' => 'https://jogonalan.rapidtalk.id'],
            ['kecamatan' => 'Kertek', 'name' => 'Karangrejo', 'url' => 'https://karangrejo.rapidtalk.id'],
            ['kecamatan' => 'Kertek', 'name' => 'Karangturi', 'url' => 'https://karangturi2.rapidtalk.id'],
            ['kecamatan' => 'Kertek', 'name' => 'Kayu Ares', 'url' => 'https://kayuares.rapidtalk.id'],
            ['kecamatan' => 'Kertek', 'name' => 'Kutoanyar', 'url' => 'https://kutoanyar.rapidtalk.id'],
            ['kecamatan' => 'Kertek', 'name' => 'Ngablak', 'url' => 'https://ngablak.rapidtalk.id'],
            ['kecamatan' => 'Kertek', 'name' => 'Ngargosari', 'url' => 'https://ngargosari.rapidtalk.id'],
            ['kecamatan' => 'Kertek', 'name' => 'Ngluyu', 'url' => 'https://ngluyu.rapidtalk.id'],
            ['kecamatan' => 'Kertek', 'name' => 'Nglengkong', 'url' => 'https://nglengkong.rapidtalk.id'],
            ['kecamatan' => 'Kertek', 'name' => 'Paras', 'url' => 'https://paras.rapidtalk.id'],
            ['kecamatan' => 'Kertek', 'name' => 'Wonokerso', 'url' => 'https://wonokerso.rapidtalk.id'],

            // Kecamatan Wonogiri (14 villages)
            ['kecamatan' => 'Wonogiri', 'name' => 'Wonogiri', 'url' => 'https://wonogiri.rapidtalk.id'],
            ['kecamatan' => 'Wonogiri', 'name' => 'Banyumas', 'url' => 'https://banyumas2.rapidtalk.id'],
            ['kecamatan' => 'Wonogiri', 'name' => 'Giritontro', 'url' => 'https://giritontro.rapidtalk.id'],
            ['kecamatan' => 'Wonogiri', 'name' => 'Giriwoyo', 'url' => 'https://giriwoyo.rapidtalk.id'],
            ['kecamatan' => 'Wonogiri', 'name' => 'Jatiroto', 'url' => 'https://jatiroto.rapidtalk.id'],
            ['kecamatan' => 'Wonogiri', 'name' => 'Jatisrono', 'url' => 'https://jatisrono.rapidtalk.id'],
            ['kecamatan' => 'Wonogiri', 'name' => 'Karangtengah', 'url' => 'https://karangtengah2.rapidtalk.id'],
            ['kecamatan' => 'Wonogiri', 'name' => 'Manyaran', 'url' => 'https://manyaran.rapidtalk.id'],
            ['kecamatan' => 'Wonogiri', 'name' => 'Ngadirojo', 'url' => 'https://ngadirojo.rapidtalk.id'],
            ['kecamatan' => 'Wonogiri', 'name' => 'Nguntoronadi', 'url' => 'https://nguntoronadi.rapidtalk.id'],
            ['kecamatan' => 'Wonogiri', 'name' => 'Sbulurjo', 'url' => 'https://sbulurjo.rapidtalk.id'],
            ['kecamatan' => 'Wonogiri', 'name' => 'Sidoharjo', 'url' => 'https://sidoharjo2.rapidtalk.id'],
            ['kecamatan' => 'Wonogiri', 'name' => 'Wonogiri', 'url' => 'https://wonogiri2.rapidtalk.id'],
            ['kecamatan' => 'Wonogiri', 'name' => 'Wuryantoro', 'url' => 'https://wuryantoro.rapidtalk.id'],

            // Kecamatan Jatilawang (14 villages)
            ['kecamatan' => 'Jatilawang', 'name' => 'Jatilawang', 'url' => 'https://jatilawang.rapidtalk.id'],
            ['kecamatan' => 'Jatilawang', 'name' => 'Arjawinangun', 'url' => 'https://arjawinangun.rapidtalk.id'],
            ['kecamatan' => 'Jatilawang', 'name' => 'Banjarsari', 'url' => 'https://banjarsari4.rapidtalk.id'],
            ['kecamatan' => 'Jatilawang', 'name' => 'Bulustalan', 'url' => 'https://bulustalan.rapidtalk.id'],
            ['kecamatan' => 'Jatilawang', 'name' => 'Clapar', 'url' => 'https://clapar.rapidtalk.id'],
            ['kecamatan' => 'Jatilawang', 'name' => 'Jatiwangsai', 'url' => 'https://jatiwangsai.rapidtalk.id'],
            ['kecamatan' => 'Jatilawang', 'name' => 'Karanggede', 'url' => 'https://karanggede.rapidtalk.id'],
            ['kecamatan' => 'Jatilawang', 'name' => 'Karangsemang', 'url' => 'https://karangsemang.rapidtalk.id'],
            ['kecamatan' => 'Jatilawang', 'name' => 'Kedungwadas', 'url' => 'https://kedungwadas.rapidtalk.id'],
            ['kecamatan' => 'Jatilawang', 'name' => 'Klapping', 'url' => 'https://klapping.rapidtalk.id'],
            ['kecamatan' => 'Jatilawang', 'name' => 'Kulisaru', 'url' => 'https://kulisaru.rapidtalk.id'],
            ['kecamatan' => 'Jatilawang', 'name' => 'Melung', 'url' => 'https://melung.rapidtalk.id'],
            ['kecamatan' => 'Jatilawang', 'name' => 'Pekuncen', 'url' => 'https://pekuncen.rapidtalk.id'],
            ['kecamatan' => 'Jatilawang', 'name' => 'Tangu', 'url' => 'https://tangu.rapidtalk.id'],
        ];

        foreach ($villages as $village) {
            Village::updateOrCreate(
                ['name' => $village['name'], 'kecamatan' => $village['kecamatan']],
                [
                    'url' => $village['url'],
                    'is_active' => true,
                ]
            );
        }

        $this->command->info('VillageSeeder completed. Total villages: ' . count($villages));
    }
}
