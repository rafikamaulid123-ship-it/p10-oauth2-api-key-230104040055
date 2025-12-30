// utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
    // Membuat token yang berisi ID user dan Role-nya
    return jwt.sign(
        { id, role }, 
        process.env.JWT_SECRET, 
        { expiresIn: '7d' } // Token kadaluwarsa dalam 7 hari
    );
};

module.exports = generateToken;