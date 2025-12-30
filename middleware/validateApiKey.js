// middleware/validateApiKey.js
const ApiKey = require('../models/ApiKey');

const validateApiKey = async (req, res, next) => {
    try {
        // 1. Ambil key dari header "x-api-key"
        const apiKey = req.header('x-api-key');

        // 2. Jika tidak ada key, tolak (401)
        if (!apiKey) {
            return res.status(401).json({
                message: 'Akses Ditolak: API Key tidak ditemukan di header "x-api-key".'
            });
        }

        // 3. Cari key di database yang statusnya 'active'
        const existingKey = await ApiKey.findOne({ key: apiKey, status: 'active' });

        // Jika tidak ketemu di DB
        if (!existingKey) {
            return res.status(401).json({
                message: 'Akses Ditolak: API Key tidak valid atau sudah dicabut.'
            });
        }

        // 4. Jika valid, simpan info pemilik key ke request agar bisa dipakai nanti
        req.apiKey = existingKey;

        // 5. Lanjut ke controller (pintu terbuka)
        next();
    } catch (error) {
        console.error('API Key Error:', error);
        res.status(500).json({ message: 'Server Error saat validasi API Key' });
    }
};

module.exports = validateApiKey;