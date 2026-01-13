const dummyData = [
    // --- 1. GUNUNG MERBABU ---
    {
        id: 1, 
        mountain_name: 'Gunung Merbabu', 
        location: 'Jawa Tengah', 
        category: 'Hiking',
        basecamps: [
            {
                id: 101, name: 'Selo', image: 'aset/merbabu.jpg', price: '25000', rating: 4.8,
                climb_times: ['08:00', '14:00'],
                guides: ['p01', 'p02'],
                addons: [{ id: 'tenda', name: 'Sewa Tenda', price: '75000' }],
                details: {
                    deskripsi: `<h3>Jalur Selo</h3><p>Jalur favorit pendaki karena pemandangan sabana yang indah.</p>`,
                    infoJalur: `<h3>Info</h3><ul><li>Kesulitan: Menengah</li><li>Estimasi: 6-8 Jam</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Basecamp, Warung, Parkir</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Sabananya juara.</p>`
                }
            }
        ]
    },

    // --- 2. GUNUNG KERINCI ---
    {
        id: 2, 
        mountain_name: 'Gunung Kerinci', 
        location: 'Jambi - Sumatera Barat', 
        category: 'Hiking',
        basecamps: [
            {
                id: 201, name: 'Via Kersik Tuo', image: 'aset/kerinci.jpg', price: '25000', rating: 4.8,
                climb_times: ['07:00'],
                guides: ['p01'],
                addons: [{ id: 'porter', name: 'Porter', price: '300000' }],
                details: {
                    deskripsi: `<h3>Atap Sumatera</h3><p>Gunung berapi tertinggi di Indonesia.</p>`,
                    infoJalur: `<h3>Info</h3><ul><li>Kesulitan: Sulit</li><li>Estimasi: 2-3 Hari</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Homestay</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Trek menantang.</p>`
                }
            },
            {
                id: 202, name: 'Via Solok Selatan', image: 'aset/kerinci.jpg', price: '25000', rating: 4.7,
                climb_times: ['08:00'],
                guides: ['p02'],
                addons: [],
                details: {
                    deskripsi: `<h3>Jalur Solok</h3><p>Jalur alternatif yang lebih sepi.</p>`,
                    infoJalur: `<h3>Info</h3><ul><li>Kesulitan: Menengah</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Pos Registrasi</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Masih asri.</p>`
                }
            }
        ]
    },

    // --- 3. GUNUNG RINJANI ---
    {
        id: 3, 
        mountain_name: 'Gunung Rinjani', 
        location: 'Nusa Tenggara Barat', 
        category: 'Hiking',
        basecamps: [
            {
                id: 301, name: 'Via Sembalun', image: 'aset/rinjani.jpg', price: '20000', rating: 4.9,
                climb_times: ['07:00'],
                guides: ['p01'],
                addons: [{ id: 'tenda', name: 'Tenda', price: '100000' }],
                details: {
                    deskripsi: `<h3>Jalur Sembalun</h3><p>Padang sabana luas yang ikonik.</p>`,
                    infoJalur: `<h3>Info</h3><ul><li>Kesulitan: Sulit</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Lengkap</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Sangat panas tapi indah.</p>`
                }
            },
            {
                id: 302, name: 'Via Torean', image: 'aset/rinjani.jpg', price: '20000', rating: 5.0,
                climb_times: ['07:00'],
                guides: ['p01'],
                addons: [],
                details: {
                    deskripsi: `<h3>Lembah Torean</h3><p>Pemandangan lembah dan air terjun.</p>`,
                    infoJalur: `<h3>Info</h3><ul><li>Kesulitan: Menengah</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Pos</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Seperti Jurassic Park.</p>`
                }
            },
            {
                id: 303, name: 'Via Senaru', image: 'aset/rinjani.jpg', price: '20000', rating: 4.7,
                climb_times: ['08:00'],
                guides: ['p02'],
                addons: [],
                details: {
                    deskripsi: `<h3>Jalur Senaru</h3><p>Trek hutan tropis menuju bibir kawah.</p>`,
                    infoJalur: `<h3>Info</h3><ul><li>Kesulitan: Menengah</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Pos</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Teduh dan sejuk.</p>`
                }
            }
        ]
    },

    // --- 4. GUNUNG SEMERU ---
    {
        id: 4, 
        mountain_name: 'Gunung Semeru', 
        location: 'Jawa Timur', 
        category: 'Hiking',
        basecamps: [
            {
                id: 401, name: 'Via Ranu Pani', image: 'aset/semeru.jpg', price: '78000', rating: 4.9,
                climb_times: ['08:00'],
                guides: ['p01', 'p02'],
                addons: [{ id: 'jeep', name: 'Jeep Bromo', price: '500000' }],
                details: {
                    deskripsi: `<h3>Atap Jawa</h3><p>Menuju Mahameru, puncak tertinggi Jawa.</p>`,
                    infoJalur: `<h3>Info</h3><ul><li>Kesulitan: Grade 4</li><li>Estimasi: 2-3 Hari</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Lengkap</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Ranu Kumbolo terbaik.</p>`
                }
            }
        ]
    },

    // --- 5. GUNUNG LATIMOJONG ---
    {
        id: 5, 
        mountain_name: 'Gunung Latimojong', 
        location: 'Sulawesi Selatan', 
        category: 'Hiking',
        basecamps: [
            {
                id: 501, name: 'Via Karangan', image: 'aset/latimojong.jpg', price: '15000', rating: 4.8,
                climb_times: ['07:00'],
                guides: ['p01'],
                addons: [],
                details: {
                    deskripsi: `<h3>Atap Sulawesi</h3><p>Jalur utama menuju puncak Rante Mario.</p>`,
                    infoJalur: `<h3>Info</h3><ul><li>Kesulitan: Menengah</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Rumah Warga</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Hutan lumut indah.</p>`
                }
            }
        ]
    },

    // --- 6. GUNUNG BUKIT RAYA ---
    {
        id: 6, 
        mountain_name: 'Gunung Bukit Raya', 
        location: 'Kalimantan Barat', 
        category: 'Hiking',
        basecamps: [
            {
                id: 601, name: 'Rantau Malam', image: 'aset/bukit-raya.jpg', price: '150000', rating: 4.8,
                climb_times: ['08:00'],
                guides: ['p01'],
                addons: [],
                details: {
                    deskripsi: `<h3>Ekspedisi Kalimantan</h3><p>Menembus jantung hutan hujan tropis.</p>`,
                    infoJalur: `<h3>Info</h3><ul><li>Kesulitan: Menengah</li><li>Estimasi: 6-7 Hari</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Homestay</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Sangat liar.</p>`
                }
            }
        ]
    },

    // --- 7. GUNUNG BINAIYA ---
    {
        id: 7, 
        mountain_name: 'Gunung Binaiya', 
        location: 'Maluku', 
        category: 'Hiking',
        basecamps: [
            {
                id: 701, name: 'Via Piliana', image: 'aset/binaiya.jpg', price: '25000', rating: 4.8,
                climb_times: ['07:00'],
                guides: ['p01'],
                addons: [],
                details: {
                    deskripsi: `<h3>Mutiara Maluku</h3><p>Mendaki dari ketinggian nol mdpl.</p>`,
                    infoJalur: `<h3>Info</h3><ul><li>Kesulitan: Menengah</li><li>Estimasi: 8 Hari</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Logistik Desa</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Paket lengkap.</p>`
                }
            }
        ]
    },

    // --- 8. GUNUNG GEDE PANGRANGO ---
    {
        id: 8, 
        mountain_name: 'Gunung Gede Pangrango', 
        location: 'Jawa Barat', 
        category: 'Hiking',
        basecamps: [
            {
                id: 801, name: 'Via Cibodas', image: 'aset/gede-pangrango.jpg', price: '72000', rating: 4.9,
                climb_times: ['06:00', '09:00'],
                guides: ['p01'],
                addons: [],
                details: {
                    deskripsi: `<h3>Jalur Cibodas</h3><p>Fasilitas terlengkap dengan air terjun.</p>`,
                    infoJalur: `<h3>Info</h3><ul><li>Kesulitan: Menengah</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Lengkap</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Sangat recommended.</p>`
                }
            },
            {
                id: 802, name: 'Via Gunung Putri', image: 'aset/gede-pangrango.jpg', price: '72000', rating: 4.8,
                climb_times: ['07:00'],
                guides: ['p02'],
                addons: [],
                details: {
                    deskripsi: `<h3>Jalur Cepat</h3><p>Langsung menanjak ke Surya Kencana.</p>`,
                    infoJalur: `<h3>Info</h3><ul><li>Target: Surya Kencana</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Warung</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Capek tapi cepat.</p>`
                }
            }
        ]
    },

    // --- 9. GUNUNG SALAK ---
    {
        id: 9, 
        mountain_name: 'Gunung Salak', 
        location: 'Jawa Barat', 
        category: 'Hiking',
        basecamps: [
            {
                id: 901, name: 'Via Cidahu', image: 'aset/salak.jpg', price: '30000', rating: 4.7,
                climb_times: ['08:00'],
                guides: ['p01'],
                addons: [],
                details: {
                    deskripsi: `<h3>Jalur Cidahu</h3><p>Jalur resmi dengan vegetasi rapat.</p>`,
                    infoJalur: `<h3>Info</h3><ul><li>Kesulitan: Menengah</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Warung</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Mistis tapi indah.</p>`
                }
            }
        ]
    },

    // --- 10. GUNUNG CERMAI ---
    {
        id: 10, 
        mountain_name: 'Gunung Cermai', 
        location: 'Jawa Barat', 
        category: 'Hiking',
        basecamps: [
            {
                id: 1001, name: 'Via Apuy', image: 'aset/cermai.jpg', price: '20000', rating: 4.8,
                climb_times: ['07:00'],
                guides: ['p01'],
                addons: [],
                details: {
                    deskripsi: `<h3>Jalur Apuy</h3><p>Jalur favorit karena trek lebih pendek.</p>`,
                    infoJalur: `<h3>Info</h3><ul><li>Kesulitan: Menengah</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Warung, Toilet</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>View kota Cirebon.</p>`
                }
            },
            {
                id: 1002, name: 'Via Palutungan', image: 'aset/cermai.jpg', price: '25000', rating: 4.7,
                climb_times: ['08:00'],
                guides: ['p01'],
                addons: [],
                details: {
                    deskripsi: `<h3>Jalur Palutungan</h3><p>Trek landai dan panjang.</p>`,
                    infoJalur: `<h3>Info</h3><ul><li>Kesulitan: Menengah</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Basecamp Luas</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Cocok untuk pemanasan.</p>`
                }
            }
        ]
    }
];

module.exports = dummyData;