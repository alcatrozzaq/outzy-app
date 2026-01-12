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

document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus(); // Panggil fungsi cek login

    // 1. Cek apakah user login
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        alert('Anda harus masuk terlebih dahulu.');
        window.location.href = 'login.html';
        return;
    }

    // 2. Tampilkan Data User (Nama & Inisial)
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
        const user = JSON.parse(userDataStr);
        
        // Update Nama di Halaman
        const nameElement = document.querySelector('.user-name');
        if (nameElement) nameElement.textContent = user.name.toUpperCase();

        // Update Inisial di Lingkaran Avatar
        const avatarElement = document.querySelector('.avatar-circle');
        if (avatarElement) {
            // Ambil huruf depan dari setiap kata nama
            const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            avatarElement.textContent = initials;
        }
    }

    // 3. Logika Logout (REVISI FINAL)
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault();
            
            // Hapus SEMUA data sesi (Penting!)
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userData');
            localStorage.removeItem('userEmail'); // Agar pesanan user berikutnya tidak tercampur
            
            alert('Anda telah berhasil keluar.');
            window.location.href = 'index.html'; 
        });
    }
});