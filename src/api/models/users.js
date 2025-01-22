const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [8, 'La contraseña requiere un mínimo de 8 caracteres']
    },
    photo: { type: String, required: false },
    images: [{ type: mongoose.Types.ObjectId, ref: 'images' }]
  },
  { timestamps: true, collection: 'users' }
)
UserSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10)
  next()
})

const User = mongoose.model('users', UserSchema, 'users')
module.exports = { User }
