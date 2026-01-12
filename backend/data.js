const dummyData = [
    {
        id: 1, mountain_name: 'Gunung Merbabu', location: 'Jawa Tengah', category: 'Hiking',
        basecamps: [
            {
                id: 101, name: 'Selo', image: 'aset/merbabu.jpg', price: '25000', rating: 4.8,
                climb_times: ['08:00', '14:00', '18:30'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' }
                ],
                details: {
                    deskripsi: '<h3>Jalur Paling Populer</h3><p>Jalur Selo merupakan favorit para pendaki karena medannya yang relatif landai dan pemandangan sabana yang terbuka sejak awal pendakian.</p>',
                    infoJalur: '<h3>Informasi Jalur via Selo</h3><ul><li><b>Tingkat Kesulitan:</b> Menengah</li><li><b>Estimasi Waktu:</b> 10-12 jam naik</li><li><b>Sumber Air:</b> Terdapat di Pos 1 dan Pos 3</li></ul>',
                    fasilitas: '<h3>Fasilitas Basecamp Selo</h3><ul><li>Area Parkir Luas</li><li>Warung Makan & Minum</li><li>Penyewaan Alat Outdoor</li></ul>',
                    ulasan: '<h3>Ulasan Komunitas</h3><p>Belum ada ulasan untuk lokasi ini.</p>'
                }
            },
            {
                id: 102, name: 'Wekas', image: 'aset/merbabu-wekas.jpg', price: '30000', rating: 4.7,
                climb_times: ['07:00', '13:00'],
                guides: ['p03'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '80000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '25000' }
                ],
                details: {
                    deskripsi: '<h3>Jalur dengan Hutan Rimbun</h3><p>Jalur Wekas dikenal dengan treknya yang lebih rimbun dan teduh di awal pendakian, cocok bagi yang tidak terlalu suka panas.</p>',
                    infoJalur: '<h3>Informasi Jalur via Wekas</h3><ul><li><b>Tingkat Kesulitan:</b> Menengah</li><li><b>Estimasi Waktu:</b> 9-11 jam naik</li><li><b>Sumber Air:</b> Melimpah hingga pos 2</li></ul>',
                    fasilitas: '<h3>Fasilitas Basecamp Wekas</h3><ul><li>Area Parkir</li><li>Toilet</li><li>Warung Kecil</li></ul>',
                    ulasan: '<h3>Ulasan Komunitas</h3><p>Belum ada ulasan untuk lokasi ini.</p>'
                }
            }
        ]
    },
    { id: 2, image: 'aset/bunaken.jpg', title: 'Taman Nasional Bunaken', location: 'Manado, Sulawesi Utara', rating: 4.9, price: '150000', category: 'Diving', details: { deskripsi: '<h3>Tentang Taman Nasional Bunaken</h3><p>Taman Nasional Bunaken adalah surga bagi para penyelam...</p>', infoJalur: '<h3>Spot Menyelam Populer</h3>...', fasilitas: '<h3>Fasilitas Sekitar</h3>...', ulasan: '<h3>Ulasan Komunitas</h3>...' } },
    { id: 3, image: 'aset/g-land.jpg', title: 'Pantai Plengkung (G-Land)', location: 'Banyuwangi, Jawa Timur', rating: 4.7, price: '30000', category: 'Surfing', details: { deskripsi: '<p>Info detail belum tersedia.</p>', infoJalur: '<p>Info detail belum tersedia.</p>', fasilitas: '<p>Info detail belum tersedia.</p>', ulasan: '<p>Info detail belum tersedia.</p>' } },
];

// Baris ini mengekspor variabel agar bisa dibaca oleh server.js
module.exports = { dummyData };