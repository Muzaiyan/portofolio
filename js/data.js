/* ==========================================================
   DATA PORTOFOLIO
   Hampir semua isi halaman ada di file ini. Ubah teks di dalam
   tanda kutip, simpan, lalu muat ulang index.html.
   Bagian yang masih contoh ditandai [ ] atau 20XX.
   ========================================================== */
window.PORTFOLIO = {

  /* ----- Identitas ----- */
  name: "Muhammad Muzaiyan",
  photo: "assets/img/foto ijazah.jpeg",     // letakkan foto di folder assets/img. Jika file tidak ada, tampil inisial.
  status: "Tersedia untuk peluang kerja",
  roles: ["IT Engineer", "IT Infrastruktur", "Network Engineer"],
  intro: "Fresh Graduate D4 Teknologi Rekayasa Komputer Jaringan Politeknik Negeri Lhokseumawe. Memiliki minat dan kompetensi di bidang IT Engineering, khususnya Routing & Switching (TCP/IP, IPv4/Subnetting, VLAN, Static Routing, OSPF, NAT, DHCP, dan DNS), IT Infrastructure (LAN/WAN, Fiber Optic, LAN Cabling, dan Network Topology Design), Server Administration (Linux Server, Windows Server, Apache, SSH, dan server monitoring), serta Cyber Security (Firewall, UFW, SSH Security, Log Monitoring dan Network Security)",
  cv: "assets/cv/CV Muhammad Muzaiyan IT Engineer.pdf",         // letakkan PDF di folder assets/cv, atau isi dengan tautan Google Drive

  /* ----- Menu navigasi ----- */
  nav: [
    { id: "tentang",     label: "Tentang" },
    { id: "keahlian",    label: "Keahlian" },
    { id: "proyek",      label: "Proyek" },
    { id: "pengalaman",  label: "Pengalaman" },
    { id: "sertifikasi", label: "Sertifikasi" },
    { id: "pendidikan",  label: "Pendidikan" },
    { id: "kontak",      label: "Kontak" }
  ],

  /* ----- Diagram jalur jaringan di bagian atas -----
     type: isp | switch | client
     links: jenis kabel antar perangkat, jumlahnya harus satu lebih sedikit dari jumlah perangkat (fiber | utp) */
  topology: {
    hint: "Pilih salah satu perangkat untuk melihat peran saya di bagian itu.",
    nodes: [
      { type: "isp",    label: "ISP",             note: "Titik masuk jaringan dari penyedia layanan internet." },
      { type: "switch", label: "Core switch",     note: "Konfigurasi perangkat jaringan dan pemeriksaan switch yang bermasalah." },
      { type: "switch", label: "Distribusi",      note: "Instalasi dan splicing fiber optik pada jalur penghubung antar perangkat." },
      { type: "switch", label: "Access switch",   note: "Troubleshooting switch dan pembuatan kabel LAN ke perangkat pengguna." },
      { type: "client", label: "Perangkat klien", note: "Troubleshooting komputer pengguna." }
    ],
    links: ["fiber", "fiber", "utp", "utp"]
  },

  /* ----- Tentang ----- */
  about: [
    "D4 Teknologi Rekayasa Komputer Jaringan di Politeknik Negeri Lhokseumawe dengan IPK 3,73.",
    "Memiliki pengalaman magang di PT Pupuk Iskandar Muda pada bidang IT Infrastruktur, dengan tanggung jawab meliputi instalasi dan penarikan kabel Fiber Optic untuk mendukung konektivitas jaringan antar-gedung, penyambungan (splicing) dan pengujian kualitas sambungan fiber optik, serta crimping kabel LAN. Turut membantu konfigurasi perangkat jaringan, melakukan troubleshooting pada jaringan fiber optik, komputer, dan switch, serta menyusun dokumentasi dan laporan kegiatan proyek infrastruktur IT",
    "Memiliki sertifikasi BNSP Junior Network Administrator."
  ],
  facts: [
    { k: "Fokus",      v: "IT infrastruktur dan jaringan" },
    { k: "Pendidikan", v: "D4 Teknologi Rekayasa Komputer Jaringan, Politeknik Negeri Lhokseumawe" },
    { k: "Magang",     v: "IT Infrastruktur, PT Pupuk Iskandar Muda" },
    { k: "Pelatihan",  v: "BNSP Junior Network Administrator" }
  ],

  /* ----- Keahlian -----
     icon: fiber | network | doc
     Setiap item boleh berupa teks biasa ("Instalasi") atau { name, level }.
     level adalah angka 0-100 untuk bar kemampuan. Angka di bawah hanya CONTOH,
     sesuaikan dengan kemampuan Anda yang sebenarnya, atau hapus "level" agar tampil sebagai label biasa. */
  technical: [
  {
    group: "IT Engineering",
    icon: "monitor",
    items: [
      { name: "IT Support & Maintenance", level: 85 },
      { name: "Hardware & Software Troubleshooting", level: 85 },
      { name: "IT Infrastructure Management", level: 80 },
      { name: "System Monitoring", level: 75 }
    ]
  },
  {
    group: "Network Engineering",
    icon: "network",
    items: [
      { name: "TCP/IP & IPv4/Subnetting", level: 85 },
      { name: "VLAN & Static Routing", level: 80 },
      { name: "OSPF & NAT", level: 70 },
      { name: "DHCP & DNS", level: 80 },
      { name: "Router & Switch Configuration", level: 80 }
    ]
  },
  {
    group: "IT Infrastructure",
    icon: "fiber",
    items: [
      { name: "LAN/WAN", level: 85 },
      { name: "Fiber Optic Installation & Splicing", level: 85 },
      { name: "LAN Cabling & Crimping", level: 90 },
      { name: "Network Topology Design", level: 80 }
    ]
  },
  {
    group: "Server Administration",
    icon: "server",
    items: [
      { name: "Linux Server", level: 75 },
      { name: "Windows Server", level: 70 },
      { name: "Apache Web Server", level: 75 },
      { name: "SSH & Server Monitoring", level: 80 }
    ]
  },
  {
    group: "Cyber Security",
    icon: "shield",
    items: [
      { name: "Firewall & UFW", level: 85 },
      { name: "SSH Security", level: 80 },
      { name: "Log Monitoring", level: 85 },
      { name: "IDS & IPS", level: 80 },
      { name: "Network Security", level: 75 }
    ]
  },
  {
    group: "Dokumentasi & Laporan Proyek",
    icon: "doc",
    items: [
      { name: "Dokumentasi Kegiatan Proyek", level: 90 },
      { name: "Penyusunan Laporan Teknis", level: 85 },
      { name: "Dokumentasi Instalasi & Konfigurasi", level: 85 },
      { name: "Analisis Hasil Pengujian", level: 80 }
    ]
  }
],
  soft: [
    { title: "Komunikasi",         text: "Menyampaikan kendala teknis dengan bahasa yang mudah dipahami tim dan pengguna." },
    { title: "Kerja tim",          text: "Terbiasa bekerja bersama tim infrastruktur dalam pekerjaan lapangan." },
    { title: "Ketelitian",         text: "Mencatat setiap kegiatan proyek dalam laporan yang rapi dan bisa ditelusuri." },
    { title: "Pemecahan masalah",  text: "Menelusuri gangguan fiber optik, komputer, dan switch langkah demi langkah." }
  ],

  /* ----- Proyek -----
     image: foto dokumentasi (misal "assets/img/proyek-fiber.jpg"). Jika file tidak ada, tampil ilustrasi.
     art: fiber | lan | switch (ilustrasi pengganti) */
  projects: [
    {
      context: "Magang, PT Pupuk Iskandar Muda",
      title: "Instalasi dan splicing fiber optik",
      text: "Memasang kabel fiber optik dan menyambung serat dengan splicing. Saya juga menelusuri gangguan pada jalur fiber ketika koneksi bermasalah.",
      details: ["Memasang kabel fiber optik", "Menyambung serat dengan splicing", "Menelusuri gangguan pada jalur fiber"],
      tags: ["Fiber optik", "Splicing", "Troubleshooting"],
      art: "fiber", image: "assets/img/1.jpeg", link: ""
    },
    {
      context: "Magang, PT Pupuk Iskandar Muda",
      title: "Crimping kabel LAN",
      text: "Membuat kabel LAN dengan crimping konektor untuk menghubungkan perangkat di lokasi kerja.",
      details: ["Menyusun urutan warna kabel sebelum crimping", "Crimping konektor pada kabel LAN", "Memasang kabel ke perangkat di lokasi kerja"],
      tags: ["Kabel LAN", "Crimping"],
      art: "lan", image: "assets/img/6.jpeg", link: ""
    },
    {
      context: "Magang, PT Pupuk Iskandar Muda",
      title: "Troubleshooting Fiber Optik",
      text: "Trubleshooting Jaringan Fiber Optik",
      details: ["Instalasi Fiber Optik", "di Area H2 02", "Mencatat hasilnya dalam laporan kegiatan proyek"],
      tags: ["Fiber optik","Laporan proyek"],
      art: "Fiber optik", image: "assets/img/2.jpeg", link: ""
    },
    {
      context: "Magang, PT Pupuk Iskandar Muda",
      title: "Konfigurasi dan perawatan perangkat jaringan",
      text: "Memeriksa switch yang bermasalah, lalu mencatat hasilnya dalam laporan kegiatan.",
      details: ["Troubleshooting Switch"],
      tags: ["Switch"],
      art: "switch", image: "assets/img/5.jpeg", link: ""
    },
    {
      context: "Magang, PT Pupuk Iskandar Muda",
      title: "Konfigurasi dan perawatan perangkat jaringan",
      text: "Pengujian Kualitas Jaringan Menggunakan Alat OTDR.",
      details: ["Pengujian Jaringan Pada Server Menggunakan OTDR"],
      tags: ["OTDR"],
      art: "OTDR", image: "assets/img/4.jpeg", link: ""
    },
     {
      context: "Project Machine Learning",
      title: "Sistem Deteksi Jalan Rusak",
      text: "Menggunakan Yolov8.",
      details: ["Mendeteksi Kerusakan Jalan Berbasis Machine Learning di Aceh Utara"],
      tags: ["Project"],
      art: "Project", image: "assets/img/8.png", link: ""
    },
  ],

  /* ----- Pengalaman ----- */
  experience: [
    {
      role: "IT Infrastruktur (Magang)",
      company: "PT Pupuk Iskandar Muda",
      period: "3 Februari 2025 sampai 31 Juli 2025",
      points: [
        "Memasang dan menyambung (splicing) fiber optik.",
        "Membuat kabel LAN dengan crimping.",
        "Mengonfigurasi perangkat jaringan.",
        "Menyusun dokumentasi laporan kegiatan proyek.",
        "Menelusuri dan memperbaiki gangguan pada fiber optik, komputer, dan switch."
      ]
    }
  ],

  /* ----- Sertifikasi dan pelatihan -----
     image: foto atau pindaian sertifikat. Jika file tidak ada, tampil lambang. */
  certs: [
    { name: "Junior Network Administrator", issuer: "BNSP", type: "Pelatihan sertifikasi", year: "2025", image: "assets/img/sertifikat BNSP JNA.jpg", link: "" },
    { name: "Sertifikat Magang", issuer: "Pupuk Iskandar Muda", type: "Sertifikat", year: "2025", image: "assets/img/Sertifikat PIM.PNG", link: "" },
    { name: "Sertifikat Network Fundamental", issuer: "Aguna Course", type: "Sertifikat", year: "2026", image: "assets/img/Sertifikat Network Fundamental.jpg", link: "" },
    { name: "Sertifikat Linux Fundamental", issuer: "Aguna Course", type: "Sertifikat", year: "2026", image: "assets/img/LINUX.jpg", link: "" },
    { name: "Sertifikat Soft Skill", issuer: "Politeknik Negeri Lhokseumawe", type: "Sertifikat", year: "2026", image: "assets/img/sertifikat soft skill.jpg", link: "" },

  ],

  /* ----- Pendidikan ----- */
  education: [
    {
      school: "Politeknik Negeri Lhokseumawe",
      program: "D4 Teknologi Rekayasa Komputer Jaringan",
      period: "2022 sampai 2026",
      gpa: 3.73, gpaText: "3,73",
      scale: 4.0, scaleText: "4,00"
    }
  ],

  /* ----- Kontak ----- */
  contactLead: "Terbuka untuk peluang sebagai IT Engineer, IT Infrastruktur, atau Network Engineer. Hubungi saya lewat salah satu kanal di bawah.",
  contact: {
    email:    { text: "muzenn2004@gmail.com" },
    whatsapp: { text: "0822 6182 1928",        url: "https://wa.me/+6282261821928" },
    linkedin: { text: "linkedin.com/in/Muhammad Muzaiyan", url: "https://www.linkedin.com/in/muhammad-muzaiyan-43476724a/" },
    github:   { text: "github.com/muzaiyan",      url: "https://github.com/username" }
  }
};
