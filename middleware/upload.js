const multer = require('multer');
const path = require('path');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         if (file.fieldname === 'image') {
//             cb(null, 'uploads/images');
//         } else if (file.fieldname === 'model3D') {
//             cb(null, 'uploads/models');
//         }
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

const storage = multer.memoryStorage();

const upload = multer({ storage });
module.exports = upload;