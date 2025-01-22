const express = require('express')
const {
  getImages,
  imgByCategory,
  postImage,
  updateImage,
  deleteImage,
  imgByUser
} = require('../controllers/images')
const { uploadImages } = require('../../middlewares/file')
const { isAuth, isOwner } = require('../../middlewares/auth.middlewares')
const imagesRouter = express.Router()

imagesRouter.get('/', isAuth, getImages)
imagesRouter.get('/category/:category', isAuth, imgByCategory)
imagesRouter.get('/imgByUser/:user', isAuth, imgByUser)
imagesRouter.post('/', isAuth, uploadImages.single('image'), postImage)
imagesRouter.put(
  '/:id',
  isAuth,
  isOwner,
  uploadImages.single('image'),
  updateImage
)
imagesRouter.delete('/:id', isAuth, isOwner, deleteImage)

module.exports = imagesRouter
