// routes/authRoutes.js
const express = require('express');
const { authUser } = require('../controllers/authController');

const router = express.Router();

// Endpoint: POST /api/v1/auth/token
router.post('/token', authUser);

module.exports = router;