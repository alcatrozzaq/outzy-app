document.addEventListener('DOMContentLoaded', async () => {
    const locationContainer = document.getElementById('location-container'); // Pastikan ID ini sesuai di HTML
    const searchInput = document.querySelector('.search-bar input'); // Pastikan class ini sesuai
    
    // URL Backend (Ganti jika sudah online)
    const API_URL = 'http://localhost:3000/api/locations'; 
    // const API_URL = 'https://outzy-api.onrender.com/api/locations';

    let allLocations = []; // Wadah untuk menyimpan data

    // 1. FUNGSI AMBIL DATA DARI SERVER
    async function fetchLocations() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Gagal mengambil data');
            
            allLocations = await response.json();
            renderLocations(allLocations); // Tampilkan semua data awal
        } catch (error) {
            console.error('Error:', error);
            locationContainer.innerHTML = '<p style="text-align:center;">Gagal memuat data gunung. Pastikan server nyala.</p>';
        }
    }

    // 2. FUNGSI MENAMPILKAN KARTU GUNUNG (RENDER)
    function renderLocations(data) {
        locationContainer.innerHTML = ''; // Bersihkan isi kontainer

        if (data.length === 0) {
            locationContainer.innerHTML = '<p style="text-align:center;">Gunung tidak ditemukan.</p>';
            return;
        }

        data.forEach(location => {
            // Ambil harga dari basecamp pertama sebagai patokan "Mulai dari..."
            const startingPrice = location.basecamps && location.basecamps.length > 0 
                ? parseInt(location.basecamps[0].price).toLocaleString('id-ID')
                : 'Hubungi Admin';

            // Ambil gambar utama (jika ada di root, atau ambil dari basecamp pertama)
            let imageSrc = 'aset/merbabu.jpg'; // Default
            if (location.basecamps && location.basecamps.length > 0) {
                imageSrc = location.basecamps[0].image;
            }

            // HTML Kartu Gunung
            const cardHTML = `
                <div class="card" onclick="window.location.href='detail.html?id=${location.id}'">
                    <div class="card-image" style="background-image: url('${imageSrc}');">
                        <span class="badge">${location.category || 'Hiking'}</span>
                    </div>
                    <div class="card-content">
                        <div class="card-header">
                            <h3>${location.mountain_name}</h3> <div class="rating">⭐ 4.8</div>
                        </div>
                        <p class="location"><i class="fa-solid fa-location-dot"></i> ${location.location}</p>
                        <div class="card-footer">
                            <div class="price">
                                <span class="label">Mulai dari</span>
                                <span class="value">Rp ${startingPrice}</span>
                            </div>
                            <button class="btn-detail">Lihat</button>
                        </div>
                    </div>
                </div>
            `;
            locationContainer.innerHTML += cardHTML;
        });
    }

    // 3. FUNGSI PENCARIAN (SEARCH) - YANG KITA PERBAIKI
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const keyword = e.target.value.toLowerCase();

            const filteredData = allLocations.filter(item => {
                // Cari berdasarkan Nama Gunung ATAU Lokasi
                // Kita gunakan 'mountain_name' sesuai database baru
                return item.mountain_name.toLowerCase().includes(keyword) || 
                       item.location.toLowerCase().includes(keyword);
            });

            renderLocations(filteredData);
        });
    }

    // Jalankan fetch saat halaman dibuka
    fetchLocations();
});