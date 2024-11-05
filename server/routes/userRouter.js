const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');

router.post('/login', userController.authorizeUser);
router.delete('/:telegram_id', userController.deleteUser);

module.exports = router;