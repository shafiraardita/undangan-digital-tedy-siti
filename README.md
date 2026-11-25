# Digital Wedding Invitation — Pride & Prejudice inspired

Starter website undangan digital Tedy Wahyudi & Siti Hamimah. Dibuat dengan HTML, CSS, JavaScript, Google Sheets + Apps Script, dan siap di-deploy ke Vercel.

## 1. Pasang aset
Letakkan file berikut di folder `assets/` (gunakan nama file persis):
- `intro.jpg` — foto/ilustrasi sampul (gambar referensi pertama)
- `verse.jpg` — latar QS. Ar-Rum ayat 21 (gambar kedua)
- `groom.jpg` — foto Tedy (gambar ketiga)
- `bride.jpg` — foto Siti (gambar keempat)
- `events.jpg` — latar detail acara (gambar kelima)
- `rsvp.jpg` — latar RSVP (gambar keenam)
- `closing.jpg` — latar halaman terakhir (gambar ketujuh)
- `countdown.jpg` — latar countdown (gambar kedelapan)
- `background-song.mp3` — musik latar

Pada `style.css`, tambahkan gambar sebagai `background-image` di `.intro-photo`, `.verse-section`, `.countdown`, `.events`, `.rsvp`, dan `.closing`. Contoh:
`background-image:url("assets/intro.jpg")`.
Atur `background-position` agar komposisi foto sesuai. Gambar kedelapan dipakai pada bagian countdown.

## 2. Ubah detail pasangan dan acara
Edit objek `WEDDING` di bagian atas `script.js`:
- Nama pasangan dan nama orang tua
- Venue, jam, dan tautan Google Maps untuk kedua acara
- `isoDate` untuk tanggal/jam countdown (format ISO dengan zona waktu +07:00)
- URL Web App Google Apps Script

Nama tamu otomatis bisa dipersonalisasi lewat tautan:
`https://alamat-undangan.vercel.app/?to=Nama%20Tamu`
Contoh: `?to=Bapak%20Andi%20dan%20Keluarga`. Parameter `to` mengisi nama di sampul dan otomatis mengisi kolom nama RSVP. Buat tautan berbeda untuk tiap tamu.

## 3. Sambungkan Google Spreadsheet
1. Buat spreadsheet, salin ID-nya dari URL.
2. Buka Extensions > Apps Script, tempel isi `google-apps-script.gs`.
3. Ganti `PASTE_SPREADSHEET_ID_HERE`.
4. Deploy > New deployment > Web app.
5. Execute as: Me; Who has access: Anyone. Deploy dan izinkan akses.
6. Salin URL Web App berakhiran `/exec` ke `appsScriptUrl` pada `script.js`.

Kolom spreadsheet otomatis dibuat: Timestamp, Name, Attendance, Total Pax. Nilai Attendance tersimpan sebagai `Yes` atau `No`, dan Total Pax sebagai 1, 2, atau 3.

Catatan: halaman menggunakan `fetch` mode `no-cors` agar dapat mengirim ke Apps Script tanpa preflight browser. Karena respons tidak dapat dibaca oleh browser, pesan sukses berarti permintaan sudah dikirim, bukan verifikasi pembacaan spreadsheet. Uji satu RSVP dan pastikan baris masuk ke sheet.

## 4. Jalankan dan deploy
- Buka folder ini di TextMate atau editor teks pilihan.
- Tes lokal: jalankan server statis dari folder project, misalnya `python -m http.server 8000`, lalu buka `http://localhost:8000`.
- Deploy Vercel: push folder project ke GitHub, lalu di Vercel pilih Add New > Project, import repository, Framework Preset: Other, Build Command kosong, Output Directory `.`. Deploy.
- Setelah deploy, uji tautan personal `?to=Nama%20Tamu`, buka amplop, musik, countdown, link peta, dan kirim RSVP.

## 5. Arah desain
Palet warna: ivory, soft pink, butter yellow, forest green. Tipografi editorial serif dan script, ornamen romantis, komposisi klasik terinspirasi era Regency / Pride & Prejudice.
