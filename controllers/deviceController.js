const {Device} = require('../models/models');
const {Op} = require('sequelize');
const path = require('path');
const fs = require('fs')

class DeviceController {
    async getAllDevices(req,res) {
        try {
            const {name, minPrice, maxPrice, device_type} = req.query;

            let filters = {};
            if (name) filters.name = { [Op.iLike]: `%${name}%`};
            if (minPrice) filters.price = { [Op.gte]: minPrice };
            if (maxPrice) filters.price = { [Op.gte]: maxPrice };
            if (device_type) filters.device_type = device_type;

            const devices = await Device.findAll({ where: filters })
            res.status(200).json(devices);
        } catch (error) {
            console.error('Error fetching devices', error);
            res.status(500).json({ message: 'Error fetching devices', error });
            
        }
    };

    async getDeviceById(req,res) {
        try {
            const {id} = req.params;
            const device = await Device.findByPk(id);

            if (!device) {
                return res.status(404).json({ message : 'Устройство не найдено' })
            };
            res.status(200).json(device);
        } catch (error) {
            console.error('Error fetching devices', error);
            res.status(500).json({ message: 'Error fetching devices', error });
        }
    };

    async createDevice(req,res) {
        try {
            const {name, description, price, quantity} = req.body;
            const image = req.files.image ? req.files.image[0] : null;
            const model3D = req.files.model3D ? req.files.model3D[0] : null;

            const existingDevice = await Device.findOne({ where: { name } });
            if (existingDevice) {
                return res.status(400).json({ message: 'Такое название устройства уже существует' });
            }

            if (!name || !description || !price || !image || !model3D || !quantity) {
                return res.status(400).json({ message: 'Все поля должны быть заполнены' })
            };

            const imagePath = path.join(__dirname, '..', 'uploads', 'images', `${Date.now()}_${image.originalname}`);
            const model3DPath = path.join(__dirname, '..', 'uploads', 'models', `${Date.now()}_${model3D.originalname}`);

            fs.writeFileSync(imagePath, image.buffer);
            fs.writeFileSync(model3DPath, model3D.buffer);
           
            const newDevice = await Device.create({
                name,
                description,
                price,
                image: `/uploads/images/${path.basename(imagePath)}`,
                model3D: `/uploads/models/${path.basename(model3DPath)}`,
                quantity,
            });
            
            res.status(201).json({ message : 'Устройство успешно создано', newDevice});
        } catch (error) {
            console.error('Error with creating device', error);
            res.status(500).json({ message: 'Устройство не было создано', error });
        }
    };

    async updateDevice(req,res) {
        try {
            const {id} = req.params;
            const {name,description,price,quantity} = req.body;

            const newImage = req.files?.image ? req.files.image[0].filename : null;
            const newModel3D = req.files?.model3D ? req.files.model3D[0].filename : null;

            const device = await Device.findByPk(id);

            if (!device) {
                return res.status(404).json({ message : 'Устройство не найдено' });
            };

            console.log('Before Update:', device.toJSON());

            const oldImagePath = device.image ? path.join(__dirname, '..', device.image) : null;
            const oldModel3DPath = device.model3D ? path.join(__dirname, '..', device.model3D) : null;

            console.log('New values', {
                name,
                description,
                price,
                image: newImage ? `/uploads/images/${newImage}` : device.image,
                model3D: newModel3D ? `/uploads/images/${newModel3D}` : device.model3D,
                quantity
            })

            await device.update({
                name,
                description,
                price,
                image : newImage ? `/uploads/images/${newImage}` : device.image,
                model3D : newModel3D ? `/uploads/models/${newModel3D}` : device.model3D,
                quantity,
            });
            console.log('After Update:', await Device.findByPk(id)); 

            if (newImage && oldImagePath && fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
            if (newModel3D && oldModel3DPath && fs.existsSync(oldModel3DPath)) {
                fs.unlinkSync(oldModel3DPath);
            }
    
            res.status(200).json({
                device: device.toJSON(),
                message: 'Устройство успешно обновлено',
            });
        } catch (error) {
            console.error('Error updating device:', error);
            res.status(500).json({ message: 'Ошибка при обновлении устройства', error});
        }
    };

    async deleteDevice(req,res) {
        try {
            const {id} = req.params;

            const device = await Device.findOne({ where: { id } });
            if (!device) {
                return res.status(404).json({ message : 'Устройство не найдено'})
            };

            const imagePath = path.join(__dirname, '..', device.image);
            const model3DPath = path.join(__dirname, '..', device.model3D);

            const deletedRows = await Device.destroy({
                where: { id: id }
            });
            
            if (!deletedRows === 0) {
                return res.status(404).json({ message: 'Устройство не найдено' })
            };

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
            if (fs.existsSync(model3DPath)) {
                fs.unlinkSync(model3DPath);
            }
    

            return res.status(200).json({ message: 'Устройство было успешно удалено' })
        } catch(error) {
            console.error('Error deleting device', error);
            res.status(500).json({ message: 'Ошибка при удалении устройства', error });
        };
    };
};

module.exports = new DeviceController();