const dummyData = [
    // 1. MERBABU
    {
        id: 1, 
        mountain_name: 'Gunung Merbabu', 
        location: 'Jawa Tengah', 
        category: 'Hiking',
        basecamps: [
            {
                id: 101, 
                name: 'Selo', 
                image: 'aset/merbabu.jpg', 
                price: '25000', 
                rating: 4.8,
                climb_times: ['08:00', '14:00'],
                guides: ['p01'],
                addons: [{ id: 'tenda', name: 'Sewa Tenda', price: '75000' }],
                details: {
                    deskripsi: `<h3>Jalur Selo</h3><p>Jalur favorit dengan pemandangan sabana.</p>`,
                    infoJalur: `<h3>Info</h3><ul><li>Kesulitan: Menengah</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Warung, Basecamp</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Sangat indah.</p>`
                }
            }
        ]
    },

    // 2. KERINCI
    {
        id: 2, 
        mountain_name: 'Gunung Kerinci', 
        location: 'Jambi', 
        category: 'Hiking',
        basecamps: [
            {
                id: 201, 
                name: 'Kersik Tuo', 
                image: 'aset/kerinci.jpg', 
                price: '25000', 
                rating: 4.9,
                climb_times: ['07:00'],
                guides: ['p01'],
                addons: [{ id: 'porter', name: 'Porter', price: '300000' }],
                details: {
                    deskripsi: `<h3>Atap Sumatera</h3><p>Gunung berapi tertinggi di Indonesia.</p>`,
                    infoJalur: `<h3>Info</h3><ul><li>Kesulitan: Sulit</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Homestay</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Trek menantang.</p>`
                }
            }
        ]
    },

    // 3. RINJANI
    {
        id: 3, 
        mountain_name: 'Gunung Rinjani', 
        location: 'Nusa Tenggara Barat', 
        category: 'Hiking',
        basecamps: [
            {
                id: 301, 
                name: 'Sembalun', 
                image: 'aset/rinjani.jpg', 
                price: '20000', 
                rating: 5.0,
                climb_times: ['07:00'],
                guides: ['p02'],
                addons: [{ id: 'tenda', name: 'Tenda', price: '100000' }],
                details: {
                    deskripsi: `<h3>Jalur Sembalun</h3><p>Sabana luas yang memanjakan mata.</p>`,
                    infoJalur: `<h3>Info</h3><ul><li>Kesulitan: Sulit</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Lengkap</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Luar biasa.</p>`
                }
            }
        ]
    }
];

module.exports = dummyData;