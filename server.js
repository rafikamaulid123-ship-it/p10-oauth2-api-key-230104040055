require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Import Routes
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

// Middleware parsing body JSON
app.use(express.json());

// Koneksi ke MongoDB Atlas
const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Koneksi ke MongoDB Atlas Berhasil!');
    } catch (err) {
        console.error('❌ GAGAL KONEKSI ke MongoDB Atlas:', err.message);
        process.exit(1);
    }
};

// Route Dasar
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'API Server Berjalan!',
        praktikum: 'P10: Simulasi API Key & OAuth 2.0',
    });
});

// Integrasi Routes
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/auth', authRoutes);

// Jalankan Server
const startServer = () => {
    app.listen(PORT, () => {
        console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    });
};

connectDB().then(startServer);