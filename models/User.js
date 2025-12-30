const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }
}, { timestamps: true });

// --- Mongoose Pre-save Hook: Hashing Password ---
userSchema.pre('save', async function() {
    // 1. Cek apakah field password diubah/baru
    if (!this.isModified('password')) {
        return;
    }
    // 2. Lakukan Hashing
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// --- Method Instance: Membandingkan Password Saat Login ---
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);    