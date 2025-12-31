const ApiKey = require('../models/ApiKey');

const validateApiKey = async (req, res, next) => {
    const apiKey = req.header('x-api-key');

    if (!apiKey) {
        return res.status(401).json({ message: 'Akses Ditolak: API Key tidak ditemukan.' });
    }

    try {
        const existingKey = await ApiKey.findOne({ key: apiKey, status: 'active' });
        if (!existingKey) {
            return res.status(401).json({ message: 'Akses Ditolak: API Key tidak valid.' });
        }
        req.apiKey = existingKey;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = validateApiKey;