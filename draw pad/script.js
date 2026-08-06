const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d"); // Mengaktifkan mode gambar 2 Dimensi

// Mengatur ukuran kanvas otomatis mengikuti lebar dan tinggi layar browser
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Pengaturan dasar kuas gambar
ctx.lineJoin = "round"; // Sudut belokan garis menjadi bulat halus
ctx.lineCap = "round"; // Ujung garis menjadi bulat halus
ctx.lineWidth = 15; // Ketebalan kuas gambar

let isDrawing = false; // Status penanda: Apakah user sedang menekan klik mouse/layar?
let lastX = 0; // Koordinat X terakhir
let lastY = 0; // Koordinat Y terakhir
let hue = 0; // Angka warna (0 - 360) untuk menciptakan efek warna pelangi

// 1. FUNGSI UTAMA UNTUK MENGGAMBAR
function draw(e) {
  if (!isDrawing) return; // Jika tidak sambil ditekan/diklik, jangan gambar apa-apa

  // Menggunakan warna berbasis HSL (Hue, Saturation, Lightness) agar warnanya bisa berubah mengalir
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  ctx.beginPath(); // Mulai garis baru
  ctx.moveTo(lastX, lastY); // Mulai dari posisi titik terakhir
  ctx.lineTo(
    e.clientX || e.touches[0].clientX,
    e.clientY || e.touches[0].clientY,
  ); // Tarik garis ke posisi mouse/jari sekarang
  ctx.stroke(); // Gambar garisnya di layar

  // Update posisi titik terakhir sekarang
  lastX = e.clientX || e.touches[0].clientX;
  lastY = e.clientY || e.touches[0].clientY;

  // Naikkan angka warna agar berganti warna pelangi tiap bergeser
  hue++;
  if (hue >= 360) hue = 0; // Reset ke 0 kalau sudah lewat batas lingkaran warna
}

// 2. MENDENGARKAN AKSI DARI MOUSE (UNTUK LAPTOP/KOMPUTER)
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  lastX = e.clientX;
  lastY = e.clientY;
});
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

// 3. MENDENGARKAN AKSI DARI SENTUHAN JARI (UNTUK HP / TABLET)
canvas.addEventListener("touchstart", (e) => {
  isDrawing = true;
  lastX = e.touches[0].clientX;
  lastY = e.touches[0].clientY;
});
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", () => (isDrawing = false));

// 4. FUNGSI UNTUK MENGHAPUS LAYAR
function bersihkanKanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Hapus bersih seluruh area kanvas
}
