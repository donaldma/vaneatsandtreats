const createError = require('http-errors')
const Constants = require('../config/Constants')

const cleanCityString = (cityString) => {
  return cityString.toLowerCase().trim()
}

const capitalizeFirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const handleServerError = (res, err) => {
  const { status, message } = err
  const code = status ? status : 500
  const errorMessage = message ? message : 'Unknown Error'

  res.status(code).send({
    status: code,
    message: errorMessage
  })
}

const validateFoodEntity = (method, body, validCities) => {
  const { name, cities, type, rating, price } = body

  if (method === 'create') {
    if (!name) throw createError(400, 'Please enter a valid food place name.')

    if (!cities || cities.length === 0) throw createError(400, 'Please enter a valid city name.')

    cities.forEach(x => {
      const cleanCity = cleanCityString(x)
      if (!validCities.map(x => x.name).includes(cleanCity)) throw createError(400, `Must be a valid city in Metro Vancouver. You entered ${x}`)
    })

    if (!type) throw createError(400, 'Please enter a valid food type.')

    if (!rating) throw createError(400, 'Please enter a valid rating.')

    if (!price || !Constants.validPrices.includes(price)) throw createError(400, 'Please enter a valid price level.')

  } else if (method === 'update') {

    if (cities && cities.length > 0) {
      cities.forEach(x => {
        const cleanCity = cleanCityString(x)
        if (!validCities.map(x => x.name).includes(cleanCity)) throw createError(400, `Must be a valid city in Metro Vancouver. You entered ${x}`)
      })
    }

    if (price && !Constants.validPrices.includes(price)) throw createError(400, 'Please enter a valid price level.')

  }

}

const createNewFoodEntity = (body, validCities) => {
  const { name, cities, type, rating, price, visitCount, isClosed } = body

  validateFoodEntity('create', body, validCities)

  const city = cities.map(x => cleanCityString(x)).join(',')

  return {
    name,
    city,
    type,
    rating,
    price,
    visitCount,
    isClosed
  }
}

const createUpdateFoodEntity = (body, validCities) => {
  const { name, cities, type, rating, price, visitCount, isClosed } = body

  validateFoodEntity('update', body, validCities)

  const city = cities.map(x => cleanCityString(x)).join(',')

  return {
    name,
    city,
    type,
    rating,
    price,
    visitCount,
    isClosed
  }
}

module.exports = {
  createNewFoodEntity,
  createUpdateFoodEntity,
  capitalizeFirst,
  handleServerError
}