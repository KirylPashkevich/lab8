const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const upload = require('../config/multer');

// Получить все товары
router.get('/', productController.getAllProducts);

// Получить товар по ID
router.get('/:id', productController.getProductById);

// Создать новый товар с изображением
router.post('/', upload.single('image'), productController.createProduct);

// Обновить товар с возможностью изменения изображения
router.put('/:id', upload.single('image'), productController.updateProduct);

// Удалить товар
router.delete('/:id', productController.deleteProduct);

// Получить все заказы товара
router.get('/:id/orders', productController.getProductOrders);

module.exports = router; 