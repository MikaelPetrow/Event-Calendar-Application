const express = require('express')
const router = express.Router()

const file_info = require('../controllers/file_info')
const file = require('../controllers/file')
const auth = require('../middleware/authenticate')

router.use(auth.required)
      .route('/')
      .get(file_info.list)

router.use(auth.required)
      .route('/:id')
      .get(file_info.get)

router.use(auth.required)
      .route('/:id')
      .delete(file_info.delete, file.delete)

module.exports = router
