require('dotenv').config()
const express = require('express')
const { connectDB } = require('./src/config/db')
const imagesRouter = require('./src/api/routes/images')
const userRouter = require('./src/api/routes/users')
const cloudinary = require('cloudinary').v2
const app = express()
connectDB()
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
app.use(express.json())
app.use('/api/v1/images', imagesRouter)
app.use('/api/v1/users', userRouter)
app.use('*', (req, res) => {
  res.status(404).json('Route not found')
})

app.listen(3000, () => {
  console.log('Servidor funcionando en http://localhost:3000')
})
