const jwt = require('jsonwebtoken');
const { User } = require('../models');

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Отсутствует токен авторизации' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Отсутствует токен авторизации' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Пользователь не найден' });
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Недействительный токен' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Срок действия токена истек' });
        }
        res.status(500).json({ message: 'Ошибка при проверке авторизации' });
    }
};

// Middleware для проверки роли администратора
const adminAuth = async (req, res, next) => {
    try {
        await auth(req, res, () => {
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Доступ запрещен. Требуются права администратора' });
            }
            next();
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { auth, adminAuth }; 