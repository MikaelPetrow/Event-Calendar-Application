const express = require('express')
const router = express.Router()

// routes
const auth = require('./auth')
router.use('/auth', auth)

const user = require('./user')
router.use('/user', user)

const role = require('./role')
router.use('/role', role)

const event = require('./event')
router.use('/event', event)

const event_type = require('./event_type')
router.use('/event-type', event_type)

const fileInfo = require('./file_info')
router.use('/fileInfo', fileInfo)

const file = require('./file')
router.use('/file', file)

// default
router.get('/', (req, res) => {
  res.status(200).json({ message: 'REST' });
});

module.exports = router
