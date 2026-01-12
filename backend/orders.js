// backend/orders.js

const dummyOrders = [
    {
        id: 'OUTZY-001',
        locationName: 'Gunung Merbabu via Selo',
        date: '25 Okt 2025 - 27 Okt 2025',
        totalPrice: '750000',
        status: 'Selesai',
        imageUrl: 'aset/merbabu.jpg'
    },
    {
        id: 'OUTZY-002',
        locationName: 'Taman Nasional Bunaken',
        date: '15 Nov 2025',
        totalPrice: '300000',
        status: 'Akan Datang',
        imageUrl: 'aset/bunaken.jpg'
    },
    {
        id: 'OUTZY-003',
        locationName: 'Pantai Plengkung (G-Land)',
        date: '01 Des 2025',
        totalPrice: '60000',
        status: 'Akan Datang',
        imageUrl: 'aset/g-land.jpg'
    }
];

module.exports = { dummyOrders };