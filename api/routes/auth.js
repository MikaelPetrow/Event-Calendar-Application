const express = require('express')
const router = express.Router()

const auth = require('../controllers/auth')

router.route('/signin')
      .post(auth.signin)

router.route('/signout')
      .post(auth.signout)      

module.exports = router
