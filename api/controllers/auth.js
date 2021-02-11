const config = require('config')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const User = require('../models').User;

/**
 * passport auth
 */
function _onPassportAuth(req, res, error, user, info) {
  if (error) res.json(error);
  if (!user.active) {
    var response = {
      code: 'E_UNAUTHORIZED',
      message: 'User account is inactive',
  }
  if (!user) {
    var response = {
      code: 'E_UNAUTHORIZED',
      message: 'Missing or invalid authentication token',
    }
    return res.status(401).json(response)
  }
   return res.status(401).json(response)
  }
  return res.json({
    token: jwt.sign({
      user: user
    },
    config.key.secret,
    {
      algorithm: 'HS256',
      expiresIn: config.key.expiresIn,
      issuer: "PlaceholderIssuer",
      audience: "PlaceholderAudience"
    }),
    user: user
  });
}


/**
 *
 */
module.exports = {

  signin: async (req, res) => {
    passport.authenticate('local',
      _onPassportAuth.bind(this, req, res))(req, res);
  },

  signout: async (req, res) => {
    res.json({message: 'Logged Out'})
  }

}
