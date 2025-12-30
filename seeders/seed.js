// seeders/seed.js
require('dotenv').config();
const mongoose = require('mongoose');

// Impor Model
const User = require('../models/User');
const ApiKey = require('../models/ApiKey');
const Product = require('../models/Product');

const MONGODB_URI = process.env.MONGODB_URI;

// Data Dummay
const products = [
    { name: 'Laptop Gaming Pro', price: 15000000, stock: 10, description: 'Laptop performa tinggi.' },
    { name: 'Monitor 4K Ultra', price: 5000000, stock: 25, description: 'Monitor resolusi terbaik.' },
    { name: 'Keyboard Mekanik', price: 1500000, stock: 50, description: 'Keyboard switch tactile.' }
];

const users = [
    { username: 'admin', password: 'password123', role: 'admin' },
    { username: 'userbiasa', password: 'userpass', role: 'user' }
];

const apiKeys = [
    { key: 'PRACTICUM_API_KEY_A_1234567890', owner: 'Public App Client A', status: 'active' },
    { key: 'PUBLIC_VIEW_ONLY_KEY_B_ABCDEFG', owner: 'Public App Client B', status: 'active' }
];

// Fungsi Utama Seeder
const seedDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('🔗 Koneksi MongoDB Berhasil');

        // 1. Bersihkan Data Lama
        await Product.deleteMany();
        await User.deleteMany();
        await ApiKey.deleteMany();
        console.log('🗑️  Data Lama Berhasil Dihapus');

        // 2. Masukkan Data Produk
        await Product.insertMany(products);
        console.log(`[+] Produk (${products.length} item) masuk.`);

        // 3. Masukkan User (Looping manual agar hashing password berjalan)
        for (const userData of users) {
            const user = new User(userData);
            await user.save();
        }
        console.log(`[+] User (${users.length} item) masuk (Password di-hash).`);

        // 4. Masukkan API Key
        await ApiKey.insertMany(apiKeys);
        console.log(`[+] API Key (${apiKeys.length} item) masuk.`);

        console.log('\n✅ Proses Seeding Database Berhasil! Semua data siap.');
        process.exit();
    } catch (error) {
        console.error('\n❌ GAGAL Seeding:', error);
        process.exit(1);
    }
};

seedDB();