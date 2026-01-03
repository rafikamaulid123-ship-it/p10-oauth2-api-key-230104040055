require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
// const bcrypt = require('bcryptjs'); // HAPUS/KOMENTAR INI (Tidak butuh hash manual lagi)

// Import Models
const User = require('./models/User');
const ApiKey = require('./models/ApiKey');
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 3000;

// Import Routes
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

// Middleware Body Parser (PENTING)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- DATA DUMMY (SEEDING) ---
const seedData = async () => {
    // Cek apakah data sudah ada
    if (await User.countDocuments() > 0) return;

    console.log('🌱 Sedang mengisi data awal (Seeding)...');

    // 1. Buat Users (LANGSUNG PASSWORD ASLI - Biar User Model yang nge-hash)
    // Jangan di-hash manual pakai bcrypt di sini!
    await User.create([
        { username: 'admin', password: 'password123', role: 'admin' },
        { username: 'userbiasa', password: 'userpass', role: 'user' }
    ]);

    // 2. Buat API Keys
    await ApiKey.create([
        { key: 'PRACTICUM_API_KEY_A_1234567890', owner: 'Public App Client A', status: 'active' },
        { key: 'PUBLIC_VIEW_ONLY_KEY_B_ABCDEFG', owner: 'Public App Client B', status: 'active' }
    ]);

    // 3. Buat Products
    await Product.create([
        { name: 'Laptop Gaming Pro', price: 15000000, stock: 10, description: 'Laptop kencang.' },
        { name: 'Monitor 4K Ultra', price: 5000000, stock: 25, description: 'Layar jernih.' },
        { name: 'Keyboard Mekanik', price: 1500000, stock: 50, description: 'Clicky sound.' }
    ]);

    console.log('✅ Seeding Selesai! Data siap digunakan.');
};

// --- STARTUP LOGIC ---
const startServer = async () => {
    try {
        // 1. Jalankan MongoDB Memory Server
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        
        // 2. Konek Mongoose
        await mongoose.connect(uri);
        console.log('✅ Berhasil Konek ke MongoDB Memory Server!');

        // 3. Isi Data
        await seedData();

        // 4. Integrasi Routes
        app.get('/', (req, res) => res.json({ message: 'API Server Berjalan!', mode: 'In-Memory DB' }));
        app.use('/api/v1/products', productRoutes);
        app.use('/api/v1/auth', authRoutes);

        // 5. Jalankan Express
        app.listen(PORT, () => {
            console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
            console.log(`🔑 Gunakan API Key: PRACTICUM_API_KEY_A_1234567890`);
            console.log(`👤 Admin: admin / password123`);
        });

    } catch (err) {
        console.error('❌ Gagal start server:', err);
    }
};

startServer();