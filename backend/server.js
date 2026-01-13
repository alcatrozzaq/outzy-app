const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// --- IMPORT DATA GUNUNG ---
const locationsData = require('./data'); 

// --- DATA DUMMY GUIDE (PEMANDU) ---
// Kita taruh sini langsung agar tidak perlu buat file baru
const guidesData = [
    { 
        id: 'p01', 
        name: 'Budi Santoso', 
        age: 30, 
        rating: 4.9, 
        price: '150000', 
        skills: ['Medis', 'Porter', 'Masak'], 
        photo: 'https://cdn-icons-png.flaticon.com/512/4042/4042356.png' 
    },
    { 
        id: 'p02', 
        name: 'Siti Aminah', 
        age: 28, 
        rating: 4.8, 
        price: '150000', 
        skills: ['Bahasa Inggris', 'Fotografi'], 
        photo: 'https://cdn-icons-png.flaticon.com/512/4042/4042422.png' 
    }
];

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- ROUTES ---

// 1. Cek Server
app.get('/', (req, res) => {
    res.send('Server Outzy Siap! 🚀');
});

// 2. API Locations (Gunung)
app.get('/api/locations', (req, res) => {
    res.json(locationsData);
});

app.get('/api/locations/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const location = locationsData.find(item => item.id === id);
    if (location) res.json(location);
    else res.status(404).json({ message: "Gunung tidak ditemukan!" });
});

// 3. API Guides (INI YANG TADINYA HILANG)
app.get('/api/guides', (req, res) => {
    res.json(guidesData);
});

// 4. API Orders (Untuk menerima pesanan)
app.post('/api/orders', (req, res) => {
    const order = req.body;
    console.log('Pesanan Baru Diterima:', order);
    // Di sini nanti bisa disambungkan ke database asli
    res.status(201).json({ message: 'Pesanan berhasil disimpan', data: order });
});

// --- START SERVER ---
app.listen(port, () => {
    console.log(`Server Outzy berjalan di port ${port}`);
});