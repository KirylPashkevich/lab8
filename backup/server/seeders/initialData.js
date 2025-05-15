const { Store, Product, Order } = require('../models');
const path = require('path');
const fs = require('fs').promises;

// Функция для создания тестовых данных
const seedDatabase = async () => {
    try {
        // Очищаем существующие данные
        await Order.destroy({ where: {} });
        await Product.destroy({ where: {} });
        await Store.destroy({ where: {} });

        // Создаем тестовые магазины
        const stores = await Store.bulkCreate([
            {
                email: 'store1@example.com',
                delivery_payment: true
            },
            {
                email: 'store2@example.com',
                delivery_payment: false
            },
            {
                email: 'store3@example.com',
                delivery_payment: true
            }
        ]);

        // Создаем тестовые продукты
        const products = await Product.bulkCreate([
            {
                name: 'Смартфон iPhone 13',
                manufacturer: 'Apple',
                model: 'iPhone 13',
                specifications: '6.1" Super Retina XDR, A15 Bionic, 128GB',
                price: 799.99,
                warranty_period: 12,
                image_path: null
            },
            {
                name: 'Ноутбук MacBook Pro',
                manufacturer: 'Apple',
                model: 'MacBook Pro 14"',
                specifications: 'M1 Pro, 16GB RAM, 512GB SSD',
                price: 1999.99,
                warranty_period: 24,
                image_path: null
            },
            {
                name: 'Планшет iPad Air',
                manufacturer: 'Apple',
                model: 'iPad Air 5',
                specifications: '10.9" Liquid Retina, M1, 64GB',
                price: 599.99,
                warranty_period: 12,
                image_path: null
            }
        ]);

        // Создаем тестовые заказы
        const orders = await Order.bulkCreate([
            {
                store_id: stores[0].store_id,
                product_id: products[0].product_id,
                order_date: new Date(),
                order_time: new Date().toTimeString().split(' ')[0],
                quantity: 2,
                customer_name: 'Иван Иванов',
                contact_phone: '+375291234567',
                is_confirmed: true
            },
            {
                store_id: stores[1].store_id,
                product_id: products[1].product_id,
                order_date: new Date(),
                order_time: new Date().toTimeString().split(' ')[0],
                quantity: 1,
                customer_name: 'Петр Петров',
                contact_phone: '+375292345678',
                is_confirmed: false
            },
            {
                store_id: stores[2].store_id,
                product_id: products[2].product_id,
                order_date: new Date(),
                order_time: new Date().toTimeString().split(' ')[0],
                quantity: 3,
                customer_name: 'Анна Сидорова',
                contact_phone: '+375293456789',
                is_confirmed: true
            }
        ]);

        console.log('База данных успешно заполнена тестовыми данными');
    } catch (error) {
        console.error('Ошибка при заполнении базы данных:', error);
    }
};

module.exports = seedDatabase; 