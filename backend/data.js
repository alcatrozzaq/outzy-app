document.addEventListener('DOMContentLoaded', async () => {

    // --- 1. KONFIGURASI SERVER ---
    // Gunakan Link Render agar Vercel bisa akses data (Fix Error Merah/CORS)
    const API_BASE_URL = 'https://outzy-api.onrender.com';
    // const API_BASE_URL = 'http://localhost:3000'; // Gunakan ini HANYA jika tes di laptop

    // --- 2. STATE GLOBAL (PENYIMPANAN DATA) ---
    let allLocations = [], allGuides = [];
    let currentMountain = null, currentBasecamp = null;
    let selectedAddons = [], selectedGuides = []; 
    let bookingType = 'simple'; // Default: Tiket Saja
    let totalPrice = 0;

    // --- 3. CEK LOGIN (NAVIGASI) ---
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const mobileAccountLink = document.querySelector('.bottom-nav a[href*="login.html"], .bottom-nav a[href*="akun.html"]');
    if (isLoggedIn === 'true' && mobileAccountLink) {
        mobileAccountLink.href = 'akun.html';
        mobileAccountLink.innerHTML = '<i class="fa-solid fa-user"></i> Akun';
    }

    // --- 4. AMBIL ID DARI URL ---
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));

    if (!id) {
        document.body.innerHTML = '<div style="text-align:center; padding:50px;"><h2>ID Tidak Valid</h2><a href="index.html">Kembali</a></div>';
        return;
    }

    // --- 5. FETCH DATA DARI SERVER ---
    try {
        // Ambil Data Lokasi & Guide Secara Bersamaan
        const [locRes, guideRes] = await Promise.all([
            fetch(`${API_BASE_URL}/api/locations`),
            fetch(`${API_BASE_URL}/api/guides`)
        ]);

        if (locRes.ok) allLocations = await locRes.json();
        // Guide mungkin error/kosong, tidak apa-apa
        if (guideRes.ok) allGuides = await guideRes.json();

        // Cari Gunung Sesuai ID
        currentMountain = allLocations.find(item => item.id === id);
        if (!currentMountain) throw new Error('Gunung tidak ditemukan di database.');

        // Set Basecamp Default (Yang Pertama)
        if (currentMountain.basecamps && currentMountain.basecamps.length > 0) {
            currentBasecamp = currentMountain.basecamps[0];
        }

        renderPage();

    } catch (error) {
        console.error("Critical Error:", error);
        document.querySelector('main').innerHTML = `
            <div style="text-align:center; padding: 4rem; font-family: sans-serif;">
                <h2>Gagal Memuat Data 😔</h2>
                <p>${error.message}</p>
                <a href="index.html" style="color: blue; text-decoration: underline;">Kembali ke Beranda</a>
            </div>
        `;
    }

    // --- 6. RENDER HALAMAN UTAMA ---
    function renderPage() {
        // Isi Judul & Lokasi
        document.getElementById('nama-gunung').innerText = currentMountain.mountain_name;
        document.getElementById('lokasi-gunung').innerText = currentMountain.location;

        // Render Dropdown Pilihan Jalur
        renderBasecampSelector();
        
        // Update Tampilan (Gambar, Harga, Plugin Booking)
        updateBasecampUI();
    }

    // --- 7. LOGIKA JALUR PENDAKIAN (DROPDOWN) ---
    function renderBasecampSelector() {
        const container = document.getElementById('basecamp-selection-panel');
        if (!container || !currentMountain.basecamps) return;

        let html = `<label style="font-weight:bold; display:block; margin-bottom:8px;">Pilih Jalur Pendakian:</label>
                    <select id="basecamp-select" style="width:100%; padding:12px; border-radius:8px; border:1px solid #ddd; margin-bottom:15px;">`;
        currentMountain.basecamps.forEach((bc, index) => {
            html += `<option value="${index}">Via ${bc.name}</option>`;
        });
        html += `</select>`;
        container.innerHTML = html;

        // Saat Ganti Jalur
        document.getElementById('basecamp-select').addEventListener('change', (e) => {
            currentBasecamp = currentMountain.basecamps[e.target.value];
            // Reset Pilihan
            selectedAddons = []; selectedGuides = [];
            bookingType = 'simple'; // Reset ke tiket saja
            
            updateBasecampUI();
        });
    }

    function updateBasecampUI() {
        if (!currentBasecamp) return;
        
        // Update Gambar Utama
        const mainImg = document.getElementById('gambar-utama');
        if (mainImg) mainImg.src = currentBasecamp.image;

        // Update Rating
        const ratingEl = document.querySelector('.rating span');
        if (ratingEl) ratingEl.innerText = currentBasecamp.rating || '4.8';

        // Render Ulang Kotak Pemesanan (Ini Fitur Intinya!)
        renderBookingPlugin();
        
        // Hitung Total Awal
        calculateTotal();

        // Update Konten Tab (Deskripsi)
        const activeTab = document.querySelector('.tab-link.active');
        if (activeTab && currentBasecamp.details) {
            const container = document.getElementById('tab-content-container') || document.getElementById('deskripsi-lengkap');
            container.innerHTML = currentBasecamp.details[activeTab.dataset.tab] || '';
        }
    }

    // --- 8. RENDER PLUGIN PEMESANAN (YANG TADINYA KOSONG) ---
    function renderBookingPlugin() {
        // Cari wadah di HTML
        let container = document.getElementById('booking-plugin-area');
        
        // Jika tidak ada di HTML, kita buat otomatis di bawah Tabs
        if (!container) {
            const tabs = document.querySelector('.tabs-container') || document.getElementById('deskripsi-lengkap');
            if (tabs && tabs.parentNode) {
                container = document.createElement('div');
                container.id = 'booking-plugin-area';
                tabs.parentNode.insertBefore(container, tabs.nextSibling);
            } else {
                return; // Gagal menemukan tempat inject
            }
        }

        // INJECT HTML KE DALAM WADAH
        container.innerHTML = `
            <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-top: 20px;">
                <h3 style="margin-top:0; margin-bottom: 15px;">Pilih Tipe Pemesanan</h3>
                
                <div style="display:flex; gap:10px; margin-bottom:20px;">
                    <div id="btn-simple" class="option-card active" style="flex:1; padding:15px; border:2px solid #007bff; background:#eaf4ff; border-radius:10px; cursor:pointer; text-align:center;">
                        <div style="font-size:1.5rem;">🎫</div>
                        <div style="font-weight:bold; margin-top:5px;">Tiket Saja</div>
                    </div>
                    <div id="btn-advanced" class="option-card" style="flex:1; padding:15px; border:2px solid #eee; background:white; border-radius:10px; cursor:pointer; text-align:center;">
                        <div style="font-size:1.5rem;">🎒</div>
                        <div style="font-weight:bold; margin-top:5px;">Paket Lengkap</div>
                    </div>
                </div>

                <div id="booking-form">
                    <label style="display:block; font-size:0.9rem; margin-bottom:5px; font-weight:bold;">Tanggal Pendakian</label>
                    <input type="date" id="input-date" style="width:100%; padding:12px; border:1px solid #ddd; border-radius:8px; margin-bottom:15px;">

                    <label style="display:block; font-size:0.9rem; margin-bottom:5px; font-weight:bold;">Jumlah Pendaki (Pax)</label>
                    <input type="number" id="input-pax" value="1" min="1" style="width:100%; padding:12px; border:1px solid #ddd; border-radius:8px; margin-bottom:15px;">
                </div>

                <div id="advanced-options" style="display:none; border-top:1px solid #eee; padding-top:15px; margin-top:10px;">
                    <h4 style="margin-bottom:10px;">Sewa Alat & Guide</h4>
                    <div id="addons-list"></div>
                    <div id="guides-list" style="margin-top:15px;"></div>
                </div>
            </div>
        `;

        // ISI DATA ALAT & GUIDE
        fillAddonsAndGuides();

        // LOGIKA KLIK TOMBOL TIPE
        const btnSimple = document.getElementById('btn-simple');
        const btnAdvanced = document.getElementById('btn-advanced');
        const advancedOptions = document.getElementById('advanced-options');

        btnSimple.addEventListener('click', () => {
            bookingType = 'simple';
            styleActiveBtn(btnSimple, btnAdvanced);
            advancedOptions.style.display = 'none';
            uncheckAll(); // Reset checkbox
            calculateTotal();
        });

        btnAdvanced.addEventListener('click', () => {
            bookingType = 'advanced';
            styleActiveBtn(btnAdvanced, btnSimple);
            advancedOptions.style.display = 'block';
            calculateTotal();
        });

        // Event Listener Input Jumlah Orang
        document.getElementById('input-pax').addEventListener('input', calculateTotal);
    }

    // --- HELPER: GANTI WARNA TOMBOL ---
    function styleActiveBtn(active, inactive) {
        active.style.borderColor = '#007bff';
        active.style.backgroundColor = '#eaf4ff';
        inactive.style.borderColor = '#eee';
        inactive.style.backgroundColor = 'white';
    }

    // --- HELPER: RENDER LIST CHECKBOX ---
    function fillAddonsAndGuides() {
        // Render Addons (Tenda, dll)
        const addonsContainer = document.getElementById('addons-list');
        if (currentBasecamp.addons && currentBasecamp.addons.length > 0) {
            addonsContainer.innerHTML = currentBasecamp.addons.map(item => `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <label style="display:flex; align-items:center; cursor:pointer; width:100%;">
                        <input type="checkbox" class="addon-check" value="${item.name}" data-price="${item.price}" style="transform:scale(1.2); margin-right:10px;">
                        <span>${item.name}</span>
                    </label>
                    <span style="color:#27ae60; font-weight:bold;">+Rp ${parseInt(item.price).toLocaleString()}</span>
                </div>
            `).join('');
        } else {
            addonsContainer.innerHTML = '<p style="color:#999; font-size:0.9rem;">Tidak ada alat sewa.</p>';
        }

        // Render Guides
        const guidesContainer = document.getElementById('guides-list');
        const availableGuides = currentBasecamp.guides 
            ? currentBasecamp.guides.map(id => allGuides.find(g => g.id === id)).filter(Boolean)
            : [];
            
        if (availableGuides.length > 0) {
            guidesContainer.innerHTML = availableGuides.map(g => `
                <div style="display:flex; align-items:center; margin-bottom:10px; border:1px solid #f0f0f0; padding:10px; border-radius:8px;">
                    <input type="checkbox" class="guide-check" value="${g.name}" data-price="${g.price}" style="transform:scale(1.2); margin-right:10px;">
                    <img src="${g.photo}" style="width:30px; height:30px; border-radius:50%; object-fit:cover; margin-right:10px;" onerror="this.src='aset/default-user.png'">
                    <div style="flex:1;">
                        <div style="font-weight:bold; font-size:0.9rem;">${g.name}</div>
                        <div style="font-size:0.8rem;">⭐ ${g.rating}</div>
                    </div>
                    <span style="color:#e67e22; font-weight:bold;">+Rp ${parseInt(g.price).toLocaleString()}</span>
                </div>
            `).join('');
        } else {
            guidesContainer.innerHTML = '<p style="color:#999; font-size:0.9rem;">Guide tidak tersedia.</p>';
        }

        // Pasang Event Listener Checkbox
        document.querySelectorAll('.addon-check, .guide-check').forEach(box => {
            box.addEventListener('change', calculateTotal);
        });
    }

    function uncheckAll() {
        document.querySelectorAll('.addon-check, .guide-check').forEach(box => box.checked = false);
    }

    // --- 9. HITUNG TOTAL HARGA ---
    function calculateTotal() {
        const pax = parseInt(document.getElementById('input-pax')?.value || 1);
        let basePrice = parseInt(currentBasecamp.price || 0);
        let total = basePrice * pax;

        if (bookingType === 'advanced') {
            document.querySelectorAll('.addon-check:checked').forEach(box => {
                total += parseInt(box.dataset.price);
            });
            document.querySelectorAll('.guide-check:checked').forEach(box => {
                total += parseInt(box.dataset.price);
            });
        }

        // Update UI
        const priceEl = document.getElementById('harga-tiket');
        if(priceEl) priceEl.innerText = `Rp ${basePrice.toLocaleString()} / pax`;
        
        const totalEls = document.querySelectorAll('#total-price-display, #mobile-price-display');
        totalEls.forEach(el => el.innerText = `Rp ${total.toLocaleString('id-ID')}`);
        
        totalPrice = total;
    }

    // --- 10. TOMBOL BOOKING ---
    const bookBtns = document.querySelectorAll('.btn-book, #tombol-pesan-bawah, #book-now-btn, #mobile-book-btn');
    bookBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (isLoggedIn !== 'true') {
                if(confirm("Fitur Booking hanya untuk Member. Login sekarang?")) {
                    window.location.href = 'login.html';
                }
                return;
            }

            const dateVal = document.getElementById('input-date')?.value;
            if (!dateVal) {
                alert("Mohon pilih tanggal pendakian.");
                return;
            }

            // Kumpulkan Data Item Tambahan
            let items = [];
            document.querySelectorAll('.addon-check:checked').forEach(b => items.push({name: b.value, price: parseInt(b.dataset.price)}));
            document.querySelectorAll('.guide-check:checked').forEach(b => items.push({name: b.value, price: parseInt(b.dataset.price)}));

            const orderData = {
                mountainName: currentMountain.mountain_name,
                basecampName: currentBasecamp.name,
                date: dateVal,
                pax: document.getElementById('input-pax').value,
                type: bookingType === 'simple' ? 'Tiket Masuk' : 'Paket Lengkap',
                items: items,
                totalPrice: totalPrice,
                image: currentBasecamp.image
            };

            // Simpan ke LocalStorage
            localStorage.setItem('tempOrder', JSON.stringify(orderData));
            
            // Animasi Loading
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses...';
            btn.disabled = true;

            setTimeout(() => {
                alert(`✅ Pesanan Berhasil!\n\nTipe: ${orderData.type}\nTotal: Rp ${totalPrice.toLocaleString('id-ID')}\n\nSilakan cek halaman pesanan.`);
                // window.location.href = 'pesanan.html'; // Uncomment jika sudah ada
                window.location.reload(); 
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1000);
        });
    });

    // --- 11. TAB LOGIC (Deskripsi/Info) ---
    document.querySelectorAll('.tab-link').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelectorAll('.tab-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            if (currentBasecamp && currentBasecamp.details) {
                const container = document.getElementById('tab-content-container') || document.getElementById('deskripsi-lengkap');
                container.innerHTML = currentBasecamp.details[link.dataset.tab] || '';
            }
        });
    });
});