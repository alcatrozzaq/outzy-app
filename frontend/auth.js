// frontend/auth.js

document.addEventListener('DOMContentLoaded', () => {
    updateHeaderUI();
});

function updateHeaderUI() {
    // 1. Ambil data dari penyimpanan browser (LocalStorage)
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userDataStr = localStorage.getItem('userData');

    // 2. Ambil elemen-elemen header
    const navLoggedOut = document.getElementById('nav-logged-out'); // Container tombol Masuk/Daftar
    const navLoggedIn = document.getElementById('nav-logged-in');   // Container Foto Profil
    const navProfilePic = document.getElementById('header-profile-pic'); // Elemen img foto

    // 3. Logika Tampilan
    if (isLoggedIn === 'true' && userDataStr) {
        // --- KONDISI: SUDAH LOGIN ---
        
        // Parse data user
        const user = JSON.parse(userDataStr);

        // Sembunyikan tombol Masuk/Daftar
        if (navLoggedOut) navLoggedOut.classList.add('hidden');
        
        // Tampilkan Foto Profil
        if (navLoggedIn) navLoggedIn.classList.remove('hidden');

        // Update sumber foto (jika ada foto di data user, pakai itu. Jika tidak, pakai default)
        if (navProfilePic) {
            navProfilePic.src = user.photo || 'aset/user-profiles/default.jpg';
            // Tambahkan tooltip nama saat di-hover
            navProfilePic.title = user.name;
        }

    } else {
        // --- KONDISI: BELUM LOGIN ---
        
        // Tampilkan tombol Masuk/Daftar
        if (navLoggedOut) navLoggedOut.classList.remove('hidden');
        
        // Sembunyikan Foto Profil
        if (navLoggedIn) navLoggedIn.classList.add('hidden');
    }
}