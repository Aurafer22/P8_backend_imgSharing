const { deleteImgCloud } = require('../../utils/deleteImage')
const { generateToken } = require('../../utils/token')
const { User } = require('../models/users')
const bcrypt = require('bcrypt')

async function register(req, res) {
  try {
    const { username } = req.body
    const dupliUser = await User.findOne({ username })
    if (dupliUser) {
      return res.status(400).json('El usuario ya existe')
    }
    const newUser = new User({
      username,
      password: req.body.password,
      photo: req.file ? req.file.path : null
    })
    const userSaved = await newUser.save()
    return res.status(201).json(`Usuario creado correctamente: ${userSaved}`)
  } catch (error) {
    console.log('Error al crear usuario', error)
    if (req.file) {
      deleteImgCloud(req.file.path)
    }
    return res.status(500).json(`Error al crear usuario`)
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(404).json('Usuario no encontrado')
    }
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user._id, user.username)
      return res.status(200).json(token)
    } else {
      return res.status(400).json('Usuario o contraseña incorrectos')
    }
  } catch (error) {
    console.log('Error al hacer login', error)
    return res.status(500).json(`Error al hacer login`)
  }
}
const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    console.log(`Error al obtener los usuarios: ${error}`)
    return res.status(500).json('Error al obtener los usuarios')
  }
}
const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id).populate('images')
    if (!user) {
      return res.status(404).json('Usuario NO encontrado')
    }
    return res.status(200).json(user)
  } catch (error) {
    console.log(`Error al obtener las imágenes por usuario: ${error}`)
    return res.status(500).json('Error al obtener las imagenes por usuario')
  }
}
const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(404).json('Indique usuario')
    }
    const actualUser = await User.findById(id)
    if (!actualUser) {
      return res.status(404).json('Usuario NO encontrado')
    }
    const oldPath = actualUser.photo
    if (req.file && oldPath !== req.file.path) {
      deleteImgCloud(oldPath)
    }
    const { username, password, images } = req.body
    const newData = {
      username: username || actualUser.username,
      password: password
        ? bcrypt.hashSync(req.body.password, 10)
        : actualUser.password,
      photo: req.file ? req.file.path : oldPath
    }
    let userImages = []
    if (Array.isArray(images)) {
      userImages = [...actualUser.images, ...images]
    } else {
      userImages = [...actualUser.images, images]
    }
    const modifyUser = await User.findByIdAndUpdate(
      id,
      { ...newData, $addToSet: { images: { $each: userImages } } },
      {
        new: true
      }
    )
    return res.status(200).json(modifyUser)
  } catch (error) {
    console.log(`Error al actualizar el usuario: ${error}`)
    if (req.file) {
      deleteImgCloud(req.file.path)
    }
    return res.status(500).json('Error al actualizar el usuario')
  }
}
const deleteUser = async (req, res) => {
  try {
    const user = req.user
    const userDeleted = await User.findByIdAndDelete(user._id)
    if (!userDeleted) {
      return res.status(404).json('Usuario NO encontrado')
    }
    if (userDeleted.photo) {
      deleteImgCloud(userDeleted.photo)
    }
    return res.status(200).json('Usuario eliminado correctamente')
  } catch (error) {
    console.log(`Error al eliminar el usuario: ${error}`)
    return res.status(500).json('Error al eliminar el usuario')
  }
}

module.exports = {
  register,
  login,
  getUsers,
  deleteUser,
  updateUser,
  getUser
}
