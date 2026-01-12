// Fungsi untuk memeriksa status login dan memperbarui UI
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    // Perbarui Navigasi Bawah (Mobile)
    const mobileAccountLink = document.querySelector('.bottom-nav a[href*="login.html"], .bottom-nav a[href*="akun.html"]');
    if (isLoggedIn === 'true' && mobileAccountLink) {
        mobileAccountLink.href = 'akun.html';
    }

    // Perbarui Navigasi Atas (Desktop)
    const navLoggedOut = document.getElementById('nav-logged-out');
    const navLoggedIn = document.getElementById('nav-logged-in');
    
    if (isLoggedIn === 'true') {
        if (navLoggedOut) navLoggedOut.classList.add('hidden');
        if (navLoggedIn) navLoggedIn.classList.remove('hidden');
    } else {
        if (navLoggedOut) navLoggedOut.classList.remove('hidden');
        if (navLoggedIn) navLoggedIn.classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    checkLoginStatus(); // Panggil fungsi cek login

    const ordersContainer = document.getElementById('orders-container');

    // --- FUNGSI FORMAT TANGGAL INDONESIA ---
    function formatTanggalIndo(dateString) {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('id-ID', options);
    }

    // Fungsi Display Pesanan
    function displayOrders(orders) {
        if (!ordersContainer) return;
        
        if (!orders || orders.length === 0) {
            ordersContainer.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <i class="fa-solid fa-receipt" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                    <p style="color: #666;">Anda belum memiliki riwayat pesanan.</p>
                    <a href="index.html" class="btn-primary" style="margin-top: 1rem; display: inline-block; text-decoration: none;">Mulai Petualangan</a>
                </div>`;
            return;
        }

        ordersContainer.innerHTML = orders.map(order => {
            const statusClass = order.status === 'Selesai' ? 'selesai' : 'akan-datang';
            const formattedPrice = parseInt(order.totalPrice).toLocaleString('id-ID');
            
            // Logika Format Tanggal
            let displayDate = order.date;
            // Jika format tanggal standar (YYYY-MM-DD), ubah jadi format Indo
            if (order.date.length === 10 && !order.date.includes(' - ')) { 
               displayDate = formatTanggalIndo(order.date);
            }

            // Kartu Pesanan (Sekarang bisa diklik menuju tiket.html)
            return `
                <div class="order-card" onclick="window.location.href='tiket.html?id=${order.id}'" style="cursor: pointer;">
                    <img src="${order.imageUrl}" alt="${order.locationName}" class="order-image">
                    <div class="order-details">
                        <h5>${order.locationName}</h5>
                        <p><i class="fa-regular fa-calendar"></i> ${displayDate}</p>
                        <div class="order-footer">
                            <span class="order-status ${statusClass}">${order.status}</span>
                            <span class="order-price">Rp ${formattedPrice}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    try {
        // 1. Ambil Email User dari LocalStorage
        const userEmail = localStorage.getItem('userEmail');

        // 2. Validasi Login
        if (!userEmail) {
             ordersContainer.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <p>Silakan masuk untuk melihat riwayat pesanan Anda.</p>
                    <a href="login.html" class="btn-primary" style="margin-top: 1rem; display: inline-block;">Masuk Sekarang</a>
                </div>`;
             return;
        }

        // 3. Fetch Data Spesifik Email User
        const response = await fetch(`https://outzy-api.onrender.com/api/orders?email=${userEmail}`);
        
        if (!response.ok) throw new Error('Gagal mengambil data pesanan.');
        
        const data = await response.json();
        
        // 4. Tampilkan Data
        displayOrders(data);

    } catch (error) {
        console.error('Error:', error);
        if (ordersContainer) {
            ordersContainer.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: red;">
                    <i class="fa-solid fa-circle-exclamation" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                    <p>Terjadi kesalahan saat memuat data server.</p>
                </div>`;
        }
    }
});