//C:\webproje\celikoglu_baklava\backend\routes\authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserById } = require('../controllers/authController');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

router.post('/register', csrfProtection, registerUser);
router.post('/login', csrfProtection, loginUser);
router.get('/user/:id', getUserById);

module.exports = router;

