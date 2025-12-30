// routes/productRoutes.js
const express = require('express');
const router = express.Router();

const { 
    getPublicProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');

const validateApiKey = require('../middleware/validateApiKey');
const validateToken = require('../middleware/validateToken'); // <-- Import Middleware Baru

// --- Route PUBLIK (Pakai API Key) ---
router.get('/public', validateApiKey, getPublicProducts);

// --- Route PRIVAT (Pakai Token JWT) ---
// Semua route di bawah ini harus lolos cek token dulu
router.post('/private', validateToken, createProduct);       // Create
router.put('/private/:id', validateToken, updateProduct);    // Update
router.delete('/private/:id', validateToken, deleteProduct); // Delete

module.exports = router;