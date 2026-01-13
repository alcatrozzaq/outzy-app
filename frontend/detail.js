document.addEventListener('DOMContentLoaded', async () => {

    // --- 1. KONFIGURASI SERVER ---
    // PENTING: Gunakan 'http://localhost:3000' saat tes di laptop.
    // Ganti ke alamat Render HANYA jika sudah upload dan online.
    const API_BASE_URL = 'https://outzy-api.onrender.com/'; 
    // const API_BASE_URL = 'https://outzy-api.onrender.com';

    // --- 2. VARIABEL GLOBAL (STATE) ---
    let allLocations = [];
    let allGuides = [];
    let currentMountain = null;
    let currentBasecamp = null;
    let selectedAddons = [];
    let selectedGuides = [];
    let totalPrice = 0;

    // --- 3. FUNGSI CEK LOGIN ---
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const mobileAccountLink = document.querySelector('.bottom-nav a[href*="login.html"], .bottom-nav a[href*="akun.html"]');
        if (isLoggedIn === 'true' && mobileAccountLink) {
            mobileAccountLink.href = 'akun.html';
            mobileAccountLink.innerHTML = '<i class="fa-solid fa-user"></i> Akun';
        }
    }
    checkLoginStatus();

    // --- 4. AMBIL ID DARI URL ---
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));

    if (!id) {
        document.body.innerHTML = '<h2 style="text-align:center; margin-top:50px;">ID tidak valid. <a href="index.html">Kembali</a></h2>';
        return;
    }

    // --- 5. FETCH DATA (UTAMA) ---
    try {
        // A. Ambil Data Gunung
        const locResponse = await fetch(`${API_BASE_URL}/api/locations`);
        if (!locResponse.ok) throw new Error('Gagal mengambil data lokasi');
        allLocations = await locResponse.json();

        // B. Ambil Data Guide (Pemandu)
        // Kita gunakan try-catch khusus di sini agar kalau API guide error, halaman tetap jalan
        try {
            const guideResponse = await fetch(`${API_BASE_URL}/api/guides`);
            if (guideResponse.ok) {
                allGuides = await guideResponse.json();
            }
        } catch (err) {
            console.warn("Data guide belum tersedia di server:", err);
            allGuides = []; // Kosongkan jika error
        }

        // C. Cari Gunung yang Sedang Dibuka
        currentMountain = allLocations.find(item => item.id === id);
        
        if (!currentMountain) {
            throw new Error('Gunung tidak ditemukan di database.');
        }

        // D. Set Basecamp Default (Pilih yang pertama)
        if (currentMountain.basecamps && currentMountain.basecamps.length > 0) {
            currentBasecamp = currentMountain.basecamps[0];
        }

        // E. Render Halaman
        renderPage();

    } catch (error) {
        console.error("Critical Error:", error);
        const main = document.querySelector('main') || document.body;
        main.innerHTML = `
            <div style="text-align:center; padding: 4rem; font-family: sans-serif;">
                <h2>Gagal Memuat Data 😔</h2>
                <p>${error.message}</p>
                <p>Pastikan server backend (node server.js) sudah menyala.</p>
                <a href="index.html" style="color: blue; text-decoration: underline;">Kembali ke Beranda</a>
            </div>
        `;
    }

    // --- 6. RENDER TAMPILAN ---
    function renderPage() {
        // Judul & Lokasi
        const titleEl = document.getElementById('nama-gunung');
        const locEl = document.getElementById('lokasi-gunung');
        
        if (titleEl) titleEl.innerText = currentMountain.mountain_name;
        if (locEl) locEl.innerText = currentMountain.location;

        // Render Dropdown Pilihan Jalur
        renderBasecampSelector();

        // Update UI sisanya (Harga, Gambar, Tab)
        updateBasecampUI();
    }

    // --- 7. RENDER DROPDOWN JALUR ---
    function renderBasecampSelector() {
        const container = document.getElementById('basecamp-selection-panel');
        
        // Jika gunung ini tidak punya basecamp (misal pantai), sembunyikan dropdown
        if (!currentMountain.basecamps || currentMountain.basecamps.length === 0) {
            if(container) container.style.display = 'none';
            return;
        }

        if (container) {
            let html = `<label style="font-weight:bold; display:block; margin-bottom:8px; color:#333;">Pilih Jalur Pendakian:</label>
                        <select id="basecamp-select" style="width:100%; padding:12px; border-radius:8px; border:1px solid #ddd; margin-bottom:15px; font-size:16px;">`;
            
            currentMountain.basecamps.forEach((bc, index) => {
                html += `<option value="${index}">Via ${bc.name}</option>`;
            });
            html += `</select>`;
            container.innerHTML = html;

            // Event saat ganti jalur
            document.getElementById('basecamp-select').addEventListener('change', (e) => {
                const idx = e.target.value;
                currentBasecamp = currentMountain.basecamps[idx];
                
                // Reset pilihan saat ganti jalur
                selectedAddons = []; 
                selectedGuides = [];
                
                updateBasecampUI();
            });
        }
    }

    // --- 8. UPDATE UI (SAAT JALUR BERUBAH) ---
    function updateBasecampUI() {
        if (!currentBasecamp) return;

        // Update Gambar Utama
        const mainImg = document.getElementById('gambar-utama');
        if (mainImg) mainImg.src = currentBasecamp.image;

        // Update Rating
        const ratingEl = document.querySelector('.rating span');
        if (ratingEl) ratingEl.innerText = currentBasecamp.rating || '4.8';

        // Update Tab (Deskripsi/Info)
        const activeTab = document.querySelector('.tab-link.active');
        if (activeTab) renderTabContent(activeTab.dataset.tab);

        // Render Fitur Tambahan
        renderAddons(); // Sewa Alat
        renderGuides(); // Pemandu

        // Hitung Harga Total
        calculateTotal();
    }

    // --- 9. RENDER ADD-ONS (SEWA ALAT) ---
    function renderAddons() {
        const container = document.getElementById('addons-container');
        if (!container) return; // Jika div tidak ada di HTML, lewati

        let html = `<div style="margin-top:20px; border-top:1px solid #eee; padding-top:15px;">
                    <h4 style="margin-bottom:10px; font-size:16px;">Sewa Alat (Opsional)</h4>`;

        if (currentBasecamp.addons && currentBasecamp.addons.length > 0) {
            currentBasecamp.addons.forEach((addon) => {
                html += `
                <div style="display:flex; justify-content:space-between; margin-bottom:10px; align-items:center;">
                    <label style="cursor:pointer; display:flex; align-items:center;">
                        <input type="checkbox" class="addon-checkbox" data-price="${addon.price}" data-name="${addon.name}" style="margin-right:10px; transform:scale(1.2);"> 
                        ${addon.name}
                    </label>
                    <span style="font-weight:bold; color:#27ae60;">+Rp ${parseInt(addon.price).toLocaleString('id-ID')}</span>
                </div>`;
            });
        } else {
            html += `<p style="color:#777; font-size: 0.9rem;">Tidak ada alat sewa di jalur ini.</p>`;
        }
        html += `</div>`;
        container.innerHTML = html;

        // Event Listener Checkbox
        container.querySelectorAll('.addon-checkbox').forEach(box => {
            box.addEventListener('change', calculateTotal);
        });
    }

    // --- 10. RENDER GUIDES (PEMANDU) ---
    function renderGuides() {
        // Kita butuh container baru di HTML untuk list guide
        // Jika Anda belum punya div id="guides-container", kode ini akan membuatnya otomatis di bawah addons
        let container = document.getElementById('guides-container');
        
        if (!container) {
            const addonsContainer = document.getElementById('addons-container');
            if (addonsContainer) {
                container = document.createElement('div');
                container.id = 'guides-container';
                addonsContainer.parentNode.insertBefore(container, addonsContainer.nextSibling);
            } else {
                return;
            }
        }

        let html = `<div style="margin-top:20px; border-top:1px solid #eee; padding-top:15px;">
                    <h4 style="margin-bottom:10px; font-size:16px;">Pemandu (Opsional)</h4>`;

        // Cek apakah basecamp ini punya daftar ID guide (misal: ['p01', 'p02'])
        if (currentBasecamp.guides && currentBasecamp.guides.length > 0 && allGuides.length > 0) {
            
            currentBasecamp.guides.forEach(guideId => {
                // Cari data detail guide berdasarkan ID
                const guideData = allGuides.find(g => g.id === guideId);
                
                if (guideData) {
                    html += `
                    <div style="display:flex; align-items:center; margin-bottom:15px; border:1px solid #f0f0f0; padding:10px; border-radius:8px;">
                        <input type="checkbox" class="guide-checkbox" value="${guideData.id}" data-price="${guideData.price}" data-name="${guideData.name}" style="margin-right:10px; transform:scale(1.2);">
                        <img src="${guideData.photo}" style="width:40px; height:40px; border-radius:50%; object-fit:cover; margin-right:10px;">
                        <div style="flex-grow:1;">
                            <div style="font-weight:bold;">${guideData.name}</div>
                            <div style="font-size:0.8rem; color:#666;">⭐ ${guideData.rating} • ${guideData.skills.join(', ')}</div>
                        </div>
                        <div style="font-weight:bold; color:#e67e22;">Rp ${parseInt(guideData.price).toLocaleString('id-ID')}</div>
                    </div>`;
                }
            });
        } else {
            html += `<p style="color:#777; font-size: 0.9rem;">Tidak ada pemandu tersedia saat ini.</p>`;
        }
        
        html += `</div>`;
        container.innerHTML = html;

        // Event Listener Checkbox Guide
        container.querySelectorAll('.guide-checkbox').forEach(box => {
            box.addEventListener('change', calculateTotal);
        });
    }

    // --- 11. SISTEM TAB (DESKRIPSI / INFO) ---
    function renderTabContent(key) {
        const container = document.getElementById('tab-content-container') || document.getElementById('deskripsi-lengkap');
        if (container && currentBasecamp.details) {
            container.innerHTML = currentBasecamp.details[key] || '<p>Info tidak tersedia.</p>';
        }
    }

    document.querySelectorAll('.tab-link').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.tab-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            renderTabContent(this.dataset.tab);
        });
    });

    // --- 12. HITUNG TOTAL HARGA ---
    function calculateTotal() {
        let ticketPrice = parseInt(currentBasecamp.price || 0);
        let total = ticketPrice;

        // A. Hitung Addons (Alat)
        selectedAddons = [];
        document.querySelectorAll('.addon-checkbox:checked').forEach(box => {
            const price = parseInt(box.dataset.price);
            const name = box.dataset.name;
            total += price;
            selectedAddons.push({ name, price });
        });

        // B. Hitung Guide
        selectedGuides = [];
        document.querySelectorAll('.guide-checkbox:checked').forEach(box => {
            const price = parseInt(box.dataset.price);
            const name = box.dataset.name;
            total += price;
            selectedGuides.push({ name, price });
        });

        // Update Tampilan Harga Tiket Dasar
        const priceEl = document.getElementById('harga-tiket');
        if (priceEl) priceEl.innerText = `Rp ${ticketPrice.toLocaleString('id-ID')}`;

        // Update Tampilan Total Estimasi
        const totalEl = document.getElementById('total-price-display');
        if (totalEl) totalEl.innerText = `Rp ${total.toLocaleString('id-ID')}`;
        
        // Update di Mobile Sticky Bar (jika ada)
        const mobileTotalEl = document.getElementById('mobile-price-display');
        if (mobileTotalEl) mobileTotalEl.innerText = `Rp ${total.toLocaleString('id-ID')}`;

        totalPrice = total;
    }

    // --- 13. LOGIKA TOMBOL BOOKING ---
    const bookBtns = document.querySelectorAll('.btn-book, #tombol-pesan-bawah, #book-now-btn, #mobile-book-btn');

    bookBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            // Cek Login
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            if (isLoggedIn !== 'true') {
                if(confirm("Fitur Booking hanya untuk Member. Login sekarang?")) {
                    window.location.href = 'login.html';
                }
                return;
            }

            // Validasi Data
            if (!currentBasecamp) {
                alert("Data jalur belum dimuat.");
                return;
            }

            // Siapkan Data Pesanan
            const orderData = {
                mountainId: currentMountain.id,
                mountainName: currentMountain.mountain_name,
                basecampName: currentBasecamp.name,
                basecampId: currentBasecamp.id,
                date: new Date().toISOString().split('T')[0], // Default hari ini
                items: [...selectedAddons, ...selectedGuides], // Gabung alat & guide
                totalPrice: totalPrice,
                image: currentBasecamp.image
            };

            // Simpan ke LocalStorage (Untuk halaman Payment)
            localStorage.setItem('tempOrder', JSON.stringify(orderData));

            // Efek Loading pada Tombol
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses...';
            btn.disabled = true;

            // Simulasi Kirim ke Server (Opsional)
            try {
                const response = await fetch(`${API_BASE_URL}/api/orders`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderData)
                });
                
                if (response.ok) {
                    alert(`✅ Pesanan Berhasil Dibuat!\nTotal: Rp ${totalPrice.toLocaleString()}\n\nSilakan cek halaman Pesanan.`);
                    window.location.href = 'pesanan.html'; // Redirect jika sukses
                } else {
                    throw new Error('Gagal menyimpan pesanan');
                }
            } catch (err) {
                console.error(err);
                alert("Simulasi: Pesanan tersimpan di lokal (Server belum terhubung DB).");
                // window.location.href = 'payment.html'; // Fallback redirect
            } finally {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        });
    });

});