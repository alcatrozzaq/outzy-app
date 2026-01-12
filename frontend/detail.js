window.addEventListener('DOMContentLoaded', async () => {

    // --- 0. CEK STATUS LOGIN (Mobile Nav) ---
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        
        // Perbarui Navigasi Bawah (Mobile) agar mengarah ke Akun jika sudah login
        const mobileAccountLink = document.querySelector('.bottom-nav a[href*="login.html"], .bottom-nav a[href*="akun.html"]');
        if (isLoggedIn === 'true' && mobileAccountLink) {
            mobileAccountLink.href = 'akun.html';
        }
    }
    checkLoginStatus(); // Jalankan fungsi saat load

    // --- 1. FUNGSI KEAMANAN & UTILITAS ---
    function validateUserAccess(actionName) {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn !== 'true') {
            const confirmLogin = confirm(`Fitur "${actionName}" hanya tersedia untuk Member.\n\nSilakan masuk atau daftar akun gratis untuk melanjutkan.`);
            if (confirmLogin) window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    function showError(message) {
        const mainContent = document.querySelector('main');
        if (mainContent) mainContent.innerHTML = `<h1 style="text-align: center; padding: 4rem 0;">${message}</h1>`;
    }

    // --- FETCH DATA ---
    let allLocationsData = [], allGuidesData = [];
    try {
        const locationsResponse = await fetch('https://outzy-api.onrender.com/api/locations');
        if (!locationsResponse.ok) throw new Error('Server Error');
        allLocationsData = await locationsResponse.json();

        const guidesResponse = await fetch('https://outzy-api.onrender.com/api/guides');
        if (!guidesResponse.ok) throw new Error('Server Error');
        allGuidesData = await guidesResponse.json();
    } catch (error) {
        console.error(error);
        showError('Gagal memuat data. Pastikan backend berjalan di port 3000.');
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const locationId = parseInt(params.get('id'));
    const locationData = allLocationsData.find(loc => loc.id === locationId);

    if (!locationData) { showError('Lokasi tidak ditemukan!'); return; }

    // --- ELEMEN DOM ---
    const basecampSelectionPanel = document.getElementById('basecamp-selection-panel');
    const basecampSelect = document.getElementById('basecamp-select');
    const bookingTypesContainer = document.getElementById('booking-types-container');
    const selectRouteMsg = document.getElementById('select-route-msg');

    const bookingChoicePanel = document.getElementById('booking-choice-panel');
    const simpleBookingPanel = document.getElementById('simple-booking-panel');
    const advancedBookingPanel = document.getElementById('advanced-booking-panel');
    
    const choiceTiketSajaBtn = document.getElementById('choice-tiket-saja');
    const choicePaketLengkapBtn = document.getElementById('choice-paket-lengkap');
    const backBtns = document.querySelectorAll('.back-btn');

    const simpleTotalPriceDisplay = document.getElementById('simple-total-price-display');
    const totalPriceDisplay = document.getElementById('total-price-display');
    const mobilePriceDisplay = document.getElementById('mobile-price-display'); // Elemen Harga Mobile
    
    const simplePaxInput = document.getElementById('simple-pax-count');
    const paxCountInput = document.getElementById('pax-count');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    
    // Modal Elements
    const guideModal = document.getElementById('guide-modal');
    const addonsModal = document.getElementById('addons-modal');
    const openGuideModalBtn = document.getElementById('open-guide-modal');
    const openAddonsModalBtn = document.getElementById('open-addons-modal');
    
    let currentBasecamp = null;
    let selectedGuides = [];
    let selectedAddons = {}; // Format: { "id_alat": jumlah }

    // --- INISIALISASI HALAMAN ---
    if (locationData.basecamps && locationData.basecamps.length > 0) {
        // Mode Hiking (Multi-Jalur)
        if (basecampSelectionPanel) basecampSelectionPanel.classList.remove('hidden');
        if (basecampSelect) {
            basecampSelect.innerHTML = '<option value="" disabled selected>-- Pilih Jalur --</option>';
            locationData.basecamps.forEach((bc, index) => {
                basecampSelect.innerHTML += `<option value="${index}">${bc.name}</option>`;
            });
            basecampSelect.addEventListener('change', (e) => {
                const index = e.target.value;
                updateView(locationData.basecamps[index], true, true);
                document.querySelectorAll('.basecamp-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.textContent === locationData.basecamps[index].name);
                });
            });
        }
        if (bookingTypesContainer) bookingTypesContainer.classList.add('hidden');
        if (selectRouteMsg) selectRouteMsg.classList.remove('hidden');
        updateView(locationData.basecamps[0], true, false);
    } else {
        // Mode Umum
        if (basecampSelectionPanel) basecampSelectionPanel.classList.add('hidden');
        if (bookingTypesContainer) bookingTypesContainer.classList.remove('hidden');
        if (selectRouteMsg) selectRouteMsg.classList.add('hidden');
        updateView(locationData, false, true);
    }

    // --- UPDATE VIEW FUNCTION ---
    function updateView(selectedData, isBasecamp = false, enableBooking = true) {
        currentBasecamp = selectedData;
        selectedGuides = [];
        selectedAddons = {};
        
        // Reset Tombol Pilihan
        if (openGuideModalBtn) openGuideModalBtn.textContent = 'Pilih';
        if (openAddonsModalBtn) openAddonsModalBtn.textContent = 'Pilih';

        // Update Hero & Judul
        const mainTitle = isBasecamp ? locationData.mountain_name : selectedData.title;
        document.title = `${mainTitle} - Outzy`;
        document.querySelector('.detail-hero').style.backgroundImage = `linear-gradient(rgba(0,0,0,.3),rgba(0,0,0,.6)), url('${selectedData.image}')`;
        document.querySelector('.info-header h1').textContent = mainTitle;
        document.querySelector('.info-header p').innerHTML = `<i class="fa-solid fa-location-dot"></i> ${isBasecamp ? locationData.location : selectedData.location}`;
        
        // Update Tabs
        const activeTab = document.querySelector('.tab-link.active')?.dataset.tab || 'deskripsi';
        if (selectedData.details && document.getElementById('tab-content-container')) {
            document.getElementById('tab-content-container').innerHTML = selectedData.details[activeTab];
        }

        // Sidebar Logic
        if (isBasecamp) {
            if (enableBooking) {
                if (bookingTypesContainer) bookingTypesContainer.classList.remove('hidden');
                if (selectRouteMsg) selectRouteMsg.classList.add('hidden');
                if (basecampSelect) basecampSelect.value = locationData.basecamps.findIndex(bc => bc.name === selectedData.name);
            } else {
                showPanel(bookingChoicePanel);
            }
        }

        renderTimeOptions(selectedData);
        calculateTotals();
    }

    // --- RENDER TOMBOL JALUR DI KONTEN UTAMA ---
    if (locationData.basecamps) {
        const basecampButtonsContainer = document.querySelector('.basecamp-buttons');
        if (basecampButtonsContainer) {
            basecampButtonsContainer.innerHTML = '';
            locationData.basecamps.forEach((bc) => {
                const button = document.createElement('button');
                button.className = 'basecamp-btn';
                button.textContent = bc.name;
                if(currentBasecamp && bc.name === currentBasecamp.name) button.classList.add('active'); 
                button.addEventListener('click', () => {
                    document.querySelectorAll('.basecamp-btn').forEach(b => b.classList.remove('active'));
                    button.classList.add('active');
                    updateView(bc, true, true);
                });
                basecampButtonsContainer.appendChild(button);
            });
        }
    } else {
        const selector = document.querySelector('.basecamp-selector');
        if(selector) selector.style.display = 'none';
    }

    // --- LOGIKA MODAL ADDONS (SEWA PERALATAN) ---
    if (openAddonsModalBtn) {
        openAddonsModalBtn.addEventListener('click', () => {
            if (currentBasecamp.addons && currentBasecamp.addons.length > 0) {
                if(addonsModal) addonsModal.classList.add('show');
                const container = document.getElementById('addons-list-container');
                
                if (container) {
                    // Generate HTML untuk item addons
                    container.innerHTML = currentBasecamp.addons.map(addon => `
                        <div class="addon-card">
                            <div class="addon-info">
                                <h5>${addon.name}</h5>
                                <p class="addon-price">Rp ${parseInt(addon.price).toLocaleString('id-ID')} / hari</p>
                            </div>
                            <div class="quantity-selector">
                                <button type="button" class="quantity-btn" data-action="decrease" data-id="${addon.id}">-</button>
                                <input type="number" class="quantity-input" value="${selectedAddons[addon.id] || 0}" min="0" data-id="${addon.id}" readonly>
                                <button type="button" class="quantity-btn" data-action="increase" data-id="${addon.id}">+</button>
                            </div>
                        </div>
                    `).join('');

                    // Pasang Event Listener ke Tombol (+ / -) yang baru dibuat
                    container.querySelectorAll('.quantity-btn').forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            e.preventDefault(); // Mencegah submit form
                            const action = btn.dataset.action;
                            const id = btn.dataset.id;
                            const input = container.querySelector(`.quantity-input[data-id="${id}"]`);
                            
                            if (input) {
                                let value = parseInt(input.value);
                                if (action === 'increase') value++;
                                if (action === 'decrease' && value > 0) value--;
                                input.value = value;
                            }
                        });
                    });
                }
            }
        });
    }

    const confirmAddonsBtn = document.getElementById('confirm-addons-btn');
    if (confirmAddonsBtn) {
        confirmAddonsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            selectedAddons = {}; // Reset dulu
            let totalItems = 0;
            
            // Baca nilai dari input di dalam modal
            document.querySelectorAll('.quantity-input').forEach(input => {
                const quantity = parseInt(input.value);
                if (quantity > 0) {
                    selectedAddons[input.dataset.id] = quantity;
                    totalItems += quantity;
                }
            });

            // Update teks tombol
            if (openAddonsModalBtn) openAddonsModalBtn.textContent = totalItems > 0 ? `${totalItems} Item Terpilih` : 'Pilih';
            
            calculateTotals(); // Hitung ulang harga
            if (addonsModal) addonsModal.classList.remove('show');
        });
    }

    const closeAddonsModalBtn = document.getElementById('close-addons-modal');
    if (closeAddonsModalBtn && addonsModal) closeAddonsModalBtn.addEventListener('click', () => addonsModal.classList.remove('show'));


    // --- LOGIKA MODAL GUIDE (PEMANDU) ---
    if (openGuideModalBtn) {
        openGuideModalBtn.addEventListener('click', () => {
            if (currentBasecamp.guides && currentBasecamp.guides.length > 0) {
                guideModal.classList.add('show');
                const container = document.getElementById('guide-list-container');
                container.innerHTML = currentBasecamp.guides.map(guideId => {
                    const guide = allGuidesData.find(g => g.id === guideId);
                    if (!guide) return '';
                    return `
                        <div class="guide-card">
                            <label class="checkbox-container">
                                <input type="checkbox" class="guide-checkbox" value="${guide.id}" ${selectedGuides.includes(guide.id) ? 'checked' : ''}>
                                <span class="checkmark"></span>
                            </label>
                            <img src="${guide.photo || 'aset/guides/default.jpg'}" class="guide-photo">
                            <div class="guide-info">
                                <h5>${guide.name} (${guide.age} thn)</h5>
                                <p>⭐️ ${guide.rating}</p>
                                <div class="guide-skills">${(guide.skills || []).map(skill => `<span>${skill}</span>`).join('')}</div>
                            </div>
                            <div class="guide-price">Rp ${parseInt(guide.price).toLocaleString('id-ID')}</div>
                        </div>
                    `;
                }).join('');
            }
        });
    }

    const confirmGuideBtn = document.getElementById('confirm-guide-btn');
    if (confirmGuideBtn) {
        confirmGuideBtn.addEventListener('click', () => {
            selectedGuides = [];
            document.querySelectorAll('.guide-checkbox:checked').forEach(checkbox => selectedGuides.push(checkbox.value));
            if (openGuideModalBtn) openGuideModalBtn.textContent = selectedGuides.length > 0 ? `${selectedGuides.length} Terpilih` : 'Pilih';
            calculateTotals();
            if (guideModal) guideModal.classList.remove('show');
        });
    }

    const closeGuideModalBtn = document.getElementById('close-guide-modal');
    if (closeGuideModalBtn && guideModal) closeGuideModalBtn.addEventListener('click', () => guideModal.classList.remove('show'));


    // --- PERHITUNGAN HARGA ---
    function calculateTotals() {
        if (!currentBasecamp) return;
        const price = parseInt(currentBasecamp.price);
        
        // Simple Booking
        const sPax = parseInt(simplePaxInput?.value) || 1;
        if(simpleTotalPriceDisplay) simpleTotalPriceDisplay.textContent = `Rp ${(sPax * price).toLocaleString('id-ID')}`;

        // Advanced Booking
        const aPax = parseInt(paxCountInput?.value) || 1;
        let total = aPax * price; 
        
        // Tambah Harga Guide
        selectedGuides.forEach(id => {
            const g = allGuidesData.find(x => x.id === id);
            if(g) total += parseInt(g.price);
        });

        // Tambah Harga Addons
        for (const [id, qty] of Object.entries(selectedAddons)) {
            const addon = currentBasecamp.addons.find(a => a.id === id);
            if(addon) total += parseInt(addon.price) * qty;
        }

        const formattedTotal = `Rp ${total.toLocaleString('id-ID')}`;
        
        // Update Desktop
        if(totalPriceDisplay) totalPriceDisplay.textContent = formattedTotal;

        // Update Mobile Sticky Bar
        if (mobilePriceDisplay) {
            // Logika: Jika sedang buka Advanced Panel, pakai total Advanced. Jika tidak, pakai Simple.
            if (advancedBookingPanel && !advancedBookingPanel.classList.contains('hidden')) {
                mobilePriceDisplay.textContent = formattedTotal;
            } else {
                // Default ke harga tiket dasar x jumlah (simple)
                mobilePriceDisplay.textContent = `Rp ${(sPax * price).toLocaleString('id-ID')}`;
            }
        }
    }

    function renderTimeOptions(data) {
        const containers = [document.getElementById('climb-time-options'), document.getElementById('simple-climb-time-options')];
        const sections = [document.getElementById('climb-time-section'), document.getElementById('simple-climb-time-section')];
        
        if (data.climb_times && data.climb_times.length > 0) {
            const html = data.climb_times.map((t, i) => 
                `<input type="radio" id="t-${t}" name="time" value="${t}" ${i===0?'checked':''}><label for="t-${t}">${t}</label>`
            ).join('');
            
            containers.forEach(c => { if(c) c.innerHTML = html; });
            sections.forEach(s => { if(s) s.style.display = 'block'; });
        } else {
            sections.forEach(s => { if(s) s.style.display = 'none'; });
        }
    }

    // --- EVENT LISTENERS LAINNYA ---
    if(simplePaxInput) simplePaxInput.addEventListener('input', calculateTotals);
    if(paxCountInput) paxCountInput.addEventListener('input', calculateTotals);

    function showPanel(panel) {
        [bookingChoicePanel, simpleBookingPanel, advancedBookingPanel].forEach(p => { if(p) p.classList.add('hidden'); });
        if(panel) panel.classList.remove('hidden');
        calculateTotals(); // Hitung ulang harga saat ganti panel
    }
    if(choiceTiketSajaBtn) choiceTiketSajaBtn.addEventListener('click', () => showPanel(simpleBookingPanel));
    if(choicePaketLengkapBtn) choicePaketLengkapBtn.addEventListener('click', () => showPanel(advancedBookingPanel));
    backBtns.forEach(btn => btn.addEventListener('click', () => showPanel(bookingChoicePanel)));

    // Tombol Download Peta
    const downloadMapBtn = document.getElementById('download-map-btn');
    if (downloadMapBtn) {
        downloadMapBtn.addEventListener('click', () => {
            if (validateUserAccess('Download Peta Offline')) {
                downloadMapBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ...';
                downloadMapBtn.disabled = true;
                setTimeout(() => {
                    downloadMapBtn.innerHTML = '<i class="fa-solid fa-check"></i> Tersimpan';
                    downloadMapBtn.style.background = '#16a34a';
                    alert('Peta berhasil diunduh!');
                }, 1500);
            }
        });
    }

    // LOGIKA KIRIM PESANAN KE BACKEND (Tombol Desktop/Utama)
    const bookBtns = [document.getElementById('book-now-btn'), document.getElementById('book-ticket-btn')];
    
    bookBtns.forEach(btn => {
        if (!btn) return;

        btn.addEventListener('click', async (e) => {
            if (!validateUserAccess('Booking')) return;

            // 1. Siapkan Data Pesanan
            const userEmail = localStorage.getItem('userEmail');
            let finalPrice = 0;
            let dateInfo = '';

            const isAdvanced = !document.getElementById('advanced-booking-panel').classList.contains('hidden');

            if (isAdvanced) {
                const priceText = document.getElementById('total-price-display').textContent;
                finalPrice = parseInt(priceText.replace(/[^0-9]/g, ''));
                dateInfo = document.getElementById('start-date').value;
            } else {
                const priceText = document.getElementById('simple-total-price-display').textContent;
                finalPrice = parseInt(priceText.replace(/[^0-9]/g, ''));
                dateInfo = document.getElementById('simple-date').value;
            }

            if (finalPrice === 0 || !dateInfo) {
                alert("Mohon lengkapi tanggal dan data pemesanan.");
                return;
            }

            const orderData = {
                userEmail: userEmail,
                locationName: currentBasecamp ? `${locationData.mountain_name} (${currentBasecamp.name})` : locationData.title,
                date: dateInfo,
                totalPrice: finalPrice,
                imageUrl: currentBasecamp ? currentBasecamp.image : locationData.image
            };

            // 2. Kirim ke Backend (POST)
            try {
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses...';
                btn.disabled = true;

                const response = await fetch('https://outzy-api.onrender.com/api/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderData)
                });

                if (response.ok) {
                    alert('✅ Pesanan Berhasil! Tiket telah terbit.');
                    window.location.href = 'pesanan.html';
                } else {
                    throw new Error('Gagal memproses pesanan');
                }
            } catch (error) {
                console.error(error);
                alert('Terjadi kesalahan koneksi. Coba lagi.');
                btn.innerHTML = 'Pesan Sekarang';
                btn.disabled = false;
            }
        });
    });

    // --- PERBAIKAN: LOGIKA TOMBOL MOBILE STICKY ---
    const mobileBookBtn = document.getElementById('mobile-book-btn');
    if (mobileBookBtn) {
        mobileBookBtn.addEventListener('click', () => {
            // 1. Cek Panel mana yang sedang terbuka (Tiket Saja atau Paket Lengkap?)
            const advancedPanel = document.getElementById('advanced-booking-panel');
            const simplePanel = document.getElementById('simple-booking-panel');
            
            let targetBtn = null;

            // Jika Panel Paket Lengkap terbuka
            if (advancedPanel && !advancedPanel.classList.contains('hidden')) {
                targetBtn = document.getElementById('book-now-btn');
            } 
            // Jika Panel Tiket Saja terbuka
            else if (simplePanel && !simplePanel.classList.contains('hidden')) {
                targetBtn = document.getElementById('book-ticket-btn');
            }

            // 2. Eksekusi Aksi
            if (targetBtn) {
                // Scroll dulu ke form agar user melihat prosesnya
                const bookingCard = document.querySelector('.booking-card');
                if (bookingCard) bookingCard.scrollIntoView({ behavior: 'smooth' });

                // KLIK TOMBOL ASLI SECARA OTOMATIS
                // Kita beri delay 300ms agar scroll terjadi sedikit dulu
                setTimeout(() => {
                    targetBtn.click(); 
                }, 300);
            } else {
                // Jika belum pilih jalur/tipe tiket, scroll ke atas
                const basecampSelect = document.getElementById('basecamp-selection-panel');
                if (basecampSelect) {
                    basecampSelect.scrollIntoView({ behavior: 'smooth' });
                    alert("Silakan pilih jalur dan tipe tiket terlebih dahulu.");
                }
            }
        });
    }

    // Tab Handling
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