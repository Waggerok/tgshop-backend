const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');


router.post('/login', (req, res, next) => {
    console.log('Login route hit');
    userController.login(req, res).catch(next);
});

router.get('/:telegram_id', (req, res, next) => {
    console.log('Get user info route hit for:', req.params.telegram_id);
    userController.getUserInfo(req, res).catch(next);
});

module.exports = router;