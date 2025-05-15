const sequelize = require('../config/database');
const Store = require('./Store');
const Product = require('./Product');
const Order = require('./Order');
const User = require('./User');

// Определяем связи между моделями
Store.hasMany(Order, { foreignKey: 'store_id' });
Product.hasMany(Order, { foreignKey: 'product_id' });
User.hasMany(Order, { foreignKey: 'user_id' });

// Функция для синхронизации моделей с базой данных
const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('База данных успешно синхронизирована');
    } catch (error) {
        console.error('Ошибка при синхронизации базы данных:', error);
    }
};

module.exports = {
    sequelize,
    Store,
    Product,
    Order,
    User,
    syncDatabase
}; 