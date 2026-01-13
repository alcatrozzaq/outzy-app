window.addEventListener('DOMContentLoaded', async () => {

    // --- KONFIGURASI ---
    const API_URL = 'http://localhost:3000/api/locations'; // Backend Anda
    // const API_URL = 'https://nama-app-anda.onrender.com/api/locations'; // Ganti jika online

    // State Global
    let allLocationsData = [];
    let currentMountain = null;
    let currentBasecamp = null;
    let selectedAddons = [];
    let selectedGuide = null;
    let totalPrice = 0;

    // --- 0. CEK STATUS LOGIN & NAVIGASI MOBILE ---
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        
        // Update Link Navigasi Bawah (Mobile)
        const mobileAccountLink = document.querySelector('.bottom-nav a[href*="login.html"], .bottom-nav a[href*="akun.html"]');
        if (isLoggedIn === 'true' && mobileAccountLink) {
            mobileAccountLink.href = 'akun.html';
            mobileAccountLink.innerHTML = '<i class="fa-solid fa-user"></i> Akun';
        }
    }
    checkLoginStatus();

    // --- 1. VALIDASI AKSES USER ---
    function validateUserAccess(actionName) {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn !== 'true') {
            const confirmLogin = confirm(`Fitur "${actionName}" hanya untuk Member.\nSilakan login dulu.`);
            if (confirmLogin) window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    // --- 2. AMBIL DATA DARI SERVER ---
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id')); // Pastikan jadi integer

    if (!id) {
        alert("ID Gunung tidak valid.");
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Gagal mengambil data");
        
        allLocationsData = await response.json();
        
        // Cari Gunung berdasarkan ID
        currentMountain = allLocationsData.find(item => item.id === id);

        if (!currentMountain) throw new Error("Gunung tidak ditemukan di database.");
        
        // Set Basecamp Default (Yang pertama)
        if (currentMountain.basecamps && currentMountain.basecamps.length > 0) {
            currentBasecamp = currentMountain.basecamps[0];
        }

        renderPage(); // Tampilkan Data ke Layar

    } catch (error) {
        console.error("Error:", error);
        document.querySelector('main').innerHTML = `<div style="text-align:center; padding:50px;"><h2>Error: ${error.message}</h2><a href="index.html">Kembali</a></div>`;
    }

    // --- 3. RENDER HALAMAN UTAMA ---
    function renderPage() {
        // A. Header Info
        const titleEl = document.getElementById('nama-gunung');
        const locEl = document.getElementById('lokasi-gunung');
        const ratingEl = document.querySelector('.rating span');

        if (titleEl) titleEl.innerText = currentMountain.mountain_name;
        if (locEl) locEl.innerText = currentMountain.location;
        if (ratingEl && currentBasecamp) ratingEl.innerText = currentBasecamp.rating || '4.8';

        // B. Render Dropdown Basecamp
        renderBasecampSelector();

        // C. Update UI Awal
        updateBasecampUI();
    }

    // --- 4. RENDER DROPDOWN BASECAMP ---
    function renderBasecampSelector() {
        const container = document.getElementById('basecamp-selection-panel'); // Pastikan ada div ini di HTML
        if (!container || !currentMountain.basecamps) return;

        let html = `<label style="font-weight:bold; display:block; margin-bottom:8px;">Pilih Jalur Pendakian:</label>
                    <select id="basecamp-select" style="width:100%; padding:10px; border-radius:8px; border:1px solid #ddd; margin-bottom:15px;">`;
        
        currentMountain.basecamps.forEach((bc, index) => {
            html += `<option value="${index}">Via ${bc.name} - Rp ${parseInt(bc.price).toLocaleString('id-ID')}</option>`;
        });
        html += `</select>`;

        container.innerHTML = html;

        // Event Listener Ganti Basecamp
        document.getElementById('basecamp-select').addEventListener('change', (e) => {
            const idx = e.target.value;
            currentBasecamp = currentMountain.basecamps[idx];
            
            // Reset pilihan addons saat ganti basecamp
            selectedAddons = [];
            selectedGuide = null;
            
            updateBasecampUI();
        });
    }

    // --- 5. UPDATE UI (Saat Basecamp Berubah) ---
    function updateBasecampUI() {
        if (!currentBasecamp) return;

        // 1. Gambar Utama
        const mainImg = document.getElementById('gambar-utama');
        if (mainImg) mainImg.src = currentBasecamp.image;

        // 2. Harga Tiket Dasar
        const priceEl = document.getElementById('harga-tiket');
        if (priceEl) {
            priceEl.innerText = `Rp ${parseInt(currentBasecamp.price).toLocaleString('id-ID')}`;
        }

        // 3. Render Tab (Deskripsi/Info/Fasilitas)
        renderActiveTab();

        // 4. Render Add-ons (Sewa Alat)
        renderAddons();

        // 5. Hitung Ulang Total
        calculateTotal();
    }

    // --- 6. RENDER ADD-ONS (ALAT & GUIDE) ---
    function renderAddons() {
        const container = document.getElementById('addons-container'); // Pastikan ID ini ada di HTML (di bawah dropdown basecamp)
        if (!container) return;

        let html = `<div style="margin-top:20px; border-top:1px solid #eee; padding-top:15px;">
                    <h4 style="margin-bottom:10px;">Tambahan (Opsional)</h4>`;

        // A. Render Alat Sewa
        if (currentBasecamp.addons && currentBasecamp.addons.length > 0) {
            currentBasecamp.addons.forEach((addon, index) => {
                html += `
                <div style="display:flex; justify-content:space-between; margin-bottom:10px; align-items:center;">
                    <label>
                        <input type="checkbox" class="addon-checkbox" data-price="${addon.price}" data-name="${addon.name}"> 
                        ${addon.name}
                    </label>
                    <span style="font-size:0.9rem; color:#666;">+Rp ${parseInt(addon.price).toLocaleString('id-ID')}</span>
                </div>`;
            });
        } else {
            html += `<p style="font-size:0.8rem; color:#999;">Tidak ada sewa alat di jalur ini.</p>`;
        }

        html += `</div>`;
        container.innerHTML = html;

        // Event Listener Checkbox
        document.querySelectorAll('.addon-checkbox').forEach(box => {
            box.addEventListener('change', calculateTotal);
        });
    }

    // --- 7. LOGIKA TAB (Deskripsi/Info) ---
    function renderActiveTab() {
        const activeTab = document.querySelector('.tab-link.active');
        const container = document.getElementById('tab-content-container') || document.getElementById('deskripsi-lengkap');
        
        if (activeTab && container && currentBasecamp.details) {
            const key = activeTab.dataset.tab; // deskripsi, infoJalur, fasilitas, ulasan
            // Ambil konten dari DB, jika kosong pakai default
            const content = currentBasecamp.details[key] || '<p>Informasi belum tersedia.</p>';
            container.innerHTML = content;
        }
    }

    // Event Listener Klik Tab
    document.querySelectorAll('.tab-link').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.tab-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            renderActiveTab();
        });
    });

    // --- 8. HITUNG TOTAL HARGA ---
    function calculateTotal() {
        // Harga Dasar
        let total = parseInt(currentBasecamp.price || 0);
        let detailsText = [`Tiket Masuk: Rp ${total.toLocaleString()}`];

        // Tambah Addons
        const checkboxes = document.querySelectorAll('.addon-checkbox:checked');
        selectedAddons = []; // Reset
        checkboxes.forEach(box => {
            const price = parseInt(box.dataset.price);
            const name = box.dataset.name;
            total += price;
            selectedAddons.push({ name, price });
            detailsText.push(`${name}: Rp ${price.toLocaleString()}`);
        });

        // Update UI Total
        const totalEl = document.getElementById('total-price-display'); // Buat elemen ini di HTML jika belum ada
        if (totalEl) totalEl.innerText = `Rp ${total.toLocaleString('id-ID')}`;

        // Simpan total global
        totalPrice = total;
        return detailsText;
    }

    // --- 9. TOMBOL BOOKING (PESAN) ---
    const bookBtns = document.querySelectorAll('.btn-book, #tombol-pesan-bawah');

    bookBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Cek Login
            if (!validateUserAccess('Booking Tiket')) return;

            // 2. Siapkan Data Pesanan
            const orderSummary = {
                mountainId: currentMountain.id,
                mountainName: currentMountain.mountain_name,
                basecampName: currentBasecamp.name,
                basecampId: currentBasecamp.id,
                date: new Date().toISOString().split('T')[0], // Tanggal hari ini
                items: selectedAddons,
                totalPrice: totalPrice,
                image: currentBasecamp.image
            };

            // 3. Simpan ke LocalStorage
            localStorage.setItem('tempOrder', JSON.stringify(orderSummary));

            // 4. Konfirmasi & Redirect
            const konfirmasi = confirm(`Konfirmasi Pesanan:\n\nGunung: ${orderSummary.mountainName}\nJalur: ${orderSummary.basecampName}\nTotal: Rp ${orderSummary.totalPrice.toLocaleString()}\n\nLanjut ke pembayaran?`);
            
            if (konfirmasi) {
                // Redirect ke halaman payment (Pastikan file ini ada)
                // window.location.href = 'payment.html'; 
                alert("Simulasi: Mengarahkan ke Payment Gateway...");
            }
        });
    });

    // --- 10. AUTO SCROLL KE FORM BOOKING (Jika klik tombol di header) ---
    const heroBookBtn = document.querySelector('.hero-book-btn'); // Tombol "Pesan Sekarang" di atas
    if (heroBookBtn) {
        heroBookBtn.addEventListener('click', () => {
            const target = document.getElementById('basecamp-selection-panel');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    }

});