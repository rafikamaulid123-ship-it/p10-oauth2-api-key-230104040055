
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/auth', authRoutes);

// 2. Fungsi Koneksi ke MongoDB Atlas
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Koneksi ke MongoDB Atlas Berhasil!');
  } catch (err) {
    console.error('❌ GAGAL KONEKSI ke MongoDB Atlas:', err.message);
    // Matikan server jika database gagal connect
    process.exit(1);
  }
};

// 3. Route Sederhana untuk Cek Server
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API Server Berjalan!',
    praktikum: 'P10: Simulasi API Key & OAuth 2.0',
  });
});

// 4. Jalankan Server
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  });
};

// Eksekusi koneksi dulu, baru nyalakan server
connectDB().then(startServer);