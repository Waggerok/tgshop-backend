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
}

module.exports = new UserController();