const Router = require('express');
const router = new Router();

router.get('/devices', adminController.getAllDevices);
router.post('/devices', adminController.createDevice);
router.patch('/devices/:id', adminController.updateDevice);
router.delete('/devices/:id', adminController.deleteDevice);

module.exports = router;