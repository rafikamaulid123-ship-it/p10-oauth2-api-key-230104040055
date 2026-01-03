const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    // --- CCTV DEBUGGING (Tambahkan ini) ---
    console.log("👉 Header Auth Diterima:", req.headers.authorization);
    // --------------------------------------

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            
            // Cek token yang dipotong
            console.log("👉 Token Extracted:", token);

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Cek hasil decode
            console.log("👉 Hasil Decode:", decoded);

            req.user = { id: decoded.id, role: decoded.role };
            next();
        } catch (error) {
            console.error("❌ Error Verifikasi:", error.message); // Biar tau errornya apa
            res.status(403).json({ message: 'Akses Ditolak: Token tidak valid/expired.' });
        }
    } else {
        console.log("❌ Header Authorization Kosong atau Salah Format");
        res.status(403).json({ message: 'Akses Ditolak: Token tidak ditemukan (Wajib Bearer).' });
    }
};

module.exports = validateToken;