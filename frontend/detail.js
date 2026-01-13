window.addEventListener('DOMContentLoaded', async () => {

    // --- 1. KONFIGURASI ---
    const API_URL = 'http://localhost:3000/api/locations';
    // const API_URL = 'https://nama-app-anda.onrender.com/api/locations'; // Pakai ini kalau sudah online

    // State (Penyimpanan Data Sementara)
    let currentMountain = null;
    let currentBasecamp = null;
    let selectedAddons = [];
    let totalPrice = 0;

    // --- 2. CEK STATUS LOGIN (Untuk Navigasi HP) ---
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const mobileAccountLink = document.querySelector('.bottom-nav a[href*="login.html"], .bottom-nav a[href*="akun.html"]');
        if (isLoggedIn === 'true' && mobileAccountLink) {
            mobileAccountLink.href = 'akun.html';
            mobileAccountLink.innerHTML = '<i class="fa-solid fa-user"></i> Akun';
        }
    }
    checkLoginStatus();

    // --- 3. AMBIL ID DARI URL ---
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));

    if (!id) {
        alert("ID Gunung tidak valid.");
        window.location.href = 'index.html';
        return;
    }

    // --- 4. AMBIL DATA DARI SERVER ---
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Gagal mengambil data");
        
        const allLocations = await response.json();
        
        // Cari Gunung Sesuai ID
        currentMountain = allLocations.find(item => item.id === id);

        if (!currentMountain) throw new Error("Gunung tidak ditemukan.");
        
        // Set Basecamp Default (Yang Pertama)
        if (currentMountain.basecamps && currentMountain.basecamps.length > 0) {
            currentBasecamp = currentMountain.basecamps[0];
        }

        renderPage(); // Jalankan Tampilan

    } catch (error) {
        console.error("Error:", error);
        document.querySelector('main').innerHTML = `<div style="text-align:center; padding:50px;"><h2>Maaf, terjadi kesalahan:</h2><p>${error.message}</p><a href="index.html">Kembali</a></div>`;
    }

    // --- 5. RENDER TAMPILAN UTAMA ---
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

    // --- 6. RENDER DROPDOWN JALUR ---
    function renderBasecampSelector() {
        const container = document.getElementById('basecamp-selection-panel');
        if (!container || !currentMountain.basecamps) return;

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
            selectedAddons = []; // Reset addons jika ganti jalur
            updateBasecampUI();
        });
    }

    // --- 7. UPDATE UI (SAAT JALUR BERUBAH) ---
    function updateBasecampUI() {
        if (!currentBasecamp) return;

        // Update Gambar
        const mainImg = document.getElementById('gambar-utama');
        if (mainImg) mainImg.src = currentBasecamp.image;

        // Update Rating
        const ratingEl = document.querySelector('.rating span');
        if (ratingEl) ratingEl.innerText = currentBasecamp.rating || '4.8';

        // Update Tab (Deskripsi/Info) yang sedang aktif
        const activeTab = document.querySelector('.tab-link.active');
        if (activeTab) renderTabContent(activeTab.dataset.tab);

        // Render Addons (Sewa Alat)
        renderAddons();

        // Hitung Harga Total
        calculateTotal();
    }

    // --- 8. RENDER ADD-ONS (ALAT) ---
    function renderAddons() {
        const container = document.getElementById('addons-container');
        if (!container) return;

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
            html += `<p style="color:#777;">Tidak ada alat sewa di jalur ini.</p>`;
        }
        html += `</div>`;
        container.innerHTML = html;

        // Event Listener Checkbox
        document.querySelectorAll('.addon-checkbox').forEach(box => {
            box.addEventListener('change', calculateTotal);
        });
    }

    // --- 9. TAB SYSTEM ---
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

    // --- 10. HITUNG TOTAL HARGA ---
    function calculateTotal() {
        let ticketPrice = parseInt(currentBasecamp.price || 0);
        let total = ticketPrice;

        // Hitung Addons
        selectedAddons = [];
        document.querySelectorAll('.addon-checkbox:checked').forEach(box => {
            const price = parseInt(box.dataset.price);
            const name = box.dataset.name;
            total += price;
            selectedAddons.push({ name, price });
        });

        // Tampilkan Harga Tiket Dasar
        const priceEl = document.getElementById('harga-tiket');
        if (priceEl) priceEl.innerText = `Rp ${ticketPrice.toLocaleString('id-ID')}`;

        // Tampilkan Total Estimasi (Jika ada elemennya)
        const totalEl = document.getElementById('total-price-display');
        if (totalEl) totalEl.innerText = `Rp ${total.toLocaleString('id-ID')}`;
        
        totalPrice = total;
    }

    // --- 11. LOGIKA BOOKING ---
    const bookBtns = document.querySelectorAll('.btn-book, #tombol-pesan-bawah, .hero-book-btn');

    bookBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Cek Login
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            if (isLoggedIn !== 'true') {
                if(confirm("Fitur Booking hanya untuk Member. Login sekarang?")) {
                    window.location.href = 'login.html';
                }
                return;
            }

            // Jika tombol 'Pesan Sekarang' di atas diklik, scroll ke bawah
            if (btn.classList.contains('hero-book-btn')) {
                document.getElementById('basecamp-selection-panel').scrollIntoView({ behavior: 'smooth' });
                return;
            }

            // Simpan Data Pesanan
            const orderData = {
                mountainId: currentMountain.id,
                mountainName: currentMountain.mountain_name,
                basecampName: currentBasecamp.name,
                basecampId: currentBasecamp.id,
                date: new Date().toISOString().split('T')[0], // Hari ini
                items: selectedAddons,
                totalPrice: totalPrice,
                image: currentBasecamp.image
            };

            localStorage.setItem('tempOrder', JSON.stringify(orderData));

            // Redirect (Simulasi)
            alert(`Pesanan Dibuat!\n\nGunung: ${orderData.mountainName}\nJalur: ${orderData.basecampName}\nTotal: Rp ${totalPrice.toLocaleString()}\n\nLanjut ke Pembayaran...`);
            // window.location.href = 'payment.html'; // Aktifkan jika sudah ada file payment.html
        });
    });

});