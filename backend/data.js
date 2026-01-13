const dummyData = [
    // --- DATA GUNUNG MERBABU (Template) ---
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
                    deskripsi: `<h3>Jalur Paling Populer</h3><p>Jalur Selo merupakan favorit para pendaki karena medannya yang relatif landai.</p>`,
                    infoJalur: `<h3>Informasi Jalur via Selo</h3><ul><li><b>Tingkat Kesulitan:</b> Menengah</li><li><b>Estimasi Waktu:</b> 6-8 Jam</li><li><b>Sumber Air:</b> Pos 1 dan Pos 3</li></ul>`,
                    fasilitas: `<h3>Fasilitas Basecamp Selo</h3><ul><li>Area Parkir</li><li>Toilet</li><li>Warung Logistik</li><li>Basecamp Nyaman</li></ul>`,
                    ulasan: `<h3>Ulasan Komunitas</h3><p>Jalur favorit, sangat indah sabananya.</p>`
                }
            }
        ]
    },

    // --- GUNUNG KERINCI ---
    {
        id: 2, mountain_name: 'Gunung Kerinci', location: 'Jambi - sumatera Barat', category: 'Hiking',
        basecamps: [
            {
                id: 201, name: 'Via Kersik Tuo', image: 'aset/kerinci.jpg', price: '1500000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Via Kersik Tuo</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung Kerinci.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> 3</li><li><b>Estimasi:</b> 2 hingga 3 hari 2 malam</li><li><b>Air:</b> pos 1 dan 2</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>tenda, alat masak, dan peralatan</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
            {
                id: 202, name: 'Via Solok Selatan', image: 'aset/kerinci.jpg', price: '25000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Via Solok Selatan</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung Kerinci.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> Menengah</li><li><b>Estimasi:</b> </li><li><b>Air:</b> pos 2 atau 3</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
        ]
    },

    // --- GUNUNG RINJANI ---
    {
        id: 3, mountain_name: 'Gunung Rinjani', location: 'Provinsi Nusa Tenggara Barat', category: 'Hiking',
        basecamps: [
            {
                id: 301, name: 'Via Torean', image: 'aset/rinjani.jpg', price: '5000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Via Torean</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung Rinjani.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b>  </li><li><b>Estimasi:</b> 2-3 Hari 2 malam</li><li><b>Air:</b> Air Terjun Penimbung , Sungai di lembah Torean, Sekitar Danau Sagar Anak</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Area Parkir</li><li>Peralatan pendakian</li><li>Tiket masuk </li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
            {
                id: 302, name: 'Via sembalun', image: 'aset/rinjani.jpg', price: '25000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Via sembalun</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung Rinjani.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> Menengah</li><li><b>Estimasi:</b> </li><li><b>Air:</b> Pos 2 Tengengean, Plawangan Sembalun, Danau Segara Anak</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Penginapan</li><li>Toilet</li><li>Alat komunikasi</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
            {
                id: 303, name: 'Via Senaru', image: 'aset/rinjani.jpg', price: '25000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Via Senaru</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung Rinjani.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> Menengah</li><li><b>Estimasi:</b> </li><li><b>Air:</b> Pos 2 Montong Satas, Dekat Danau Segara Anak</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
            {
                id: 304, name: 'Via Timbahun', image: 'aset/rinjani.jpg', price: '25000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Via Timbahun</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung Rinjani.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> Menengah</li><li><b>Estimasi:</b> </li><li><b>Air:</b> Pos 2 dan Pos 3</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
            {
                id: 305, name: 'Via Tete Batu', image: 'aset/rinjani.jpg', price: '25000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Via Tete Batu</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung Rinjani.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> Menengah</li><li><b>Estimasi:</b> </li><li><b>Air:</b> Pos 1 dan pos 2, Pos 3</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
            {
                id: 306, name: 'Via Aik Berik', image: 'aset/rinjani.jpg', price: '25000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Via Aik Berik</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung Rinjani.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> Menengah</li><li><b>Estimasi:</b> </li><li><b>Air:</b> Pos 1 dan pos 3</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
        ]
    },

    // --- GUNUNG SEMERU ---
    {
        id: 4, mountain_name: 'Gunung Semeru', location: 'Taman Nasional Bromo Tengger Semeru, Kabupaten Malang, Jawa Timur, Indonesia.', category: 'Hiking',
        basecamps: [
            {
                id: 401, name: 'Via Ranu Pani', image: 'aset/semeru.jpg', price: '78000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Via Ranu Pani</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung Semeru.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> 4</li><li><b>Estimasi:</b> 2-3 Hari 2 malam</li><li><b>Air:</b> Ranu pani, Ranu Kumbolo, Sumber mani Kalimati</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Toilet</li><li>persewaan alat pendakian</li><li>Porter</li><li>Guide</li><li>Area Parkir</li><li>Penginapan</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
        ]
    },

    // --- GUNUNG CARTENZ ---
    {
        id: 5, mountain_name: 'Gunung Cartenz', location: 'Kabupaten Mimika, \nProvinsi Papua Tengah', category: 'Hiking',
        basecamps: [
        ]
    },

    // --- GUNUNG LATIMOJONG ---
    {
        id: 6, mountain_name: 'Gunung Latimojong', location: 'Kabupaten Enrekang, Provinsi \nSulawesi Selatan, Indonesi', category: 'Hiking',
        basecamps: [
            {
                id: 601, name: 'Via Dusun Karangan', image: 'aset/latimojong.jpg', price: '10000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Via Dusun Karangan</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung Latimojong.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> Menengah</li><li><b>Estimasi:</b> 2-3 hari 2 malam</li><li><b>Air:</b> pos 2, pos 5, dan pos 7</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>akses jalan kedusun</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
            {
                id: 602, name: 'Via Kecamatan Mengkendek', image: 'aset/latimojong.jpg', price: '25000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Via Kecamatan Mengkendek</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung Latimojong.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> Menengah</li><li><b>Estimasi:</b> </li><li><b>Air:</b> </li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>penginapan</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
            {
                id: 603, name: 'Via Kecamatan Latimojong', image: 'aset/latimojong.jpg', price: '25000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Via Kecamatan Latimojong</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung Latimojong.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> Menengah</li><li><b>Estimasi:</b> </li><li><b>Air:</b> </li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>kamar mandi/toilet </li><li>mushola</li><li>persewaan alat pendakian</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
        ]
    },

    // --- GUNUNG BUKIT RAYA ---
    {
        id: 7, mountain_name: 'Gunung Bukit Raya', location: 'Kalimantan Barat', category: 'Hiking',
        basecamps: [
            {
                id: 701, name: 'Desa Rantau Malam', image: 'aset/bukit-raya.jpg', price: '150000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Desa Rantau Malam</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung Bukit Raya.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> Menengah</li><li><b>Estimasi:</b> 6-7 Hari (Pulang-Pergi)</li><li><b>Air:</b> Pos Linang, Pos soa badak,, Dipuncak dan jalur puncak</li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Penginapan</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
            {
                id: 702, name: 'Desa Kasongan', image: 'aset/bukit-raya.jpg', price: '25000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Desa Kasongan</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung Bukit Raya.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> Menengah</li><li><b>Estimasi:</b> </li><li><b>Air:</b> </li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Guide/Poter</li><li>Toilet</li><li>persewaan alat pendakian</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
        ]
    },

    // --- GUNUNG BINAIYA ---
    {
        id: 8, mountain_name: 'Gunung binaiya', location: 'Pulau Seram, Maluku', category: 'Hiking',
        basecamps: [
            {
                id: 801, name: 'Via desa piliana', image: 'aset/binaiya.jpg', price: '25000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Via desa piliana</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung binaiya.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> Pos 1, Pos 2, dan Pos 3</li><li><b>Estimasi:</b> 8 Hari</li><li><b>Air:</b> </li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Logostik</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
            {
                id: 802, name: 'Via desa kanikeh', image: 'aset/binaiya.jpg', price: '25000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Via desa kanikeh</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung binaiya.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> Menengah</li><li><b>Estimasi:</b> </li><li><b>Air:</b> </li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Penginapan</li><li>Toilet</li><li>Penginapan</li><li>Guide/Poter</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
        ]
    },

    // --- GUNUNG GEDE PANGRANGO ---
    {
        id: 9, mountain_name: 'Gunung Gede pangrango', location: 'Kabupaten Bogor, Jawa Barat', category: 'Hiking',
        basecamps: [
            {
                id: 901, name: 'Via jalur cibodas', image: 'aset/gede-pangrango.jpg', price: '72000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Via jalur cibodas</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung Gede pangrango.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> Telaga Biru
Pancaweuleuh
Kandang Batu
Kandang Badak</li><li><b>Estimasi:</b> 2 hari 1 malam</li><li><b>Air:</b> </li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Penginapan Guide/poter Toilet Tempat makan Persewaan alat pendakian</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
            {
                id: 902, name: 'Jalur Gunung Putri', image: 'aset/gede-pangrango.jpg', price: '25000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Jalur Gunung Putri</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung Gede pangrango.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> Pos 2 - Surya Kencana
Kandang Badak</li><li><b>Estimasi:</b> </li><li><b>Air:</b> </li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
            {
                id: 903, name: 'Jalur Selabintana', image: 'aset/gede-pangrango.jpg', price: '25000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Jalur Selabintana</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung Gede pangrango.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> Pos Awal - Tengah Jalur
Sebelum Mencapai Surya Kencana
Kandang Badak</li><li><b>Estimasi:</b> </li><li><b>Air:</b> </li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
        ]
    },

    // --- GUNUNG SALAK ---
    {
        id: 10, mountain_name: 'Gunung salak', location: 'Kabupaten Bogor, Jawa Barat', category: 'Hiking',
        basecamps: [
            {
                id: 1001, name: 'Jalur Cidahu', image: 'aset/salak.jpg', price: '5000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Jalur Cidahu</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung salak.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> Camp Air Terjun
Sungai Menuju Kawah Ratu
Sebelum Memasuki Hutan Lebat</li><li><b>Estimasi:</b> 2 hari 1 malam</li><li><b>Air:</b> </li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Penginapan  Guide/Porter Persewaan Alat Pendakian Warung/Logostik</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
            {
                id: 1002, name: 'Jalur Pasir Reungit', image: 'aset/salak.jpg', price: '25000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Jalur Pasir Reungit</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung salak.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> Sebelum Memasuki Hutan Lebat</li><li><b>Estimasi:</b> </li><li><b>Air:</b> </li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
            {
                id: 1003, name: 'Jalur Kutajaya', image: 'aset/salak.jpg', price: '25000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Jalur Kutajaya</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung salak.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> Sungai Kecil 30-40 Menit dari Pos Awal
Sebelum Zona Belerang (1,5-2 jam)</li><li><b>Estimasi:</b> </li><li><b>Air:</b> </li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
            {
                id: 1004, name: 'Jalur giri jaya', image: 'aset/salak.jpg', price: '25000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Jalur giri jaya</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung salak.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> Sungai dekat basecamp
Pos sungai</li><li><b>Estimasi:</b> </li><li><b>Air:</b> </li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
            {
                id: 1005, name: 'Jalur Aji saka', image: 'aset/salak.jpg', price: '25000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Jalur Aji saka</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung salak.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> Camp sungai
Sungai dalam hutan tengah</li><li><b>Estimasi:</b> </li><li><b>Air:</b> </li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
        ]
    },

    // --- GUNUNG CERMAI ---
    {
        id: 11, mountain_name: 'Gunung Cermai', location: 'Kabupaten Cirebon, Jawa Barat', category: 'Hiking',
        basecamps: [
            {
                id: 1101, name: 'Jalur Apuy', image: 'aset/cermai.jpg', price: '10000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Jalur Apuy</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung Cermai.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> Pos 1 dan Pos 5</li><li><b>Estimasi:</b> 2 hari 1 malam</li><li><b>Air:</b> </li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul><li>Penginapan Guide/poter Toilet Tempat makan Persewaan alat pendakian</li></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
            {
                id: 1102, name: 'Jalur Palutungan', image: 'aset/cermai.jpg', price: '25000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Jalur Palutungan</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung Cermai.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> Basecamp Palutungan
Pos 1</li><li><b>Estimasi:</b> </li><li><b>Air:</b> </li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
            {
                id: 1103, name: 'Jalur Linggarjati', image: 'aset/cermai.jpg', price: '25000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Jalur Linggarjati</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung Cermai.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> Basecamp Linggarjati</li><li><b>Estimasi:</b> </li><li><b>Air:</b> </li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
            {
                id: 1104, name: 'Jalur Linggasana', image: 'aset/cermai.jpg', price: '25000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Jalur Linggasana</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung Cermai.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> Basecamp Linggasana
Pos 1
Pos 2 (Musiman)</li><li><b>Estimasi:</b> </li><li><b>Air:</b> </li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
            {
                id: 1105, name: 'Jalur Trisakti Sadarehe', image: 'aset/cermai.jpg', price: '25000', rating: 4.8,
                climb_times: ['07:00', '09:00', '13:00'],
                guides: ['p01', 'p02'],
                addons: [
                    { id: 'tenda4p', name: 'Tenda 4P', price: '75000' },
                    { id: 'sb', name: 'Sleeping Bag', price: '20000' },
                    { id: 'matras', name: 'Matras', price: '10000' },
                    { id: 'kompor', name: 'Kompor & Gas', price: '25000' },
                ],
                details: {
                    deskripsi: `<h3>Jalur Jalur Trisakti Sadarehe</h3><p>Jalur ini merupakan pilihan pendakian menuju puncak Gunung Cermai.</p>`,
                    infoJalur: `<h3>Informasi Jalur</h3><ul><li><b>Kesulitan:</b> Basecamp Trisakti sadarehe
Pos 1
Pos 2 (Musiman)
Pos 3
</li><li><b>Estimasi:</b> </li><li><b>Air:</b> </li></ul>`,
                    fasilitas: `<h3>Fasilitas</h3><ul></ul>`,
                    ulasan: `<h3>Ulasan</h3><p>Jalur yang sangat direkomendasikan.</p>`
                }
            },
        ]
    },
];

module.exports = dummyData;