const express = require('express')
const router = express.Router()

const event = require('../controllers/event')
const file = require('../controllers/file')
const auth = require('../middleware/authenticate')
const multer  = require('multer')
var path = require('path')

const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './files')
      },
      filename: function (req, file, cb) {
            console.log('TÄÄLLÄ')
        cb(null, path.parse(file.originalname).name + '_' + [...Array(10)].map(i=>(~~(Math.random()*36)).toString(36)).join('') + path.parse(file.originalname).ext)
      }
    })

const upload = multer({ storage: storage })

router.use(auth.required)
      .route('/')
      .get(event.list)

router.use(auth.required)
      .route('/:id')
      .get(event.get)

router.use(auth.required, auth.isAdmin)
      .route('/')
      .post(upload.array('files'), event.create)

router.use(auth.required, auth.isAdmin)
      .route('/:id')
      .put(upload.array('files'), event.update)

router.use(auth.required, auth.isAdmin)
      .route('/:id')
      .delete(event.delete, file.delete)

module.exports = router
