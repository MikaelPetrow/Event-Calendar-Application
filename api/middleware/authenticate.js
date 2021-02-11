const config = require('config')
const passport = require('passport')

const auth = {

  required: (req, res, next) => {
    passport.authenticate('jwt', (error, user, info) => {
      if (error) return res.json(error)
      if (!user) return res.status(401).json(null, info && info.code, info && info.message)
      req.user = user
      next()
    })(req, res)
  },

  isAdmin: (req, res, next) => {
    if (req.user.role.name == 'admin') {
      next()
    } else {
      res.status(403).send()
    }
  }

}

module.exports = auth
