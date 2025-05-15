const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { syncDatabase } = require('./models');
const seedDatabase = require('./seeders/initialData');
const routes = require('./routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Статические файлы (для доступа к изображениям)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API маршруты
app.use('/api', routes);

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Что-то пошло не так!' });
});

const PORT = process.env.PORT || 5000;

// Синхронизация базы данных, сидинг данных и запуск сервера
const startServer = async () => {
    try {
        // Синхронизация базы данных
        await syncDatabase();
        
        // Сидинг данных (раскомментируйте следующую строку, если нужно заполнить базу тестовыми данными)
        // await seedDatabase();
        
        // Запуск сервера
        app.listen(PORT, () => {
            console.log(`Сервер запущен на порту ${PORT}`);
        });
    } catch (error) {
        console.error('Ошибка при запуске сервера:', error);
    }
};

startServer(); 