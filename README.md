# Website Portofolio

Website portofolio satu halaman untuk IT Engineer, IT Infrastruktur, dan Network Engineer.
Dibuat dengan HTML, CSS, dan JavaScript biasa. Tidak butuh instalasi atau build.

## Isi halaman

Beranda, Tentang, Keahlian, Proyek, Pengalaman, Sertifikasi, Pendidikan, Kontak, dan tombol Unduh CV.

Fitur:
- Tema terang dan gelap: mengikuti pengaturan perangkat, bisa diganti lewat tombol (dengan efek lingkaran), pilihan diingat
- Empat warna aksen (Aurora, Zamrud, Senja, Azure) lewat tombol bulat di header
- Palet perintah: tekan Ctrl + K (Cmd + K di Mac) untuk lompat ke section, ganti tema, salin email, atau unduh CV
- Teks peran yang mengetik, kartu terminal, dan penghitung angka di bagian atas
- Bar kemampuan pada Keahlian, cincin IPK pada Pendidikan, garis waktu pada Pengalaman
- Saringan proyek berdasarkan topik, dan jendela detail untuk proyek serta sertifikat
- Diagram jalur jaringan interaktif, marquee keahlian, cahaya kartu yang mengikuti kursor
- Animasi muncul saat scroll, garis kemajuan, penanda section aktif, tombol ke atas
- Salin kontak dengan notifikasi, form pesan yang membuka aplikasi email
- Menghormati pengaturan "kurangi gerakan" dan tampilan cetak yang rapi

## Struktur folder

```
portofolio/
├── index.html            Kerangka halaman
├── css/
│   ├── tokens.css        Warna dan font (ubah tampilan dari sini)
│   ├── base.css          Reset, tipografi, tombol
│   ├── layout.css        Header, hero, jalur jaringan, footer
│   └── sections.css      Isi tiap section dan jendela detail
├── js/
│   ├── data.js           ISI PORTOFOLIO ANDA (file yang paling sering diubah)
│   ├── art.js            Ilustrasi pengganti foto dan ikon
│   ├── render.js         Mengubah data menjadi isi halaman
│   └── main.js           Interaksi (tema, menu, jendela detail, dan lainnya)
└── assets/
    ├── favicon.svg
    ├── img/              Foto profil, foto proyek, sertifikat
    └── cv/               File CV (PDF)
```

## Cara mengisi data

1. Buka `js/data.js` dengan editor teks (Notepad, VS Code, dan sebagainya).
2. Ganti teks di dalam tanda kutip. Bagian contoh ditandai `[ ]` atau `20XX`.
3. Yang perlu Anda isi: nama, periode magang dan kuliah, tahun pelatihan, email, WhatsApp, LinkedIn, GitHub.
4. Simpan file, lalu buka atau muat ulang `index.html` di browser.

Untuk menambah proyek, salin satu blok `{ ... }` di dalam `projects` lalu ubah isinya.
Cara yang sama berlaku untuk pengalaman, sertifikasi, dan keahlian.

## Bar kemampuan

Di `js/data.js`, item keahlian boleh berbentuk `{ name: "Splicing", level: 75 }`. Angka `level` yang ada sekarang hanya contoh;
sesuaikan dengan kemampuan Anda, atau tulis item sebagai teks biasa agar tampil sebagai label tanpa bar.

## Foto dan CV

- Foto profil: simpan sebagai `assets/img/foto-profil.jpg`.
- Foto proyek dan sertifikat: lihat daftar nama file di `assets/img/README.txt`.
- CV: simpan sebagai `assets/cv/CV-Nama-Anda.pdf`.

Selama file belum ada, halaman menampilkan inisial atau ilustrasi, jadi tampilan tidak rusak.

## Mengubah tampilan

Buka `css/tokens.css`. Di sana ada warna untuk tema terang dan gelap, empat set warna aksen (`--a1` dan `--a2` membentuk gradasi), dan font.
Untuk menambah pilihan aksen, tambahkan blok `data-accent` baru di tokens.css dan satu entri di daftar `ACCENTS` pada `js/main.js`.

## Menjalankan di komputer

Cukup klik dua kali `index.html`. Font memakai Google Fonts, jadi butuh internet agar tampil sesuai desain.
Tanpa internet, halaman memakai font bawaan sistem.

## Menayangkan di internet

Semua layanan di bawah ini gratis untuk situs statis:

- **GitHub Pages**: unggah folder ke repository, lalu aktifkan Pages di Settings.
- **Netlify**: tarik dan lepas folder `portofolio` ke app.netlify.com/drop.
- **Vercel** atau **Cloudflare Pages**: hubungkan repository, tanpa perintah build.

Setelah tayang, ubah `<title>` dan teks `og:title` di `index.html` dengan nama Anda
supaya tampilan saat tautan dibagikan sesuai.

## Catatan

Kode warna serat optik di bagian footer mengikuti standar TIA-598.
Isian IPK, jabatan, dan tugas magang sudah memakai data yang Anda berikan; periksa kembali sebelum dipublikasikan.
