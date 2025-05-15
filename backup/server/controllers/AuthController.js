const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController {
    // Регистрация нового пользователя
    async register(req, res) {
        try {
            const { email, password, name } = req.body;

            // Проверяем, существует ли пользователь с таким email
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
            }

            // Хешируем пароль
            const hashedPassword = await bcrypt.hash(password, 10);

            // Создаем нового пользователя
            const user = await User.create({
                email,
                password: hashedPassword,
                name,
                role: 'user' // По умолчанию роль - обычный пользователь
            });

            // Создаем JWT токен
            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(201).json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Вход пользователя
    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Ищем пользователя по email
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ message: 'Неверный email или пароль' });
            }

            // Проверяем пароль
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Неверный email или пароль' });
            }

            // Создаем JWT токен
            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Получение информации о текущем пользователе
    async getMe(req, res) {
        try {
            const user = await User.findByPk(req.user.id, {
                attributes: { exclude: ['password'] }
            });
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new AuthController(); 