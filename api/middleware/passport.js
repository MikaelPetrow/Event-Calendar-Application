const config = require('config')
const passport = require('passport')
const bcrypt = require('bcrypt')

const db = require('../models')
const User = db.User

const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

/**
 * Configuration object for local strategy
 */
const LOCAL_STRATEGY_CONFIG = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: false
};

/**
 * Configuration object for JWT strategy
 */
var JWT_STRATEGY_CONFIG = {
  secretOrKey: config.key.secret,
  issuer : "PlaceholderIssuer",
  audience: "PlaceholderAudience",
  passReqToCallback: false,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

/**
 * Triggers when user authenticates via local strategy
 */
function _onLocalStrategyAuth(username, password, next) {
  User
    .findOne({
      where: {username: username},
      include : [{
        model: db.Role,
        as: 'role'
      }]
    })
    .then((user) => {
      // no user found
      if (!user) {
        return next(null, false, {
          code: 'E_USER_NOT_FOUND',
          message: username + ' not found'
        });
      }
      // wrong password
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, {
          code: 'E_WRONG_PASSWORD',
          message: 'Wrong password'
        });
      }
      // all ok
      return next(null, user, {});
    });
}

/**
 * Triggers when user authenticates via JWT strategy
 */
function _onJwtStrategyAuth(payload, next) {
  var user = payload.user;
  return next(null, user, {});
}

/**
 * Passport Strategies
 */
passport.use(
   new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onLocalStrategyAuth))
passport.use(
  new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth))

// exports
module.exports = passport
