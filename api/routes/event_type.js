const express = require('express')
const router = express.Router()

const event_type = require('../controllers/event_type')
const auth = require('../middleware/authenticate')

router.use(auth.required, auth.isAdmin)
      .route('/')
      .get(event_type.list)

module.exports = router
