import * as _ from 'lodash'

const getUniqueByKey = (foodData, key) => {
  if (key === 'cities') {
    const flatCities = _.flatten(foodData.map(x => x.cities))
    const unqiueCities = _.uniq(flatCities)
    return _.sortBy(unqiueCities)
  } else {
    return _.uniq(foodData.map(x => x[key]))
  }
}

export default {
  getUniqueByKey
}