const createError = require('http-errors')
const bcrypt = require('bcryptjs')

const validateUserEntity = (method, body, user) => {
  const { username, password } = body

  if (method === 'create') {
    if (!username) throw createError(400, 'Please enter a valid username.')

    if (!password) throw createError(400, 'Please enter a valid password.')

    if(password.length < 6) throw createError(400, 'Your password must be at least 6 characters long.')

  } else if (method === 'update') {
    if(username && user.username !== username) throw createError(400, 'You cannot change your username.')

    if(password.length < 6) throw createError(400, 'Your password must be at least 6 characters long.')
  }
}

const comparePass = (userPassword, databasePassword) => {
  return bcrypt.compareSync(userPassword, databasePassword)
}

const createNewUserEntity = (body) => {
  validateUserEntity('create', body)

  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync(body.password, salt)

  return {
    username: body.username,
    password: hash,
    isAdmin: false
  }
}

const createUpdateUserEntity = (body, user) => {
  validateUserEntity('update', body, user)

  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync(body.password, salt)

  return {
    password: hash
  }
}

const loginRequired = (req, res, next) => {
  if (!req.user) throw createError(401, 'Please log in.')
  return next()
}

const loginRedirect = (req, res, next) => {
  if (req.user) throw createError(401, 'You are already logged in.')
  return next()
}

const adminRequired = async(req, res, next) => {
  try{
    if (!req.user) throw createError(401, 'Please log in.')
    if (!req.user.isAdmin) throw createError(401, 'You are not authorized.')
    return next()
  } catch(err) {
    return next(err)
  }
}

module.exports = {
  comparePass,
  createNewUserEntity,
  createUpdateUserEntity,
  loginRequired,
  loginRedirect,
  adminRequired
}