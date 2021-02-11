const express = require('express')
const router = express.Router()

const file = require('../controllers/file')
const auth = require('../middleware/authenticate')


router.use(auth.required)
      .route('/:fileName')
      .get(file.get)

module.exports = router
