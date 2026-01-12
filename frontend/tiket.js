document.addEventListener('DOMContentLoaded', async () => {
    
    // 1. Ambil ID Pesanan dari URL (?id=...)
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('id');
    const userEmail = localStorage.getItem('userEmail');
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    // Elemen DOM
    const loadingDiv = document.getElementById('ticket-loading');
    const contentDiv = document.getElementById('ticket-content');

    if (!orderId || !userEmail) {
        loadingDiv.innerHTML = '<p style="color:red">Data tiket tidak ditemukan.</p>';
        return;
    }

    // Fungsi Format Tanggal
    function formatTanggalIndo(dateString) {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    try {
        // 2. Ambil Data dari Backend (Filter by Email dulu)
        // Note: Idealnya ada endpoint /api/orders/:id, tapi untuk MVP kita filter client-side
        const response = await fetch(`http://localhost:3000/api/orders?email=${userEmail}`);
        
        if (!response.ok) throw new Error('Gagal koneksi server');
        
        const allOrders = await response.json();
        
        // 3. Cari Pesanan Spesifik berdasarkan ID
        const myOrder = allOrders.find(o => o.id === orderId);

        if (!myOrder) {
            loadingDiv.innerHTML = '<p style="color:red">Tiket tidak valid atau bukan milik Anda.</p>';
            return;
        }

        // 4. Masukkan Data ke HTML
        document.getElementById('t-status').textContent = myOrder.status.toUpperCase();
        
        // Ubah warna status jika Selesai
        if(myOrder.status === 'Selesai') {
            document.getElementById('t-status').style.color = '#16a34a';
        }

        document.getElementById('t-id').textContent = myOrder.id;
        document.getElementById('t-location').textContent = myOrder.locationName;
        
        // Format Tanggal
        let displayDate = myOrder.date;
        if (myOrder.date.length === 10 && !myOrder.date.includes(' - ')) {
            displayDate = formatTanggalIndo(myOrder.date);
        }
        document.getElementById('t-date').textContent = displayDate;

        // Nama Pemesan (Ambil dari LocalStorage atau default)
        document.getElementById('t-name').textContent = userData.name || userEmail;

        document.getElementById('t-price').textContent = `Rp ${parseInt(myOrder.totalPrice).toLocaleString('id-ID')}`;

        // Update QR Code dengan ID Pesanan Unik
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${myOrder.id}`;
        document.querySelector('.qr-code').src = qrUrl;

        // Tampilkan Konten
        loadingDiv.classList.add('hidden');
        contentDiv.classList.remove('hidden');

    } catch (error) {
        console.error(error);
        loadingDiv.innerHTML = '<p style="color:red">Terjadi kesalahan memuat tiket.</p>';
    }
});