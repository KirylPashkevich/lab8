const { Product, Order } = require('../models');
const fs = require('fs').promises;
const path = require('path');

class ProductController {
    // Получить все товары
    async getAllProducts(req, res) {
        try {
            const products = await Product.findAll();
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Получить товар по ID
    async getProductById(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Товар не найден' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Создать новый товар с изображением
    async createProduct(req, res) {
        try {
            const imagePath = req.file ? `/uploads/products/${req.file.filename}` : null;
            const product = await Product.create({
                ...req.body,
                image_path: imagePath
            });
            res.status(201).json(product);
        } catch (error) {
            // Если произошла ошибка, удаляем загруженное изображение
            if (req.file) {
                await fs.unlink(req.file.path).catch(console.error);
            }
            res.status(400).json({ message: error.message });
        }
    }

    // Обновить товар с возможностью изменения изображения
    async updateProduct(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                if (req.file) {
                    await fs.unlink(req.file.path).catch(console.error);
                }
                return res.status(404).json({ message: 'Товар не найден' });
            }

            const oldImagePath = product.image_path;
            const imagePath = req.file ? `/uploads/products/${req.file.filename}` : oldImagePath;

            await product.update({
                ...req.body,
                image_path: imagePath
            });

            // Если было загружено новое изображение, удаляем старое
            if (req.file && oldImagePath) {
                const oldImageFullPath = path.join(__dirname, '..', oldImagePath);
                await fs.unlink(oldImageFullPath).catch(console.error);
            }

            res.json(product);
        } catch (error) {
            if (req.file) {
                await fs.unlink(req.file.path).catch(console.error);
            }
            res.status(400).json({ message: error.message });
        }
    }

    // Удалить товар
    async deleteProduct(req, res) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Товар не найден' });
            }

            const imagePath = product.image_path;
            await product.destroy();

            // Удаляем изображение товара
            if (imagePath) {
                const imageFullPath = path.join(__dirname, '..', imagePath);
                await fs.unlink(imageFullPath).catch(console.error);
            }

            res.json({ message: 'Товар успешно удален' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Получить все заказы товара
    async getProductOrders(req, res) {
        try {
            const product = await Product.findByPk(req.params.id, {
                include: [{
                    model: Order,
                    include: ['Store']
                }]
            });
            if (!product) {
                return res.status(404).json({ message: 'Товар не найден' });
            }
            res.json(product.Orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

// Экспортируем экземпляр контроллера
const productController = new ProductController();
module.exports = productController; 