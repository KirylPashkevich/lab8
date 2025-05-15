const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Store = require('./Store');
const Product = require('./Product');

const Order = sequelize.define('Order', {
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    store_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Store,
            key: 'store_id'
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'product_id'
        }
    },
    order_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    order_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    customer_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contact_phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'orders',
    timestamps: false
});

// Определяем связи
Order.belongsTo(Store, { foreignKey: 'store_id' });
Order.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = Order; 