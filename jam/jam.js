function updateJam() {
  const waktuSekarang = new Date(); // Mengambil data waktu real-time dari sistem

  // 1. AMBIL DATA JAM, MENIT, DETIK
  let jam = waktuSekarang.getHours();
  let menit = waktuSekarang.getMinutes();
  let detik = waktuSekarang.getSeconds();

  // Biar angka ada 0 di depan kalau satuan (contoh: 09:05:01)
  jam = jam < 10 ? "0" + jam : jam;
  menit = menit < 10 ? "0" + menit : menit;
  detik = detik < 10 ? "0" + detik : detik;

  // Masukkan format jam ke elemen HTML id="clock"
  document.getElementById("clock").innerText = `${jam}:${menit}:${detik}`;

  // 2. LOGIKA PENYAPA OTOMATIS (GREETINGS)
  let sapaan = "";
  if (jam >= 5 && jam < 11) {
    sapaan = "Selamat Pagi ✨";
  } else if (jam >= 11 && jam < 15) {
    sapaan = "Selamat Siang ☀️";
  } else if (jam >= 15 && jam < 18) {
    sapaan = "Selamat Sore 🌅";
  } else {
    sapaan = "Selamat Malam 🌙";
  }
  document.getElementById("greetings").innerText = sapaan;

  // 3. TAMPILKAN TANGGAL BAHASA INDONESIA
  const daftarHari = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  const daftarBulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  let hari = daftarHari[waktuSekarang.getDay()];
  let tanggal = waktuSekarang.getDate();
  let bulan = daftarBulan[waktuSekarang.getMonth()];
  let tahun = waktuSekarang.getFullYear();

  document.getElementById("date").innerText =
    `${hari}, ${tanggal} ${bulan} ${tahun}`;
}

// Jalankan fungsi updateJam pertama kali saat halaman dibuka
updateJam();

// Jalankan fungsi updateJam secara terus-menerus setiap 1 detik (1000 milidetik)
setInterval(updateJam, 1000);
