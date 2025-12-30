// controllers/productController.js
const Product = require('../models/Product');

// --- 1. PUBLIK (Bisa diakses siapa saja yang punya API Key) ---
const getPublicProducts = async (req, res) => {
    try {
        const products = await Product.find().select('-__v');
        const keyOwner = req.apiKey ? req.apiKey.owner : 'Unknown';
        res.status(200).json({
            message: `Daftar Produk (Public). Akses oleh: ${keyOwner}`,
            data: products,
        });
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data produk.' });
    }
};

// --- 2. PRIVAT (Hanya user login dengan Token) ---

// CREATE (Tambah Produk) - Hanya Admin
const createProduct = async (req, res) => {
    // Cek Role
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Dilarang: Hanya Admin yang boleh tambah produk.' });
    }

    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json({
            message: 'Produk berhasil dibuat!',
            data: newProduct
        });
    } catch (error) {
        res.status(400).json({ message: 'Gagal membuat produk.', error: error.message });
    }
};

// UPDATE (Edit Produk) - Hanya Admin
const updateProduct = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Dilarang: Hanya Admin yang boleh edit produk.' });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        
        if (!updatedProduct) return res.status(404).json({ message: 'Produk tidak ditemukan.' });

        res.status(200).json({ message: 'Produk diperbarui.', data: updatedProduct });
    } catch (error) {
        res.status(400).json({ message: 'Gagal update produk.', error: error.message });
    }
};

// DELETE (Hapus Produk) - Hanya Admin
const deleteProduct = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Dilarang: Hanya Admin yang boleh hapus produk.' });
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Produk tidak ditemukan.' });

        res.status(200).json({ message: 'Produk berhasil dihapus.' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal hapus produk.' });
    }
};

module.exports = { 
    getPublicProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct 
};