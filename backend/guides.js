const allGuides = [
    {
        id: 'p01',
        name: 'Budi Santoso',
        age: 35,
        rating: 4.9,
        price: '500000',
        skills: ['Memasak', 'P3K'],
        photo: 'aset/guides/budi.jpg'
    },
    {
        id: 'p02',
        name: 'Agus Wijaya',
        age: 42,
        rating: 4.7,
        price: '450000',
        skills: ['Fotografi'],
        photo: 'aset/guides/agus.jpg'
    },
    {
        id: 'p03',
        name: 'Slamet Riyadi',
        age: 38,
        rating: 4.8,
        price: '550000',
        skills: ['Navigasi Handal'],
        photo: 'aset/guides/slamet.jpg'
    }
];

// Baris ini mengekspor variabel agar bisa dibaca oleh server.js
module.exports = { allGuides };