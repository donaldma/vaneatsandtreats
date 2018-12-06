const foodData = require('../../config/foodData')

exports.seed = function (knex, Promise) {
  return knex('food').del()
    .then(() => {
      let promises = foodData.map(x => {
        return knex('food').insert({
          name: x.name,
          type: x.type,
          city: x.city,
          rating: x.rating,
          price: x.price,
          visitCount: x.visitCount,
          isClosed: x.isClosed
        })
      })

      return Promise.all(promises);
    });
};