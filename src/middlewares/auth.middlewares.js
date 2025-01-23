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
  console.log(user)
  const paramId = req.params.id
  console.log(`paramID: ${paramId}`)

  const userId = user._id
  console.log(`userId: ${userId}`)

  // const userIdToString = userId.toString()
  // console.log(`userIDString: ${userIdToString}`)

  try {
    const image = await Image.findById(paramId)
    const userImage = image.user
    console.log(`userImage: ${userImage}`)
    if (paramId === userId || userImage === userId) {
      console.log(userId === paramId)
      req.user = user
      next()
    } else {
      console.log(userId === userImage)

      return res.status(401).json('Acceso NO autorizado')
    }
  } catch (error) {
    console.log(`Error al verificar propiedad de datos: ${error}`)
    return res.status(500).json('Acceso NO autorizado')
  }
}

module.exports = { isAuth, isOwner }

// const imageId = user.images
// const imageToString = imageId.toString()
// if (paramId === userIdToString || imageToString.includes(paramId)) {
//   req.user = user
//   next()
// } else {
//   console.log(req.params.id.user)
//   return res.status(401).json('Acceso NO autorizado')
// }
