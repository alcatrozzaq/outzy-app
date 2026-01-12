const express = require('express');
const cors = require('cors');

// Impor data
const { dummyData } = require('./data.js');
const { allGuides } = require('./guides.js');
// Kita gunakan let agar array bisa diubah (ditambah pesanan baru)
let { dummyOrders } = require('./orders.js'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // <--- WAJIB: Agar server bisa baca data yang dikirim Frontend

// --- GET DATA ---
app.get('/api/locations', (req, res) => {
  res.json(dummyData);
});

app.get('/api/guides', (req, res) => {
    res.json(allGuides);
});

// --- API PESANAN (REVISI) ---

// 1. GET Pesanan (Bisa filter by email)
app.get('/api/orders', (req, res) => {
    const userEmail = req.query.email;
    
    if (userEmail) {
        // Filter: Hanya tampilkan pesanan milik email tersebut
        const filteredOrders = dummyOrders.filter(o => o.userEmail === userEmail);
        res.json(filteredOrders);
    } else {
        // Jika tidak ada email, kirim array kosong (keamanan) atau semua (admin)
        // Kita kirim kosong agar user tamu tidak melihat pesanan orang lain
        res.json([]);
    }
});

// 2. POST Pesanan Baru (Menerima Data dari Frontend)
app.post('/api/orders', (req, res) => {
    const newOrder = req.body;

    // Tambahkan data server-side (ID unik, Status awal)
    const orderWithMeta = {
        ...newOrder,
        id: `ORD-${Date.now()}`, // ID Unik berdasarkan waktu
        status: 'Akan Datang'    // Default status
    };

    // Simpan ke memori server (Array)
    dummyOrders.push(orderWithMeta);

    console.log('Pesanan Baru Diterima:', orderWithMeta); // Cek di terminal nanti
    
    res.status(201).json({ 
        message: 'Pesanan berhasil dibuat', 
        order: orderWithMeta 
    });
});

app.listen(port, () => {
  console.log(`Server Outzy API berjalan di http://localhost:${port}`);
});