const express = require('express');
const { authUser } = require('../controllers/authController');
const router = express.Router();

router.post('/token', authUser);

module.exports = router;