const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const adminRouter = require('./adminRouter')
const deviceRouter = require('./deviceRouter')
const basketRouter = require('./basketRouter')
const orderRouter = require('./orderRouter')
const notificationsRouter = require('./notificationsRouter')


router.use('/user', userRouter);
router.use('/admin', adminRouter);
router.use('/device', deviceRouter);
router.use('/basket', basketRouter);
router.use('/order', orderRouter);
router.use('/notifications', notificationsRouter);



module.exports = router;