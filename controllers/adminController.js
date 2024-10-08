// const {Device, DeviceInfo, DeviceFilter, MacbookFilter, IpadFilter} = require('../models/models');

// const adminController = {

//     createDevice : async (req,res) => {
//         try {
//             const {name, price, quantity, image, model3D, deviceInfo, macbookFilters, ipadFilters, generalFilter} = req.body;

//             if (!name || !price || !quantity) {
//                 res.status(400).json({ message: 'Missing required fields: name, price, or quantity' })
//             };

//             if (!image) {
//                 res.status(400).json({ message: 'Missing an image' })
//             }

//             if (!model3D) {
//                 res.status(400).json({ message: 'Missing an 3D model' })
//             };

//             const newDevice = await Device.create({
//                 name,
//                 price,
//                 quantity,
//                 model3D,
//                 img: image,
//             });

//             if (deviceInfo) {
//                 await DeviceInfo.create({
//                     device_id : newDevice.id,
//                     title : deviceInfo.title,
//                     description : deviceInfo.description,
//                 });
//             };

//             if (macbookFilters) {
//                 await MacbookFilter.create({
//                     device_id: newDevice.id,
//                     processor : macbookFilters.processor,
//                     ram  : macbookFilters.ram
//                 });
//             };

//             if (ipadFilters) {
//                 await IpadFilter.create({
//                     device_id : newDevice.id,
//                     processor : ipadFilters.processor,
//                     cellular : ipadFilters.cellular,
//                 });
//             };

//             if (generalFIlter) {
//                 await DeviceFilter.create({
//                     device_id : newDevice.id,
//                     filter_id : generalFilter.filter_id,
//                     device_type : generalFilter.device_type,
//                 });
//             };

//             res.status(201).json(newDevice)
//         }
//         catch (error) {
//             console.error('Error while creating device:', error);
//             res.status(500).json({ message : 'Server Error', error })
//         }
//     },

//     getAllDevices : async (req,res) => {
//         try {
//             const devices = await Device.findAll();
//             res.status(200).json(devices);
//         }
//         catch(error) {
//             console.error('Error while fetching devices:', error);
//             res.status(500).json({ message: 'Server error', error });
//         }
//     },

//     updateDevice : async (req,res) => {
//         try {
//             const { id } = req.params; // Получаем id устройства из параметров
//             const { name, price, quantity, model3D, image } = req.body;

//             const device = await Device.findByPk(id);
//             if (!device) {
//                 return res.status(400).json({ message: 'Device not found' })
//             };

//             await device.update({ name, price, quantity, model3D, img: image });
//             res.status(200).json(device);
//         }
//         catch(error) {
//             console.error('Error while updating device', error);
//             res.status(500).json({ message: 'Server error', error });
//         };
//     },

//     deleteDevice: async (req, res) => {
//         try {
//           const { id } = req.params; 
    
          
//           const device = await Device.findByPk(id);
//           if (!device) {
//             return res.status(404).json({ message: 'Device not found' });
//           }
    
          
//           await device.destroy();
//           res.status(204).send();
//         } catch (error) {
//           console.error('Error while deleting device:', error);
//           res.status(500).json({ message: 'Server error', error });
//         }
//       },
// }




// module.exports = adminController;