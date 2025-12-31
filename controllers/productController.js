const Product = require('../models/Product');

// PUBLIC: Get Products
const getPublicProducts = async (req, res) => {
    try {
        const products = await Product.find().select('-__v');
        const keyOwner = req.apiKey ? req.apiKey.owner : 'N/A';
        res.status(200).json({
            message: `Daftar Produk (Akses: ${keyOwner})`,
            data: products
        });
    } catch (error) {
        res.status(500).json({ message: 'Gagal ambil data.' });
    }
};

// PRIVATE: Create Product (Admin Only)
const createProduct = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Akses Ditolak: Hanya Admin.' });
    }
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json({ message: 'Produk dibuat.', data: newProduct });
    } catch (error) {
        res.status(400).json({ message: 'Gagal membuat produk.', error: error.message });
    }
};

// PRIVATE: Update Product (Admin Only)
const updateProduct = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Akses Ditolak: Hanya Admin.' });
    }
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Produk diupdate.', data: updated });
    } catch (error) {
        res.status(400).json({ message: 'Gagal update produk.' });
    }
};

// PRIVATE: Delete Product (Admin Only)
const deleteProduct = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Akses Ditolak: Hanya Admin.' });
    }
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Produk dihapus.' });
    } catch (error) {
        res.status(500).json({ message: 'Gagal hapus produk.' });
    }
};

module.exports = { getPublicProducts, createProduct, updateProduct, deleteProduct };