
// Thiết lập Cloudinary
// cloudinary.config({
//   cloud_name: 'dmpru0wgq',
//   api_key: '644726543393577',
//   api_secret: 'pg6HkQN7Et7IzSIzYyQGA9qNbFE',
// });
require('dotenv').config()
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  params:{
    folder: process.env.CLOUDINARY_FOLDER
  }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
