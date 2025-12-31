const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const authUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id, user.role);
        res.json({
            token_type: 'Bearer',
            access_token: token,
            user: { id: user._id, username: user.username, role: user.role }
        });
    } else {
        res.status(401).json({ message: 'Otentikasi Gagal: Username/Password salah.' });
    }
};

module.exports = { authUser };