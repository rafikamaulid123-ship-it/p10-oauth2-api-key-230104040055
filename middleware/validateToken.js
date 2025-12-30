// middleware/validateToken.js
const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
    // 1. Cek apakah ada header Authorization dengan format "Bearer <token>"
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        try {
            // 2. Ambil tokennya saja (buang kata 'Bearer ')
            const token = authHeader.split(' ')[1];

            // 3. Verifikasi token dengan kunci rahasia
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Token valid! Simpan data user (id & role) ke request
            req.user = {
                id: decoded.id,
                role: decoded.role
            };

            next(); // Lanjut masuk
        } catch (error) {
            console.error('Token Error:', error.message);
            res.status(403).json({ message: 'Akses Ditolak: Token tidak valid atau kadaluwarsa.' });
        }
    } else {
        res.status(403).json({ message: 'Akses Ditolak: Butuh Token Bearer.' });
    }
};

module.exports = validateToken;