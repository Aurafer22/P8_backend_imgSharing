const { User } = require('../../api/models/users')
const mongoose = require('mongoose')
const users = require('./data')
const bcrypt = require('bcrypt')
mongoose
  .connect(
    'mongodb+srv://aurafercomunicacion:laknco7IK870n0ndjdnoa@cluster0.jlkzw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(async () => {
    const allUsers = await User.find()
    if (allUsers.length) {
      await User.collection.drop()
    }
  })
  .catch((error) => {
    console.log(`Error al dropear los datos: ${error}`)
  })
  .then(async () => {
    for (const user of users) {
      const hashPassword = await bcrypt.hash(user.password, 10)
      user.password = hashPassword
    }
    await User.insertMany(users)
    console.log('Semilla creada correctamente')
  })
  .catch((error) => {
    console.log(`Error al crear la semilla: ${error}`)
  })
  .finally(() => {
    mongoose.disconnect()
  })
