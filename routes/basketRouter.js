const express = require('express');
const router = express.Router();
const BasketController = require('../controllers/basketController');

router.get('/basket/:telegram_id', BasketController.getUserBasketByTelegramId);

router.post('/basket', BasketController.addDeviceToBasket);

router.delete('/basket/:telegram_id/device/:deviceId', BasketController.deleteDeviceFromBasket);

router.delete('/basket/:telegram_id/clear', BasketController.clearBasket);

module.exports = router;