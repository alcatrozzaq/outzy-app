document.addEventListener('DOMContentLoaded', async () => {

    // --- 1. KONFIGURASI SERVER ---
    // Gunakan Link Render agar Vercel bisa mengambil data tanpa diblokir
    // const API_BASE_URL = 'http://localhost:3000'; // <-- Mode Laptop (Localhost)
    const API_BASE_URL = 'https://outzy-api.onrender.com'; // <-- Mode Online (Vercel)

    // --- 2. STATE (VARIABEL GLOBAL) ---
    let allLocations = [];
    let allGuides = [];
    let currentMountain = null;
    let currentBasecamp = null;
    let selectedAddons = [];
    let selectedGuides = [];
    let totalPrice = 0;

    // --- 3. CEK LOGIN (NAVIGASI) ---
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
        document.body.innerHTML = '<div style="text-align:center; padding:50px;"><h2>ID Tidak Valid</h2><a href="index.html">Kembali</a></div>';
        return;
    }

    // --- 5. FETCH DATA DARI SERVER ---
    try {
        // A. Ambil Data Gunung
        const locResponse = await fetch(`${API_BASE_URL}/api/locations`);
        if (!locResponse.ok) throw new Error('Gagal mengambil data lokasi');
        allLocations = await locResponse.json();

        // B. Ambil Data Guide (Opsional)
        try {
            const guideResponse = await fetch(`${API_BASE_URL}/api/guides`);
            if (guideResponse.ok) {
                allGuides = await guideResponse.json();
            }
        } catch (err) {
            console.warn("Info: Data guide belum tersedia.");
        }

        // C. Cari Gunung Sesuai ID
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
        document.querySelector('main').innerHTML = `
            <div style="text-align:center; padding: 4rem; font-family: sans-serif;">
                <h2>Gagal Memuat Data 😔</h2>
                <p>${error.message}</p>
                <a href="index.html" style="color: blue; text-decoration: underline;">Kembali ke Beranda</a>
            </div>
        `;
    }

    // --- 6. RENDER TAMPILAN UTAMA ---
    function renderPage() {
        // Isi Judul & Lokasi
        const titleEl = document.getElementById('nama-gunung');
        const locEl = document.getElementById('lokasi-gunung');
        
        if (titleEl) titleEl.innerText = currentMountain.mountain_name;
        if (locEl) locEl.innerText = currentMountain.location;

        // Render Dropdown Pilihan Jalur
        renderBasecampSelector();

        // Update UI sisanya
        updateBasecampUI();
    }

    // --- 7. RENDER DROPDOWN JALUR ---
    function renderBasecampSelector() {
        const container = document.getElementById('basecamp-selection-panel');
        
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

            // Event Listener: Saat ganti jalur
            document.getElementById('basecamp-select').addEventListener('change', (e) => {
                const idx = e.target.value;
                currentBasecamp = currentMountain.basecamps[idx];
                
                // Reset pilihan alat & guide
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

        // Render Ulang List Alat & Guide
        renderAddons(); 
        renderGuides(); 

        // Hitung Ulang Harga
        calculateTotal();
    }

    // --- 9. RENDER ADD-ONS (SEWA ALAT) ---
    function renderAddons() {
        const container = document.getElementById('addons-container');
        if (!container) return; // Skip jika elemen tidak ada di HTML

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

        // Pasang Event Listener
        container.querySelectorAll('.addon-checkbox').forEach(box => {
            box.addEventListener('change', calculateTotal);
        });
    }

    // --- 10. RENDER GUIDES (PEMANDU) ---
    function renderGuides() {
        let container = document.getElementById('guides-container');
        // Buat container guide otomatis jika belum ada
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

        if (currentBasecamp.guides && currentBasecamp.guides.length > 0 && allGuides.length > 0) {
            currentBasecamp.guides.forEach(guideId => {
                const guideData = allGuides.find(g => g.id === guideId);
                if (guideData) {
                    html += `
                    <div style="display:flex; align-items:center; margin-bottom:15px; border:1px solid #f0f0f0; padding:10px; border-radius:8px;">
                        <input type="checkbox" class="guide-checkbox" value="${guideData.id}" data-price="${guideData.price}" data-name="${guideData.name}" style="margin-right:10px; transform:scale(1.2);">
                        <img src="${guideData.photo}" style="width:40px; height:40px; border-radius:50%; object-fit:cover; margin-right:10px;" onerror="this.src='aset/default-user.png'">
                        <div style="flex-grow:1;">
                            <div style="font-weight:bold;">${guideData.name}</div>
                            <div style="font-size:0.8rem; color:#666;">⭐ ${guideData.rating} • ${guideData.skills.join(', ')}</div>
                        </div>
                        <div style="font-weight:bold; color:#e67e22;">Rp ${parseInt(guideData.price).toLocaleString('id-ID')}</div>
                    </div>`;
                }
            });
        } else {
            html += `<p style="color:#777; font-size: 0.9rem;">Tidak ada pemandu tersedia.</p>`;
        }
        
        html += `</div>`;
        container.innerHTML = html;

        container.querySelectorAll('.guide-checkbox').forEach(box => {
            box.addEventListener('change', calculateTotal);
        });
    }

    // --- 11. SISTEM TAB ---
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

        selectedAddons = [];
        document.querySelectorAll('.addon-checkbox:checked').forEach(box => {
            const price = parseInt(box.dataset.price);
            total += price;
            selectedAddons.push({ name: box.dataset.name, price: price });
        });

        selectedGuides = [];
        document.querySelectorAll('.guide-checkbox:checked').forEach(box => {
            const price = parseInt(box.dataset.price);
            total += price;
            selectedGuides.push({ name: box.dataset.name, price: price });
        });

        // Update Harga Tiket (Atas)
        const priceEl = document.getElementById('harga-tiket');
        if (priceEl) priceEl.innerText = `Rp ${ticketPrice.toLocaleString('id-ID')}`;

        // Update Total (Bawah)
        const totalEl = document.getElementById('total-price-display');
        if (totalEl) totalEl.innerText = `Rp ${total.toLocaleString('id-ID')}`;
        
        // Update Mobile Sticky
        const mobileTotalEl = document.getElementById('mobile-price-display');
        if (mobileTotalEl) mobileTotalEl.innerText = `Rp ${total.toLocaleString('id-ID')}`;

        totalPrice = total;
    }

    // --- 13. TOMBOL BOOKING ---
    const bookBtns = document.querySelectorAll('.btn-book, #tombol-pesan-bawah, #book-now-btn, #mobile-book-btn');

    bookBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            if (isLoggedIn !== 'true') {
                if(confirm("Fitur Booking hanya untuk Member. Login sekarang?")) {
                    window.location.href = 'login.html';
                }
                return;
            }

            if (!currentBasecamp) {
                alert("Data jalur belum dimuat.");
                return;
            }

            const orderData = {
                mountainId: currentMountain.id,
                mountainName: currentMountain.mountain_name,
                basecampName: currentBasecamp.name,
                basecampId: currentBasecamp.id,
                date: new Date().toISOString().split('T')[0],
                items: [...selectedAddons, ...selectedGuides],
                totalPrice: totalPrice,
                image: currentBasecamp.image
            };

            localStorage.setItem('tempOrder', JSON.stringify(orderData));

            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
            btn.disabled = true;

            setTimeout(() => {
                alert(`Pesanan Berhasil!\nTotal: Rp ${totalPrice.toLocaleString('id-ID')}\n\nSilakan cek halaman Pesanan.`);
                // window.location.href = 'pesanan.html'; // Aktifkan jika sudah ada filenya
                window.location.reload(); 
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1000);
        });
    });

});