const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const { auth } = require('../middleware/auth');

// Регистрация нового пользователя
router.post('/register', authController.register);

// Вход пользователя
router.post('/login', authController.login);

// Получение информации о текущем пользователе
router.get('/me', auth, authController.getMe);

module.exports = router; 