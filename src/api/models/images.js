const mongoose = require('mongoose')
const imageSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    category: {
      type: String,
      enum: [
        'retrato',
        'paisaje',
        'boda',
        'alimento',
        'calle',
        'arte',
        'comercial',
        'moda',
        'deporte',
        'fauna',
        'viajes'
      ],
      required: true
    }
  },
  { timestamps: true, collection: 'images' }
)

const Image = mongoose.model('images', imageSchema, 'images')
module.exports = { Image }
