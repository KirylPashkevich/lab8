const { Order, Store, Product } = require('../models');

class OrderController {
    // Получить все заказы
    async getAllOrders(req, res) {
        try {
            const orders = await Order.findAll({
                include: [
                    { model: Store },
                    { model: Product }
                ]
            });
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Получить заказ по ID
    async getOrderById(req, res) {
        try {
            const order = await Order.findByPk(req.params.id, {
                include: [
                    { model: Store },
                    { model: Product }
                ]
            });
            if (!order) {
                return res.status(404).json({ message: 'Заказ не найден' });
            }
            res.json(order);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Создать новый заказ
    async createOrder(req, res) {
        try {
            const order = await Order.create(req.body);
            const orderWithRelations = await Order.findByPk(order.order_id, {
                include: [
                    { model: Store },
                    { model: Product }
                ]
            });
            res.status(201).json(orderWithRelations);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Обновить заказ
    async updateOrder(req, res) {
        try {
            const order = await Order.findByPk(req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Заказ не найден' });
            }
            await order.update(req.body);
            const updatedOrder = await Order.findByPk(order.order_id, {
                include: [
                    { model: Store },
                    { model: Product }
                ]
            });
            res.json(updatedOrder);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Удалить заказ
    async deleteOrder(req, res) {
        try {
            const order = await Order.findByPk(req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Заказ не найден' });
            }
            await order.destroy();
            res.json({ message: 'Заказ успешно удален' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Получить заказы по ID магазина
    async getOrdersByStoreId(req, res) {
        try {
            const orders = await Order.findAll({
                where: { store_id: req.params.storeId },
                include: [
                    { model: Store },
                    { model: Product }
                ]
            });
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

// Экспортируем экземпляр контроллера
const orderController = new OrderController();
module.exports = orderController; 