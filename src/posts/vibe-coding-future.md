---
title: "Dari GUI ke Terminal: Perubahan Workflow dan Manfaatnya"
date: 2026-02-21
thumbnail: https://sanrui.id/wp-content/uploads/2025/04/image-4.png?w=1024
excerpt: Sejarah Singkat Kenapa Sekarang Saya Pakai Terminal untuk Kebutuhan Kerja
---
## Dari GUI ke Terminal: Perubahan Workflow dan Manfaatnya


![](https://sanrui.id/wp-content/uploads/2025/04/image-4.png?w=1024)

**Sejarah Singkat Kenapa Sekarang Saya Pakai Terminal untuk Kebutuhan Kerja**

Awal mula saya mengenal terminal adalah saat pertama kali menggunakan **GNU/Linux**. Di sana, hampir semua konfigurasi sistem operasi, instalasi paket, hingga troubleshooting dilakukan melalui terminal. Mau tidak mau, saya pun dipaksa untuk menggunakannya, terutama saat menghadapi kendala seperti **kernel panic** saat booting. Dari situ, saya mulai tertarik untuk mengoprek berbagai **desktop environment (DE)**, mencoba berbagai distro, dan semakin akrab dengan terminal.

Saat masuk ke dunia kerja sebagai **praktisi data (Data Support)**, hampir semua tools yang saya gunakan berbasis GUI. Namun, suatu hari saya melihat seseorang bekerja dengan terminal—bukan hanya menggunakannya untuk menjalankan perintah, tetapi juga mengustomisasi tampilannya dengan sangat keren. Awalnya saya berpikir bahwa terminal hanya digunakan oleh **DevOps engineer** untuk memantau server dan melakukan administrasi sistem.

Ternyata saya salah. Bahkan seorang programmer dan **data support** seperti saya bisa sangat terbantu dengan terminal. Meskipun tidak semua tools yang saya gunakan memiliki versi **TUI (Text-based User Interface)** atau CLI (Command Line Interface)—contohnya **Excel, Power BI, dan DataGrip**—banyak workflow lain yang bisa lebih cepat dan efisien dilakukan melalui terminal. (Mungkin ada yang tahu alternatif CLI untuk tools tersebut? Boleh share!)

**Eksplorasi Terminal: Dari iseng jadi kebiasaan**

Suatu hari, saya menemukan sebuah channel YouTube yang membahas cara membuat tampilan terminal **macOS** lebih menarik. Awalnya saya hanya iseng menonton, tapi akhirnya saya tergoda untuk mencoba sendiri. Saya mengikuti tutorialnya dan menginstal **iTerm2** serta **Powerlevel10k (p10k)**.

![](https://sanrui.id/wp-content/uploads/2025/04/image.png?w=1024)

Lucunya, setelah saya selesai mengatur semuanya, si pemilik channel malah mengganti terminalnya dengan **WezTerm**—dan tentu saja, saya ikut mencobanya juga. Tidak berhenti di situ, saya juga akhirnya menginstal **tmux**, meskipun awalnya saya tidak paham fungsi utamanya. Saya hanya tertarik karena tampilannya terlihat keren saat dipadukan dengan **p10k** yang sudah saya pakai.

![](https://sanrui.id/wp-content/uploads/2025/04/image-1.png?w=1024)

**Dari Asik Oprek Terminal, Berlanjut ke Neovim**

Dari keasikan ngulik terminal, entah kenapa tiba-tiba saya kepikiran untuk menginstal **Neovim**. Padahal sebelumnya saya **tidak pernah pakai Vim** sama sekali. Kalau butuh edit file di terminal, saya biasanya pakai **Nano**, karena saya merasa **key bindings Vim terlalu ribet**.

Saya mulai nonton video tutorial cara instalasi **Neovim** beserta semua pluginnya. Tapi setelah beberapa saat, saya nyerah. Setup-nya terlalu ribet. Saya hampir meninggalkan Neovim sampai akhirnya saya menemukan **LazyVim**—distro Neovim yang sudah dikonfigurasi siap pakai.

LazyVim ini cukup **clone dari Git**, lalu semua sudah beres. Tidak perlu repot-repot setting satu per satu. Plugin-plugin utama sudah tersedia, kita tinggal memilih di **Lazy Extra**. Meski tidak semua plugin tersedia, setidaknya banyak yang sudah terintegrasi, termasuk **Lualine** untuk status bar.

![](https://sanrui.id/wp-content/uploads/2025/04/image-2.png?w=1024)

---

**Mencoba Tmux Lagi (dan Akhirnya Tetap Pakai)**

Sebelumnya, saya sempat berpikir: _Untuk apa pakai Tmux?_ Saya kira **Tmux hanyalah terminal yang berjalan di atas terminal lain**. Saya tidak punya kebutuhan untuk memantau server secara real-time, jadi setelah mencoba sebentar, saya langsung **uninstall**.

Tapi, seperti biasa, kebiasaan oprek di Linux itu susah hilang. Saya penasaran:

![](https://sanrui.id/wp-content/uploads/2025/04/image-3.png?w=1024)

**Kenapa banyak orang tetap pakai Tmux?**

Akhirnya, saya mencari tahu lebih dalam.

Saya menemukan satu channel YouTube yang menjelaskan **Tmux dengan sangat detail**. Dia pakai **tema Catppuccin**, status barnya keren banget, dan dia menjelaskan satu per satu fitur penting seperti:

- **Session** → Bisa menyimpan sesi kerja, jadi kalau terminal tertutup, sesi tetap bisa dilanjutkan.
- **Windows** → Satu sesi bisa punya banyak jendela terminal.
- **Pane** → Satu jendela bisa dibagi jadi beberapa panel, jadi bisa multitasking lebih nyaman.

Dari sini, saya mulai sadar **pentingnya workflow di terminal**. Saya pun mulai memindahkan beberapa tools kerja saya dari GUI ke terminal:

|**GUI Tools**|**Terminal Alternative**|
|---|---|
|**Postman**|posting|
|**PyCharm**|nvim|
|**Finder**|spf, yazi|
|**Termius**|ssh|
|**GitHub**|lazygit|

Tapi tentu tidak semuanya bisa saya pindahkan. **Excel, Tableau, dan DataGrip** masih tetap saya gunakan dalam bentuk GUI karena belum menemukan alternatif yang lebih efisien di terminal.

---

**Berapa Lama Sampai Saya Terbiasa dengan Terminal?**

Kurang lebih **1–2 bulan** sampai saya bisa benar-benar menggunakan terminal untuk bekerja. Bagian yang **paling lama** justru **konfigurasi**.

1. **WezTerm + Powerlevel10k (P10K)**

- Setup awal cukup mudah karena ada wizard setup-nya.
- Tapi konfigurasi **WezTerm** pakai **Lua**, jadi saya perlu banyak ngulik dan comot dotfiles dari berbagai sumber.
- Dari tema transparan, ganti warna, sampai akhirnya tetap kembali ke **setelan standar**… cuma tanpa tombol close aja. 

1. **Dari P10K ke Starship**

- Saya coba ganti dari **Powerlevel10k ke Starship**, ternyata jauh lebih fleksibel.
- Bisa custom **bentuk prompt**, dari **sharp, round**, sampai custom icon bahasa pemrograman.
- Bisa atur **urutan tampilan** (misalnya: icon > directory > Python version).
- Bisa kasih **nama custom**, saya pakai _“ramen lover”_, terinspirasi dari YouTuber _Fake Ramen_.

Tapi akhirnya… saya tetap kembali ke **setup minimalis** karena sekarang sudah pakai **Tmux**. Hahaha. 

---

**Manfaat dari Oprek Terminal**

Dengan **Tmux**, saya bisa membuat banyak **window** sesuai dengan fokus kerja saya:

- **Satu window untuk Neovim** → Coding Python.
- **Satu window untuk monitoring server** → Menjalankan script Python yang memantau proses tertentu.
- **Satu window untuk LazyGit** → Staging dan commit kode ke repo.
- **Satu window untuk SPf atau Yazi** → Manajemen file yang cepat tanpa GUI.

Workflow ini **beneran meningkatkan produktivitas**. Saya bisa multitasking tanpa harus bolak-balik pakai mouse atau buka banyak tab di GUI.

---

**Dari Mager ke Terbiasa Pakai Command Line**

Sebelumnya, saya **males banget** pakai command line seperti:

|   |   |
|---|---|
|1|`cd, ls, ll, lt, rm, rm -rf, mv, cp, dan lain-lain.`|

Tapi setelah terbiasa di terminal, **perintah-perintah ini jadi refleks**.

Di sinilah saya sadar bahwa saya **berubah menjadi keyboard-centric user**.

---

**Menjadi Keyboard-Centric User**

Setelah terbiasa di terminal, saya mulai mencari **cara agar lebih cepat bekerja tanpa mouse**. Saya jadi **pelajarin shortcut di setiap aplikasi**. Sampai akhirnya saya menemukan **Homerow**, aplikasi yang bikin navigasi macOS lebih cepat tanpa harus pakai trackpad atau mouse.

![](https://sanrui.id/wp-content/uploads/2025/04/image-6.png?w=1024)

Hasilnya?

 **Lebih efisien** → Semua bisa diakses dari keyboard.

 **Lebih nyaman** → Tidak perlu angkat tangan ke mouse setiap saat.

 **Lebih cepat** → Workflow jadi lebih streamlined.

Walaupun begitu, kalau ada **kerjaan dadakan dan harus cepat**, ya tetap pakai **touchpad** sih. **Hahaha.** 

---

Sekarang workflow saya benar-benar **berpusat di terminal**. Saya makin yakin bahwa terminal bukan cuma untuk DevOps atau SysAdmin, tapi juga sangat berguna buat **developer, data support, dan siapa pun yang ingin bekerja lebih cepat**.

Setelah beberapa bulan eksplorasi dan trial-error, gue sadar ada **beberapa pelajaran penting** dari perjalanan ini:

**1. Semua Butuh Waktu dan Adaptasi**

Dulu gue ngeliat orang pakai terminal kayak **hacker di film**, kelihatan keren tapi kayaknya ribet. Sekarang? **Gue gak bisa kerja tanpa terminal.**

Intinya, kalau ada sesuatu yang baru dan kelihatan susah di awal, **bukan berarti gak bisa dipelajari**. Semua butuh waktu buat adaptasi. **Yang penting ATM (Amati, Tiru, Modifikasi).**

---

**2. Workflow Itu Personal, Gak Ada yang Mutlak**

Dulu gue pikir:

> **“Terminal itu buat DevOps doang.”**

Ternyata? **Enggak!**

Gue nemuin **cara kerja yang paling cocok buat gue sendiri**.

Beberapa orang nyaman pakai GUI, ada yang suka terminal, ada yang campur. Yang penting adalah **cari workflow yang bikin kita lebih produktif**, bukan sekadar ikut tren.

---

**3. Oprek Itu Bukan Cuma Buat Gaya-Gayaan, Tapi Soal Efisiensi**

Banyak yang nanya:

> **“Kenapa sih harus ribet pakai terminal?”**

Jawabannya? **Efisiensi.**

- **Buka aplikasi?** Bisa langsung dari keyboard.
- **Bikin kode?** Bisa langsung di terminal pakai Neovim.
- **Navigasi file?** Bisa pakai Yazi/SPF tanpa buka Finder.
- **Monitor server atau running script?** Bisa langsung di Tmux tanpa tab-tab berantakan.

Sekali kita paham konsepnya, **kerja jadi lebih cepat dan seamless**.

---

**4. Semakin Dalam Ngulik, Semakin Paham Konsep Dasar Teknologi**

Selama ngulik terminal, gue gak cuma belajar tools, tapi juga **paham lebih dalam cara kerja OS, shell, scripting, bahkan network.**

Dari awalnya cuma pakai terminal buat **install paket**, sampai akhirnya ngerti:

- **Kenapa file permission penting?**
- **Apa bedanya shell seperti Bash, Zsh, Fish?**
- **Gimana cara kerja SSH, alias, environment variables?**

Dan ini beneran bikin gue **lebih pede dalam troubleshooting dan eksplorasi teknologi.**

---

**Kesimpulan: Oprek Terminal Itu Investasi Jangka Panjang**

Gue gak bilang **harus semua orang pindah ke terminal**. Tapi kalau lo banyak kerja di komputer, **coba kasih kesempatan buat eksplorasi keyboard-centric workflow**.

Kenapa?

 **Meningkatkan efisiensi kerja.**

 **Memperdalam pemahaman tentang teknologi.**

 **Membantu troubleshoot masalah dengan lebih cepat.**

 **Membuka kemungkinan eksplorasi lebih jauh (scripting, automation, dll).**

Dan yang paling penting: **Jangan takut nyoba!**