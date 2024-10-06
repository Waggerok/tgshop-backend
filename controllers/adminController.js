const {Device, DeviceInfo, DeviceFilter, MacbookFilter, IpadFilter} = require('../models/models');

const adminController = {

    createDevice : async (req,res) => {
        try {
            const {name, price, quantity, image, model3D, deviceInfo, macbookFilters, ipadFilters, generalFilter} = req.body;

            if (!name || !price || !quantity) {
                res.status(400).json({ message: 'Missing required fields: name, price, or quantity' })
            };

            if (!image) {
                res.status(400).json({ message: 'Missing an image' })
            }

            if (!model3D) {
                res.status(400).json({ message: 'Missing an 3D model' })
            };

            const newDevice = await Device.create({
                name,
                price,
                quantity,
                model3D,
                image
            });

            if (deviceInfo) {
                await DeviceInfo.create({
                    device_id : newDevice.id,
                    title : deviceInfo.title,
                    description : deviceInfo.description,
                });
            };

            if (macbookFilters) {
                await MacbookFilter.create({
                    device_id: newDevice.id,
                    processor : macbookFilters.processor,
                    ram  : macbookFilters.ram
                });
            };

            if (ipadFilters) {
                await IpadFilter.create({
                    device_id : newDevice.id,
                    processor : ipadFilters.processor,
                    cellular : ipadFilters.cellular,
                });
            };

            if (generalFIlter) {
                await DeviceFilter.create({
                    device_id : newDevice.id,
                    filter_id : generalFilter.filter_id,
                    device_type : generalFilter.device_type,
                });
            };

            res.status(201).json(newDevice)
        }
        catch (error) {
            console.error('Error while creating device:', error);
            res.status(500).json({ message : 'Server Error', error })
        }
    }

}




module.exports = adminController;