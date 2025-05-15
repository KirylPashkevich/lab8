const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');

const storesRouter = require('./stores');
const productsRouter = require('./products');
const ordersRouter = require('./orders');
const authRouter = require('./auth');

// Публичные маршруты
router.use('/auth', authRouter);

// Защищенные маршруты
router.use('/stores', auth, storesRouter);
router.use('/products', auth, productsRouter);
router.use('/orders', auth, ordersRouter);

// Обработка ошибок для маршрутов
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Что-то пошло не так!' });
});

module.exports = router; 