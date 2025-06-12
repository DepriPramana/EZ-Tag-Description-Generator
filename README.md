# **EZ Tag & Description Generator (Chrome Extension)**

**EZ Tag & Description Generator** adalah ekstensi Chrome yang dirancang untuk membantu para kreator konten YouTube mempercepat proses optimasi video mereka. Dengan memanfaatkan kekuatan AI dari Google Gemini, ekstensi ini dapat menghasilkan rekomendasi tag yang relevan dan draf deskripsi video yang SEO-friendly hanya dengan satu klik.

## **✨ Fitur Utama**

* **Rekomendasi Tag Cerdas**: Dapatkan daftar tag yang relevan dengan skor popularitas untuk memaksimalkan jangkauan video Anda.  
* **Generator Deskripsi Otomatis**: Buat draf deskripsi video yang menarik dan mengandung kata kunci utama Anda secara otomatis.  
* **Dukungan Multi-bahasa**: Hasilkan konten dalam Bahasa Indonesia atau Inggris sesuai kebutuhan audiens Anda.  
* **Pengurutan Fleksibel**: Urutkan tag yang dihasilkan berdasarkan relevansi atau urutan alfabet.  
* **Antarmuka Praktis**: Akses semua fitur langsung dari browser Anda saat Anda paling membutuhkannya.  
* **Salin dengan Mudah**: Salin semua tag atau deskripsi yang dihasilkan ke clipboard dengan satu klik.

## **📂 Struktur File Proyek**

Berikut adalah penjelasan singkat tentang file-file utama dalam proyek ini:

* manifest.json: File konfigurasi inti yang memberi tahu Chrome cara kerja ekstensi.  
* popup.html: Mendefinisikan struktur antarmuka pengguna yang muncul saat ikon ekstensi diklik.  
* popup.js: Berisi semua logika utama, termasuk interaksi pengguna, panggilan ke API Gemini, dan menampilkan hasil.  
* options.html: Halaman untuk pengguna memasukkan dan menyimpan API Key mereka.  
* options.js: Logika untuk menyimpan dan mengambil API Key dari penyimpanan Chrome.  
* tailwind.css: File CSS yang berisi semua gaya dari Tailwind CSS untuk memastikan tampilan yang konsisten.  
* background.js: Skrip latar belakang untuk menangani tugas-tugas seperti membuka halaman opsi.  
* icons/: Folder yang berisi ikon ekstensi dalam berbagai ukuran.

## **🚀 Panduan Instalasi & Penggunaan**

Untuk menjalankan ekstensi ini di browser Anda, ikuti langkah-langkah berikut:

### **Langkah 1: Dapatkan Google Gemini API Key**

Sebelum memulai, Anda memerlukan API Key dari Google untuk mengakses model AI.

1. Kunjungi [**Google AI Studio**](https://aistudio.google.com/app/apikey).  
2. Login dengan akun Google Anda.  
3. Klik tombol **"Create API key in new project"**.  
4. Sebuah API Key akan dibuat. **Salin (copy)** key tersebut. Simpan baik-baik karena ini adalah kunci akses Anda.

### **Langkah 2: Instal Ekstensi Secara Lokal**

1. Unduh atau kloning repositori ini ke komputer Anda.  
2. Buka Google Chrome, ketik chrome://extensions di address bar, lalu tekan Enter.  
3. Di pojok kanan atas, aktifkan **"Developer mode"** (Mode Pengembang).  
4. Klik tombol **"Load unpacked"** (Muat yang belum dipaket).  
5. Pilih folder tempat Anda menyimpan file-file ekstensi ini.

Ekstensi sekarang akan muncul di daftar Anda dan ikonnya akan terlihat di toolbar browser.

### **Langkah 3: Atur API Key**

1. Klik kanan pada ikon ekstensi di toolbar, lalu pilih **"Options"** (Opsi).  
2. Tempel (paste) Gemini API Key yang telah Anda salin sebelumnya ke dalam kolom yang tersedia.  
3. Klik **"Save Key"**.

### **Langkah 4: Mulai Gunakan\!**

Sekarang Anda siap\! Klik ikon ekstensi, masukkan kata kunci utama untuk video Anda, pilih bahasa, dan klik **"Generate"** untuk melihat keajaibannya.

## **🤝 Kontribusi**

Merasa ada yang bisa ditingkatkan? Jangan ragu untuk membuat *fork* dari repositori ini, lakukan perubahan, dan kirimkan *Pull Request*. Semua kontribusi sangat kami hargai\!

1. Fork proyek ini.  
2. Buat branch fitur baru (git checkout \-b feature/AmazingFeature).  
3. Commit perubahan Anda (git commit \-m 'Add some AmazingFeature').  
4. Push ke branch (git push origin feature/AmazingFeature).  
5. Buka Pull Request.

## **📄 Lisensi**

Didistribusikan di bawah Lisensi MIT. Lihat LICENSE untuk informasi lebih lanjut.
