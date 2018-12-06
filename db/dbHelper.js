'use strict'

module.exports = (knex) => {
  return {
    addActivity: async (ipAddress) => {
      return knex('activity')
        .returning('*')
        .insert({ ipAddress })
    },

    getFood: () => {
      return knex('food')
        .select('*')
    },

    addFood: (foodEntity) => {
      return knex('food')
        .returning('*')
        .insert(foodEntity)
    },

    deleteFoodById: (id) => {
      return knex('food')
        .returning('*')
        .where({ id })
        .del();
    },

    updateFoodById: (id, foodEntity) => {
      return knex('food')
        .returning('*')
        .update(foodEntity)
        .where({ id })
    },

    getValidCities: () => {
      return knex('validCities')
        .select('*')
    },

    getUserById: (id) => {
      return knex('user')
        .where({ id })
        .first()
    },

    getUserByUsername: (username) => {
      return knex('user')
        .where({ username })
        .first()
    },

    publicGetUserById: (id) => {
      return knex('user')
        .select('id', 'username', 'isAdmin')
        .where({ id })
        .first()
    },

    createUser: (userEntity) => {
      return knex('user')
        .insert(userEntity)
        .returning(['id', 'username', 'isAdmin'])
    },

    updateUserById: (id, userEntity) => {
      return knex('user')
        .returning(['id', 'username', 'isAdmin'])
        .update(userEntity)
        .where({ id })
    }
  }
};