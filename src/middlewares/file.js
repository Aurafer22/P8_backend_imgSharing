const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

// const storageUsers = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'proyecto_8/Users',
//     allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
//   }
// })

// const storageImages = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'proyecto_8/Images',
//     allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
//   }
// })
// const uploadUsers = multer({ storage: storageUsers })
// const uploadImages = multer({ storage: storageImages })
// module.exports = { uploadUsers, uploadImages }

function configUploadImages(folder) {
  return new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `proyecto_8/${folder}`,
      allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
    }
  })
}
const uploadUsers = multer({ storage: configUploadImages('Users') })
const uploadImages = multer({ storage: configUploadImages('Images') })

module.exports = { uploadUsers, uploadImages }
