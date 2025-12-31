const express = require('express');
const router = express.Router();
const { getPublicProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const validateApiKey = require('../middleware/validateApiKey');
const validateToken = require('../middleware/validateToken');

// Route Publik (API Key)
router.get('/public', validateApiKey, getPublicProducts);

// Route Privat (JWT + Role)
router.post('/private', validateToken, createProduct);
router.put('/private/:id', validateToken, updateProduct);
router.delete('/private/:id', validateToken, deleteProduct);

module.exports = router;