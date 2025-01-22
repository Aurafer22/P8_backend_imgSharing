const express = require('express')
const {
  register,
  login,
  getUsers,
  deleteUser,
  updateUser,
  imgByUser,
  getUser
} = require('../controllers/users')
const { uploadUsers } = require('../../middlewares/file')
const { isAuth, isOwner } = require('../../middlewares/auth.middlewares')
const userRouter = express.Router()

userRouter.post('/register', uploadUsers.single('photo'), register)
userRouter.post('/login', login)
userRouter.get('/', isAuth, getUsers)
userRouter.get('/:id', isAuth, getUser)
userRouter.put('/:id', isAuth, isOwner, uploadUsers.single('photo'), updateUser)
userRouter.delete('/:id', isAuth, isOwner, deleteUser)

module.exports = userRouter
