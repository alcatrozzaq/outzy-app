document.addEventListener('DOMContentLoaded', async () => {

    // --- 1. KONFIGURASI SERVER ---
    const API_BASE_URL = 'https://outzy-api.onrender.com'; // Server Online
    // const API_BASE_URL = 'http://localhost:3000'; // Server Laptop

    // --- 2. STATE GLOBAL ---
    let allLocations = [], allGuides = [];
    let currentMountain = null, currentBasecamp = null;
    let selectedAddons = [], selectedGuides = []; // Array untuk simpan pilihan
    let bookingType = 'simple'; // 'simple' (Tiket Saja) atau 'advanced' (Paket Lengkap)
    let totalPrice = 0;

    // --- 3. CEK LOGIN ---
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

    // --- 5. FETCH DATA ---
    try {
        const [locRes, guideRes] = await Promise.all([
            fetch(`${API_BASE_URL}/api/locations`),
            fetch(`${API_BASE_URL}/api/guides`)
        ]);

        if (!locRes.ok) throw new Error('Gagal mengambil data lokasi');
        allLocations = await locRes.json();
        
        if (guideRes.ok) allGuides = await guideRes.json();

        currentMountain = allLocations.find(item => item.id === id);
        if (!currentMountain) throw new Error('Gunung tidak ditemukan.');

        // Default Basecamp
        if (currentMountain.basecamps?.length > 0) {
            currentBasecamp = currentMountain.basecamps[0];
        }

        renderPage();

    } catch (error) {
        console.error(error);
        document.querySelector('main').innerHTML = `<h2 style="text-align:center; margin-top:50px;">Gagal memuat data: ${error.message}</h2>`;
    }

    // --- 6. RENDER HALAMAN UTAMA ---
    function renderPage() {
        document.getElementById('nama-gunung').innerText = currentMountain.mountain_name;
        document.getElementById('lokasi-gunung').innerText = currentMountain.location;

        renderBasecampSelector(); // Dropdown Jalur
        updateBasecampUI();       // Update Tampilan Awal
        renderBookingSection();   // INI FITUR BARU: Tipe Pemesanan & Addons
    }

    // --- 7. LOGIKA JALUR PENDAKIAN ---
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

        document.getElementById('basecamp-select').addEventListener('change', (e) => {
            currentBasecamp = currentMountain.basecamps[e.target.value];
            // Reset pilihan saat ganti jalur
            selectedAddons = []; selectedGuides = [];
            renderBookingSection(); // Render ulang form booking
            updateBasecampUI();
        });
    }

    function updateBasecampUI() {
        if (!currentBasecamp) return;
        const mainImg = document.getElementById('gambar-utama');
        if (mainImg) mainImg.src = currentBasecamp.image;
        
        // Update Tab
        const activeTab = document.querySelector('.tab-link.active');
        if (activeTab && currentBasecamp.details) {
            const container = document.getElementById('tab-content-container') || document.getElementById('deskripsi-lengkap');
            container.innerHTML = currentBasecamp.details[activeTab.dataset.tab] || '';
        }
        calculateTotal();
    }

    // --- 8. LOGIKA BOOKING TYPE & ADDONS (YANG HILANG) ---
    function renderBookingSection() {
        // Cari container tempat menaruh form. 
        // Kita cari elemen setelah deskripsi atau buat container baru jika belum ada.
        let bookingContainer = document.getElementById('booking-ui-container');
        
        if (!bookingContainer) {
            // Jika tidak ada di HTML, kita buat otomatis di bawah Tabs
            const tabs = document.querySelector('.tabs-container') || document.getElementById('deskripsi-lengkap');
            bookingContainer = document.createElement('div');
            bookingContainer.id = 'booking-ui-container';
            bookingContainer.style.marginTop = '20px';
            bookingContainer.style.padding = '15px';
            bookingContainer.style.background = '#fff';
            bookingContainer.style.borderRadius = '12px';
            bookingContainer.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            
            if(tabs) tabs.parentNode.insertBefore(bookingContainer, tabs.nextSibling);
        }

        // HTML untuk Pilihan Tipe
        bookingContainer.innerHTML = `
            <h3 style="margin-bottom:15px; font-size:1.1rem;">Pilih Tipe Pemesanan</h3>
            
            <div style="display:flex; gap:10px; margin-bottom:20px;">
                <button id="btn-simple" class="type-btn active" style="flex:1; padding:10px; border:1px solid #007bff; background:#007bff; color:white; border-radius:8px; cursor:pointer;">
                    🎫 Tiket Masuk
                </button>
                <button id="btn-advanced" class="type-btn" style="flex:1; padding:10px; border:1px solid #ddd; background:white; color:#333; border-radius:8px; cursor:pointer;">
                    🎒 Paket Lengkap
                </button>
            </div>

            <div id="booking-form-content">
                <label style="display:block; margin-bottom:5px; font-size:0.9rem;">Tanggal Pendakian</label>
                <input type="date" id="input-date" style="width:100%; padding:10px; margin-bottom:15px; border:1px solid #ddd; border-radius:8px;">

                <label style="display:block; margin-bottom:5px; font-size:0.9rem;">Jumlah Orang (Pax)</label>
                <input type="number" id="input-pax" value="1" min="1" style="width:100%; padding:10px; margin-bottom:15px; border:1px solid #ddd; border-radius:8px;">

                <div id="advanced-options" style="display:none; border-top:1px solid #eee; padding-top:15px;">
                    <h4 style="font-size:1rem; margin-bottom:10px;">Tambahan (Add-ons)</h4>
                    <div id="addons-list"></div>
                    
                    <h4 style="font-size:1rem; margin:15px 0 10px;">Pemandu (Guide)</h4>
                    <div id="guides-list"></div>
                </div>
            </div>
        `;

        // Render List Addons & Guides
        renderAddonItems();
        renderGuideItems();

        // Event Listener Tombol Tipe
        const btnSimple = document.getElementById('btn-simple');
        const btnAdvanced = document.getElementById('btn-advanced');
        const advancedOptions = document.getElementById('advanced-options');

        btnSimple.addEventListener('click', () => {
            bookingType = 'simple';
            toggleTypeBtn(btnSimple, btnAdvanced);
            advancedOptions.style.display = 'none';
            selectedAddons = []; selectedGuides = []; // Reset pilihan tambahan
            uncheckAllBoxes();
            calculateTotal();
        });

        btnAdvanced.addEventListener('click', () => {
            bookingType = 'advanced';
            toggleTypeBtn(btnAdvanced, btnSimple);
            advancedOptions.style.display = 'block';
            calculateTotal();
        });

        // Event Listener Input
        document.getElementById('input-pax').addEventListener('input', calculateTotal);
    }

    function toggleTypeBtn(activeBtn, inactiveBtn) {
        activeBtn.style.background = '#007bff';
        activeBtn.style.color = 'white';
        activeBtn.style.borderColor = '#007bff';
        
        inactiveBtn.style.background = 'white';
        inactiveBtn.style.color = '#333';
        inactiveBtn.style.borderColor = '#ddd';
    }

    function renderAddonItems() {
        const container = document.getElementById('addons-list');
        if (!currentBasecamp.addons || currentBasecamp.addons.length === 0) {
            container.innerHTML = '<p style="color:#888; font-size:0.9rem;">Tidak ada alat sewa.</p>';
            return;
        }

        container.innerHTML = currentBasecamp.addons.map(addon => `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <label style="display:flex; align-items:center; cursor:pointer;">
                    <input type="checkbox" class="addon-check" value="${addon.name}" data-price="${addon.price}" style="margin-right:8px;">
                    ${addon.name}
                </label>
                <span style="color:#27ae60; font-size:0.9rem;">+Rp ${parseInt(addon.price).toLocaleString()}</span>
            </div>
        `).join('');
        
        // Listen changes
        container.querySelectorAll('.addon-check').forEach(box => {
            box.addEventListener('change', calculateTotal);
        });
    }

    function renderGuideItems() {
        const container = document.getElementById('guides-list');
        // Filter guide yang tersedia di basecamp ini
        const availableGuides = currentBasecamp.guides 
            ? currentBasecamp.guides.map(id => allGuides.find(g => g.id === id)).filter(Boolean)
            : [];

        if (availableGuides.length === 0) {
            container.innerHTML = '<p style="color:#888; font-size:0.9rem;">Tidak ada guide tersedia.</p>';
            return;
        }

        container.innerHTML = availableGuides.map(guide => `
            <div style="display:flex; align-items:center; margin-bottom:10px; border:1px solid #f0f0f0; padding:8px; border-radius:8px;">
                <input type="checkbox" class="guide-check" value="${guide.name}" data-price="${guide.price}" style="margin-right:10px;">
                <img src="${guide.photo}" style="width:35px; height:35px; border-radius:50%; object-fit:cover; margin-right:10px;" onerror="this.src='aset/default-user.png'">
                <div style="flex:1;">
                    <div style="font-weight:bold; font-size:0.9rem;">${guide.name}</div>
                    <div style="font-size:0.8rem; color:#666;">⭐ ${guide.rating}</div>
                </div>
                <div style="font-weight:bold; color:#e67e22; font-size:0.9rem;">Rp ${parseInt(guide.price).toLocaleString()}</div>
            </div>
        `).join('');

        // Listen changes
        container.querySelectorAll('.guide-check').forEach(box => {
            box.addEventListener('change', calculateTotal);
        });
    }

    function uncheckAllBoxes() {
        document.querySelectorAll('.addon-check, .guide-check').forEach(box => box.checked = false);
    }

    // --- 9. HITUNG TOTAL HARGA ---
    function calculateTotal() {
        if (!currentBasecamp) return;

        const paxInput = document.getElementById('input-pax');
        const pax = parseInt(paxInput ? paxInput.value : 1) || 1;
        const ticketPrice = parseInt(currentBasecamp.price);
        
        let total = ticketPrice * pax; // Harga Dasar x Jumlah Orang

        // Tambah Addons (Jika Advanced)
        selectedAddons = [];
        if (bookingType === 'advanced') {
            document.querySelectorAll('.addon-check:checked').forEach(box => {
                const price = parseInt(box.dataset.price);
                total += price; // Harga alat biasanya per unit, bisa dikali hari jika mau kompleks
                selectedAddons.push({ name: box.value, price: price });
            });

            // Tambah Guides
            selectedGuides = [];
            document.querySelectorAll('.guide-check:checked').forEach(box => {
                const price = parseInt(box.dataset.price);
                total += price;
                selectedGuides.push({ name: box.value, price: price });
            });
        }

        // Update UI
        const priceEl = document.getElementById('harga-tiket');
        if(priceEl) priceEl.innerText = `Rp ${ticketPrice.toLocaleString('id-ID')} / pax`;

        const totalDisplays = document.querySelectorAll('#total-price-display, #mobile-price-display');
        totalDisplays.forEach(el => el.innerText = `Rp ${total.toLocaleString('id-ID')}`);
        
        totalPrice = total;
    }

    // --- 10. TOMBOL BOOKING ---
    const bookBtns = document.querySelectorAll('.btn-book, #tombol-pesan-bawah, #book-now-btn, #mobile-book-btn');
    bookBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (isLoggedIn !== 'true') {
                if(confirm("Silakan login untuk memesan.")) window.location.href = 'login.html';
                return;
            }

            const dateInput = document.getElementById('input-date');
            if (!dateInput || !dateInput.value) {
                alert("Mohon pilih tanggal pendakian.");
                dateInput?.focus();
                return;
            }

            const orderData = {
                mountainId: currentMountain.id,
                mountainName: currentMountain.mountain_name,
                basecampName: currentBasecamp.name,
                date: dateInput.value,
                pax: document.getElementById('input-pax').value,
                items: [...selectedAddons, ...selectedGuides],
                totalPrice: totalPrice,
                image: currentBasecamp.image,
                type: bookingType === 'simple' ? 'Tiket Masuk' : 'Paket Lengkap'
            };

            localStorage.setItem('tempOrder', JSON.stringify(orderData));
            
            // Animasi Loading
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ...';
            btn.disabled = true;

            setTimeout(() => {
                alert(`Pesanan Berhasil!\n\nTipe: ${orderData.type}\nTotal: Rp ${totalPrice.toLocaleString('id-ID')}\n\nSilakan cek halaman pesanan.`);
                window.location.reload(); 
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1000);
        });
    });

    // Tab Handling (Tambahan)
    document.querySelectorAll('.tab-link').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelectorAll('.tab-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            if (currentBasecamp && currentBasecamp.details) {
                document.getElementById('tab-content-container').innerHTML = currentBasecamp.details[link.dataset.tab];
            }
        });
    });
});