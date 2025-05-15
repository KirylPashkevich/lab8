const { Store, Order } = require('../models');

class StoreController {
    // Получить все магазины
    async getAllStores(req, res) {
        try {
            const stores = await Store.findAll();
            res.json(stores);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Получить магазин по ID
    async getStoreById(req, res) {
        try {
            const store = await Store.findByPk(req.params.id);
            if (!store) {
                return res.status(404).json({ message: 'Магазин не найден' });
            }
            res.json(store);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Создать новый магазин
    async createStore(req, res) {
        try {
            const store = await Store.create(req.body);
            res.status(201).json(store);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Обновить магазин
    async updateStore(req, res) {
        try {
            const store = await Store.findByPk(req.params.id);
            if (!store) {
                return res.status(404).json({ message: 'Магазин не найден' });
            }
            await store.update(req.body);
            res.json(store);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Удалить магазин
    async deleteStore(req, res) {
        try {
            const store = await Store.findByPk(req.params.id);
            if (!store) {
                return res.status(404).json({ message: 'Магазин не найден' });
            }
            await store.destroy();
            res.json({ message: 'Магазин успешно удален' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Получить все заказы магазина
    async getStoreOrders(req, res) {
        try {
            const store = await Store.findByPk(req.params.id, {
                include: [{
                    model: Order,
                    include: ['Product']
                }]
            });
            if (!store) {
                return res.status(404).json({ message: 'Магазин не найден' });
            }
            res.json(store.Orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

// Экспортируем экземпляр контроллера
const storeController = new StoreController();
module.exports = storeController; 