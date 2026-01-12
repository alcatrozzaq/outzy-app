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

const resultsContainer = document.querySelector('.results-container');
const categoryItems = document.querySelectorAll('.category-grid-item');
const resultsTitle = document.getElementById('results-title');

let allLocationsData = [];

function displayLocations(locations) {
    if (!resultsContainer) return;
    resultsContainer.innerHTML = '';
    if (!locations || locations.length === 0) {
        resultsContainer.innerHTML = '<p>Tidak ada lokasi yang ditemukan.</p>';
        return;
    }
    locations.forEach(location => {
        let cardHTML = '';
        if (location.basecamps) {
            const firstBasecamp = location.basecamps[0];
            const minPrice = Math.min(...location.basecamps.map(bc => parseInt(bc.price)));
            cardHTML = `
            <a href="detail.html?id=${location.id}" class="location-card-link">
                <div class="location-card">
                    <img src="${firstBasecamp.image}" alt="${location.mountain_name}" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">${location.mountain_name}</h3>
                        <p class="card-location">${location.location}</p>
                        <div class="card-info">
                            <span class="card-rating"><i class="fa-solid fa-star"></i> ${firstBasecamp.rating}</span>
                            <span class="card-price">Mulai Rp ${minPrice.toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                </div>
            </a>`;
        } else {
            cardHTML = `
            <a href="detail.html?id=${location.id}" class="location-card-link">
                <div class="location-card">
                    <img src="${location.image}" alt="${location.title}" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">${location.title}</h3>
                        <p class="card-location">${location.location}</p>
                        <div class="card-info">
                            <span class="card-rating"><i class="fa-solid fa-star"></i> ${location.rating}</span>
                            <span class="card-price">Rp ${parseInt(location.price).toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                </div>
            </a>`;
        }
        resultsContainer.innerHTML += cardHTML;
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    checkLoginStatus(); // Panggil fungsi cek login

    try {
        const response = await fetch('http://localhost:3000/api/locations');
        if (!response.ok) throw new Error('Gagal memuat data lokasi');
        allLocationsData = await response.json();
        displayLocations(allLocationsData);
    } catch (error) {
        console.error('Error fetching data:', error);
        if(resultsContainer) resultsContainer.innerHTML = '<p style="text-align: center; color: red;">Gagal memuat data dari server.</p>';
    }
});

if (categoryItems) {
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            const selectedCategory = item.dataset.category;
            const filteredData = allLocationsData.filter(location => {
                if (selectedCategory === 'All') return true;
                return location.category === selectedCategory;
            });
            if(resultsTitle) resultsTitle.textContent = selectedCategory === 'All' ? 'Populer Minggu Ini' : `Menampilkan hasil untuk "${selectedCategory}"`;
            displayLocations(filteredData);
        });
    });
}

const header = document.querySelector('.desktop-header');
const stickyPoint = 50;
function handleScroll() {
  if (header && window.pageYOffset > stickyPoint) {
    header.classList.add('sticky');
  } else if (header) {
    header.classList.remove('sticky');
  }
}
window.addEventListener('scroll', handleScroll);