'use strict'

const express = require('express')
const router = express.Router()
const Helpers = require('../utils/Helpers')
const AuthHelper = require('../utils/AuthHelper')
const createError = require('http-errors')

module.exports = (dbHelper, passport) => {
  router.post('/activity', async (req, res, next) => {
    try {
      const response = await dbHelper.addActivity(req.connection.remoteAddress)
      res.json(response[0])
    } catch (err) {
      next(err)
    }
  })

  router.get('/food', async (req, res, next) => {
    try {
      const dbResponse = await dbHelper.getFood()
      const response = dbResponse.map((x) => {
        return {
          ...x,
          cities: x.city.split(',').map((y) => Helpers.capitalizeFirst(y))
        }
      })

      res.json(response)
    } catch (err) {
      next(err)
    }
  })

  router.post('/food', AuthHelper.adminRequired, async (req, res, next) => {
    try {
      const validCities = await dbHelper.getValidCities()
      const foodEntity = Helpers.createNewFoodEntity(req.body, validCities)
      await dbHelper.addFood(foodEntity)
      const dbResponse = await dbHelper.getFood()
      const response = dbResponse.map((x) => {
        return {
          ...x,
          cities: x.city.split(',').map((y) => Helpers.capitalizeFirst(y))
        }
      })
      res.json(response)
    } catch (err) {
      next(err)
    }
  })

  router.delete('/food/:id', AuthHelper.adminRequired, async (req, res, next) => {
    try {
      await dbHelper.deleteFoodById(req.params.id)
      const dbResponse = await dbHelper.getFood()
      const response = dbResponse.map((x) => {
        return {
          ...x,
          cities: x.city.split(',').map((y) => Helpers.capitalizeFirst(y))
        }
      })
      res.json(response)
    } catch (err) {
      next(err)
    }
  })

  router.put('/food/:id', AuthHelper.adminRequired, async (req, res, next) => {
    try {
      const validCities = await dbHelper.getValidCities()
      const foodEntity = Helpers.createUpdateFoodEntity(req.body, validCities)
      console.log(req.body)
      await dbHelper.updateFoodById(req.params.id, foodEntity)
      const dbResponse = await dbHelper.getFood()
      const response = dbResponse.map((x) => {
        return {
          ...x,
          cities: x.city.split(',').map((y) => Helpers.capitalizeFirst(y))
        }
      })

      res.json(response)
    } catch (err) {
      next(err)
    }
  })

  router.put('/user/me', AuthHelper.loginRequired, async (req, res, next) => {
    try {
      const userEntity = AuthHelper.createUpdateUserEntity(req.body, req.user)
      const response = await dbHelper.updateUserById(req.user.id, userEntity)

      res.json(response[0])
    } catch (err) {
      next(err)
    }
  })

  router.get('/user/me', AuthHelper.loginRequired, async (req, res, next) => {
    try {
      const response = await dbHelper.publicGetUserById(req.user.id)

      res.json(response)
    } catch (err) {
      next(err)
    }
  })

  router.post('/auth/register', AuthHelper.loginRedirect, async (req, res, next) => {
    try {
      const userEntity = AuthHelper.createNewUserEntity(req.body)
      const user = await dbHelper.getUserByUsername(userEntity.username)
      if (user) throw createError(400, `User ${userEntity.username} already exists.`)

      await dbHelper.createUser(userEntity)
    } catch (err) {
      next(err)
    }

    passport.authenticate('local', (err, user, info) => {
      if (err) next(err)
      if (user) {
        req.logIn(user, (err) => {
          if (err) next(err)
          const { password, ...newUser } = user
          res.json(newUser)
        })
      }
    })(req, res, next)
  })

  router.post('/auth/login', AuthHelper.loginRedirect, async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) next(err)
      if (user) {
        req.logIn(user, (err) => {
          if (err) next(err)
          const { password, ...newUser } = user
          res.json(newUser)
        })
      }
    })(req, res, next)
  })

  router.get('/auth/logout', AuthHelper.loginRequired, (req, res, next) => {
    req.logout()
    res.send({
      status: 200,
      message: 'Succesfully logged out.'
    })
  })

  return router
}
