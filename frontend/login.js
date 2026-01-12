document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const email = emailInput.value;

            // 1. Simpan Status Login & Email User
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email); // <--- INI PENTING UNTUK BOOKING
            
            // 2. Simpan Data Dummy User (Untuk tampilan Akun)
            const dummyUser = {
                name: "Rayhan Ramadhan", // Bisa diganti dinamis nanti
                email: email,
                photo: "aset/user-profiles/default.jpg"
            };
            localStorage.setItem('userData', JSON.stringify(dummyUser));

            alert('Login berhasil!');
            window.location.href = 'index.html';
        });
    }
});