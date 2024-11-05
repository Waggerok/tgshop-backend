const { where } = require('sequelize');
const { User } = require('../models/models');

class UserController {
    async authorizeUser(telegram_id, username) {
        try {
            // Проверяем, есть ли пользователь в базе данных
            let user = await User.findOne({ where: { telegram_id } });

            // Если пользователя нет, создаем его
            if (!user) {
                user = await User.create({ telegram_id, username });
            }

            // Логируем пользователя (можете использовать для отладки)
            console.log(`User authorized: ${telegram_id}, username: ${username}`);

            return user;
        } catch (error) {
            console.error('Error during user authorization:', error);
            throw error;
        }
    }
    async deleteUser(req,res) {
        try {
            const {telegram_id} = req.params;

            const user = await User.findOne({ where: {telegram_id} });
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден' })
            };

            await user.destroy();

            res.status(200).json({ message: 'Пользователь успешно удалён из базы данных' })
        } catch (error) {
            console.error('Error during deleting user:', error);
            res.status(500).json({ message: 'Ошибка при удалении пользователя', error })
        }
    }
}

module.exports = new UserController();