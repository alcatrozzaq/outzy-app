const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// --- DATA DUMMY ---
const locationsData = require('./data'); 

const guidesData = [
    { id: 'p01', name: 'Budi Santoso', age: 30, rating: 4.9, price: '150000', skills: ['Medis', 'Porter', 'Masak'], photo: 'https://cdn-icons-png.flaticon.com/512/4042/4042356.png' },
    { id: 'p02', name: 'Siti Aminah', age: 28, rating: 4.8, price: '150000', skills: ['Bahasa Inggris', 'Fotografi'], photo: 'https://cdn-icons-png.flaticon.com/512/4042/4042422.png' }
];

// --- DATABASE SEMENTARA (MEMORY) ---
// Catatan: Karena pakai Memory, data akan hilang kalau server restart (gratisan Render sering restart).
// Untuk skripsi nanti sebaiknya konek ke MongoDB, tapi untuk sekarang ini cukup agar tidak error.
let ordersDatabase = []; 

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- ROUTES ---

// 1. Cek Server
app.get('/', (req, res) => {
    res.send('Server Outzy SIAP! 🚀');
});

// 2. API Locations (Gunung)
app.get('/api/locations', (req, res) => {
    res.json(locationsData);
});

// 3. API Guides
app.get('/api/guides', (req, res) => {
    res.json(guidesData);
});

// 4. API ORDERS (INI FITUR BARU YANG KITA TAMBAHKAN)

// A. Simpan Pesanan Baru (POST)
app.post('/api/orders', (req, res) => {
    const newOrder = req.body;
    
    // Tambah info tambahan otomatis
    newOrder.id = 'ORD-' + Date.now();
    newOrder.status = 'Menunggu Pembayaran';
    newOrder.createdAt = new Date();

    ordersDatabase.push(newOrder); // Masukkan ke memori server
    
    console.log('✅ Pesanan Masuk:', newOrder);
    res.status(201).json({ message: 'Pesanan berhasil disimpan', orderId: newOrder.id });
});

// B. Lihat Riwayat Pesanan (GET) -> INI YANG MENGATASI ERROR 404
app.get('/api/orders', (req, res) => {
    const emailUser = req.query.email;

    if (emailUser) {
        // Kalau ada email, cari pesanan milik email itu saja
        const myOrders = ordersDatabase.filter(order => order.email === emailUser);
        res.json(myOrders);
    } else {
        // Kalau tidak ada email, tampilkan semua (untuk admin misalnya)
        res.json(ordersDatabase);
    }
});

// --- START SERVER ---
app.listen(port, () => {
    console.log(`Server Outzy berjalan di port ${port}`);
});