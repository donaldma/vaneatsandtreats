const LocalStrategy = require('passport-local').Strategy
const AuthHelper = require('../utils/AuthHelper')
const createError = require('http-errors')

module.exports = (passport, dbHelper) => {
  const options = {}

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await dbHelper.getUserById(id)
      done(null, user)
    } catch (err) {
      done(err, null)
    }
  })

  passport.use(new LocalStrategy(options, async (username, password, done) => {
    try {
      const user = await dbHelper.getUserByUsername(username)
      if (!user) return done(createError(404, `User ${username} not found.`), false)

      if (!AuthHelper.comparePass(password, user.password)) {
        return done(createError(401, 'Incorrect username or password.'), false)
      } else {
        return done(null, user)
      }
    } catch (err) {
      done(err)
    }
  }))



}