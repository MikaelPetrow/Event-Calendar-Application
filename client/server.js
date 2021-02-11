// env vars
require('dotenv').config()

// libraries
const express = require('express')
const serveStatic = require("serve-static")
const path = require('path')
const cors = require('cors')
const history = require('connect-history-api-fallback')

// variables
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 8080

// express
var app = express()
app.use(history())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// static vue routes
app.use(serveStatic(path.join(__dirname, 'dist')))

// start server
app.listen(port, host)
