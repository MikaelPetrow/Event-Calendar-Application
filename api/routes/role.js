const express = require('express')
const router = express.Router()

const role = require('../controllers/role')
const auth = require('../middleware/authenticate')

router.use(auth.required, auth.isAdmin)
      .route('/')
      .get(role.list)

module.exports = router
