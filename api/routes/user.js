const express = require('express')
const router = express.Router()

const user = require('../controllers/user')
const auth = require('../middleware/authenticate')

router.use(auth.required, auth.isAdmin)
      .route('/')
      .get(user.list)

router.use(auth.required, auth.isAdmin)
      .route('/:id')
      .get(user.get)

router.use(auth.required, auth.isAdmin)
      .route('/')
      .post(user.create)

router.use(auth.required, auth.isAdmin)
      .route('/:id')
      .put(user.update)

router.use(auth.required, auth.isAdmin)
      .route('/:id')
      .delete(user.delete)

module.exports = router
