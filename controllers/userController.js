const { User } = require('../models/models');
const jwt = require('jsonwebtoken');

class UserController {
    async login(req, res) {
        const { telegram_id } = req.body; 
        
        if (!telegram_id) {
            return res.status(400).json({ message: 'Telegram ID is required' });
        }

        try {
            let user = await User.findOne({ where: { telegram_id } });

            if (!user) {
                user = await User.create({ telegram_id });
            }

            const token = jwt.sign({ id: user.id, telegram_id: user.telegram_id }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            return res.status(200).json({ token });
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }

    async getUserInfo(req, res) {
        const { telegram_id } = req.params; // Получаем telegram_id из параметров

        try {
            const user = await User.findOne({ where: { telegram_id } });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(user);
        } catch (error) {
            console.error('Error fetching user info:', error);
            return res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports = new UserController();
