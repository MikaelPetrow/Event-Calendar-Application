// config
const config      = require('config')
const logger      = require('morgan')
const express     = require('express')
const cors        = require('cors')
const bodyParser  = require('body-parser')

// express app
const app = express()

// logger
app.use(logger(process.env.NODE_ENV))

// loaders
const passport = require('./middleware/passport')
const auth        = require('./middleware/authenticate')
const routes = require('./routes')

// cors
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// app
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/files', auth.required, express.static('files'))
app.use('/api', routes)

// server port
const port = config.server.port
const host = config.server.host

// Start server
app.listen(port, host,  err => {
  if (err) {
    return new Error(err)
  }
  console.log(`Server is running on port ${port}`)
})

module.exports = app
