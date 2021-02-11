require('dotenv').config()

module.exports = {
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
  },
  key: {
    secret: "yzt7Hjd74nQQHbqy",
    expiresIn: '1d'
  }
}
