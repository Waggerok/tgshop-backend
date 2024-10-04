const Router = require('express');
const router = new Router();

router.get('/', deviceController.getAllDevices);
router.get('/:id', deviceController.getDeviceById);
router.post('/', deviceController.createDevice); // admin
router.patch('/:id', deviceController.updateDevice); // admin
router.delete('/:id', deviceController.deleteDevice); // admin

module.exports = router;