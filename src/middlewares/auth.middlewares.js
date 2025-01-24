const { Image } = require('../api/models/images')
const { User } = require('../api/models/users')
const { verifyToken } = require('../utils/token')

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) {
    return res.status(401).json('Token inexistente')
  }
  try {
    const { id } = verifyToken(token, process.env.JWT_SECRET)
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json('Usuario o token no válidos')
    }
    req.user = user
    next()
  } catch (error) {
    console.log(`Error al verificar token: ${error}`)
    return res.status(500).json('Acceso NO autorizado')
  }
}

const isOwner = async (req, res, next) => {
  const user = req.user
  const paramId = req.params.id
  const userId = user._id
  const userIdToString = userId.toString()
  try {
    const image = await Image.findById(paramId)
    let userImage
    if (image) {
      userImage = image.user.toString()
    }
    if (paramId === userIdToString || userImage === userIdToString) {
      req.user = user
      next()
    } else {
      return res.status(401).json('Acceso NO autorizado')
    }
  } catch (error) {
    console.log(`Error al verificar propiedad de datos: ${error}`)
    return res.status(500).json('Acceso NO autorizado')
  }
}

module.exports = { isAuth, isOwner }
