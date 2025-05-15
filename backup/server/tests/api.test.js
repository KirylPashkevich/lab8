const axios = require('axios');
const { Store, Product, Order } = require('../models');

const API_URL = 'http://localhost:5000/api';

// Тесты для Store API
const testStoreAPI = async () => {
    console.log('\n=== Тестирование Store API ===');
    
    try {
        // Получение всех магазинов
        const stores = await axios.get(`${API_URL}/stores`);
        console.log('GET /stores - Успешно:', stores.data.length, 'магазинов найдено');

        // Создание нового магазина
        const newStore = await axios.post(`${API_URL}/stores`, {
            email: 'teststore@example.com',
            delivery_payment: true
        });
        console.log('POST /stores - Успешно:', newStore.data);

        // Получение магазина по ID
        const store = await axios.get(`${API_URL}/stores/${newStore.data.store_id}`);
        console.log('GET /stores/:id - Успешно:', store.data);

        // Обновление магазина
        const updatedStore = await axios.put(`${API_URL}/stores/${newStore.data.store_id}`, {
            delivery_payment: false
        });
        console.log('PUT /stores/:id - Успешно:', updatedStore.data);

        // Получение заказов магазина
        const storeOrders = await axios.get(`${API_URL}/stores/${newStore.data.store_id}/orders`);
        console.log('GET /stores/:id/orders - Успешно:', storeOrders.data.length, 'заказов найдено');

        // Удаление магазина
        await axios.delete(`${API_URL}/stores/${newStore.data.store_id}`);
        console.log('DELETE /stores/:id - Успешно');
    } catch (error) {
        console.error('Ошибка при тестировании Store API:', error.response?.data || error.message);
    }
};

// Тесты для Product API
const testProductAPI = async () => {
    console.log('\n=== Тестирование Product API ===');
    
    try {
        // Получение всех продуктов
        const products = await axios.get(`${API_URL}/products`);
        console.log('GET /products - Успешно:', products.data.length, 'продуктов найдено');

        // Создание нового продукта
        const newProduct = await axios.post(`${API_URL}/products`, {
            name: 'Test Product',
            manufacturer: 'Test Manufacturer',
            model: 'Test Model',
            specifications: 'Test Specifications',
            price: 99.99,
            warranty_period: 12
        });
        console.log('POST /products - Успешно:', newProduct.data);

        // Получение продукта по ID
        const product = await axios.get(`${API_URL}/products/${newProduct.data.product_id}`);
        console.log('GET /products/:id - Успешно:', product.data);

        // Обновление продукта
        const updatedProduct = await axios.put(`${API_URL}/products/${newProduct.data.product_id}`, {
            price: 149.99
        });
        console.log('PUT /products/:id - Успешно:', updatedProduct.data);

        // Получение заказов продукта
        const productOrders = await axios.get(`${API_URL}/products/${newProduct.data.product_id}/orders`);
        console.log('GET /products/:id/orders - Успешно:', productOrders.data.length, 'заказов найдено');

        // Удаление продукта
        await axios.delete(`${API_URL}/products/${newProduct.data.product_id}`);
        console.log('DELETE /products/:id - Успешно');
    } catch (error) {
        console.error('Ошибка при тестировании Product API:', error.response?.data || error.message);
    }
};

// Тесты для Order API
const testOrderAPI = async () => {
    console.log('\n=== Тестирование Order API ===');
    
    try {
        // Создаем необходимые зависимости
        const store = await Store.create({
            email: 'orderstore@example.com',
            delivery_payment: true
        });

        const product = await Product.create({
            name: 'Order Test Product',
            manufacturer: 'Test Manufacturer',
            model: 'Test Model',
            specifications: 'Test Specifications',
            price: 99.99,
            warranty_period: 12
        });

        // Получение всех заказов
        const orders = await axios.get(`${API_URL}/orders`);
        console.log('GET /orders - Успешно:', orders.data.length, 'заказов найдено');

        // Создание нового заказа
        const newOrder = await axios.post(`${API_URL}/orders`, {
            store_id: store.store_id,
            product_id: product.product_id,
            order_date: new Date().toISOString().split('T')[0],
            order_time: new Date().toTimeString().split(' ')[0],
            quantity: 1,
            customer_name: 'Test Customer',
            contact_phone: '+375291234567',
            is_confirmed: false
        });
        console.log('POST /orders - Успешно:', newOrder.data);

        // Получение заказа по ID
        const order = await axios.get(`${API_URL}/orders/${newOrder.data.order_id}`);
        console.log('GET /orders/:id - Успешно:', order.data);

        // Обновление заказа
        const updatedOrder = await axios.put(`${API_URL}/orders/${newOrder.data.order_id}`, {
            is_confirmed: true
        });
        console.log('PUT /orders/:id - Успешно:', updatedOrder.data);

        // Получение заказов по ID магазина
        const storeOrders = await axios.get(`${API_URL}/orders/store/${store.store_id}`);
        console.log('GET /orders/store/:storeId - Успешно:', storeOrders.data.length, 'заказов найдено');

        // Удаление заказа
        await axios.delete(`${API_URL}/orders/${newOrder.data.order_id}`);
        console.log('DELETE /orders/:id - Успешно');

        // Очистка тестовых данных
        await product.destroy();
        await store.destroy();
    } catch (error) {
        console.error('Ошибка при тестировании Order API:', error.response?.data || error.message);
    }
};

// Запуск всех тестов
const runTests = async () => {
    try {
        await testStoreAPI();
        await testProductAPI();
        await testOrderAPI();
        console.log('\nВсе тесты завершены');
    } catch (error) {
        console.error('Ошибка при выполнении тестов:', error);
    }
};

// Запускаем тесты
runTests(); 