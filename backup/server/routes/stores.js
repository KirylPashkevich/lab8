const express = require('express');
const router = express.Router();
const storeController = require('../controllers/StoreController');

// Получить все магазины
router.get('/', storeController.getAllStores);

// Получить магазин по ID
router.get('/:id', storeController.getStoreById);

// Создать новый магазин
router.post('/', storeController.createStore);

// Обновить магазин
router.put('/:id', storeController.updateStore);

// Удалить магазин
router.delete('/:id', storeController.deleteStore);

// Получить все заказы магазина
router.get('/:id/orders', storeController.getStoreOrders);

module.exports = router; 