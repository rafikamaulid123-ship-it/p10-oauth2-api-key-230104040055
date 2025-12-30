// controllers/authController.js
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const authUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // 1. Cari user berdasarkan username
        const user = await User.findOne({ username });

        // 2. Cek apakah user ada DAN password cocok
        if (user && (await user.matchPassword(password))) {
            
            // 3. Jika cocok, buat token
            const token = generateToken(user._id, user.role);

            // 4. Kirim respon sukses berisi Token
            res.status(200).json({
                message: 'Login Berhasil!',
                token_type: 'Bearer',
                access_token: token,
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role,
                }
            });
        } else {
            // Jika salah
            res.status(401).json({ 
                message: 'Login Gagal: Username atau Password salah.' 
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error saat Login.' });
    }
};

module.exports = { authUser };