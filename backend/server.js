const express = require('express');
const cors = require('cors');
const app = express();

// Gunakan Port dari Render (Cloud), kalau di laptop pakai 3000
const port = process.env.PORT || 3000;

// --- IMPORT DATABASE ---
// Pastikan file data.js ada di folder yang sama
const locationsData = require('./data'); 

// --- ATURAN KONEKSI (MIDDLEWARE) ---
app.use(cors()); // Izinkan semua koneksi (PENTING untuk Vercel)
app.use(express.json()); // Supaya bisa baca data JSON

// --- ROUTES (JALUR API) ---

// 1. Cek Kesehatan Server (Root)
// Buka ini di browser untuk memastikan server hidup
app.get('/', (req, res) => {
    res.send('<h1>Server Outzy Berjalan Lancar! 🚀</h1><p>Silakan akses /api/locations untuk data gunung.</p>');
});

// 2. Ambil SEMUA Data Gunung
app.get('/api/locations', (req, res) => {
    console.log(`[${new Date().toLocaleTimeString()}] Ada request masuk ke /api/locations`);
    res.json(locationsData);
});

// 3. Ambil SATU Data Gunung (Berdasarkan ID)
app.get('/api/locations/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const location = locationsData.find(item => item.id === id);

    if (location) {
        res.json(location);
    } else {
        res.status(404).json({ message: "Gunung tidak ditemukan!" });
    }
});

// --- MENYALAKAN SERVER ---
app.listen(port, () => {
    console.log(`=========================================`);
    console.log(`🚀 Server Outzy SIAP di port ${port}`);
    console.log(`🔗 Link Lokal: http://localhost:${port}`);
    console.log(`=========================================`);
});