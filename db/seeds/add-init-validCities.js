const Constants = require('../../config/Constants')

exports.seed = function (knex, Promise) {
  return knex('validCities').del()
    .then(() => {
      let promises = Constants.validCities.map(x => {
        return knex('validCities').insert({
          name: x
        })
      })

      return Promise.all(promises);
    });
};