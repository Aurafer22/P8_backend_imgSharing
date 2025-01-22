const jwt = require('jsonwebtoken')

const generateToken = (id, username) => {
  return jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '1y' })
}

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}
module.exports = { generateToken, verifyToken }
