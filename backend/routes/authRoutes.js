//C:\webproje\celikoglu_baklava\backend\routes\authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { getUserById } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user/:id', getUserById);


module.exports = router;
