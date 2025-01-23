const { Image } = require('../models/images')
const { deleteImgCloud } = require('../../utils/deleteImage')
// ver todas las imágenes subidas a la plataforma
const getImages = async (req, res) => {
  try {
    const images = await Image.find()
    return res.status(200).json(images)
  } catch (error) {
    console.log(`Error al obtener las imágenes: ${error}`)
    return res.status(500).json(`Error al obtener las imágenes`)
  }
}
// ver las imágenes por categoría
const imgByCategory = async (req, res) => {
  try {
    const { category } = req.params
    const images = await Image.find({ category })
    return res.status(200).json(images)
  } catch (error) {
    console.log(`Error al obtener la categoría: ${error}`)
    return res.status(500).json(`Error al obtener las imágenes por categoría`)
  }
}
const imgByUser = async (req, res) => {
  try {
    const { user } = req.params
    const images = await Image.find({ user })
    return res.status(200).json(images)
  } catch (error) {
    console.log(`Error al obtener la categoría: ${error}`)
    return res.status(500).json(`Error al obtener las imágenes por categoría`)
  }
}
// subir una imagen a la plataforma
const postImage = async (req, res) => {
  const { category } = req.body
  try {
    const newImage = new Image({
      image: req.file ? req.file.path : null,
      user: req.user._id,
      category
    })
    const savedImage = await newImage.save()
    return res.status(201).json(savedImage)
  } catch (error) {
    console.log(`Error al crear la imagen: ${error}`)
    if (req.file) {
      deleteImgCloud(req.file.path)
    }
    return res.status(500).json(`Error al crear la imagen`)
  }
}
// actualizar una imagen
const updateImage = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(404).json('Indique ID de imagen')
    }
    const actualImage = await Image.findById(id)
    if (!actualImage) {
      return res.status(404).json('Imagen NO encontrada')
    }
    const oldPath = actualImage.image
    const { category } = req.body
    if (req.file && oldPath !== req.file.path) {
      deleteImgCloud(oldPath)
    }
    const newData = {
      image: req.file ? req.file.path : oldPath,
      user: req.user._id,
      category: category || actualImage.category
    }
    const imageUpdated = await Image.findByIdAndUpdate(id, newData, {
      new: true
    })

    return res.status(200).json(imageUpdated)
  } catch (error) {
    console.log(`Error al actualizar la imagen: ${error}`)
    if (req.file) {
      deleteImgCloud(req.file.path)
    }
    return res.status(500).json(`Error al actualizar la imagen`)
  }
}
// eliminar una imagen
const deleteImage = async (req, res) => {
  try {
    const { id } = req.params
    const imageDeleted = await Image.findByIdAndDelete(id)
    if (imageDeleted.image) {
      deleteImgCloud(imageDeleted.image)
    }
    return res.status(200).json('Imagen eliminada correctamente')
  } catch (error) {
    console.log(`Error al intentar eliminar la imagen: ${error}`)
    return res.status(500).json(`Error al intentar eliminar la imagen`)
  }
}

module.exports = {
  getImages,
  imgByCategory,
  imgByUser,
  postImage,
  updateImage,
  deleteImage
}
