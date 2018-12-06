import * as _ from 'lodash'
import * as JsSearch from 'js-search'

const generalFilter = (foodData, filters, searchInstance) => {
  let filteredFoodData = _.sortBy(foodData, 'id')

  if (filters) {
    const { price, type, sortByHighestRated, searchTerm } = filters

    if (price && price.length > 0) {
      filteredFoodData = filteredFoodData.filter((x) => price.includes(x.price))
    }

    if (type) {
      filteredFoodData = filteredFoodData.filter((x) => x.type === type)
    }

    if (sortByHighestRated) {
      filteredFoodData = _.sortBy(filteredFoodData, 'rating').reverse()
    }

    if (searchTerm) {
      searchInstance.addDocuments(filteredFoodData)
      filteredFoodData = filterBysearchTerm(searchTerm, searchInstance)
    }
  }

  return filteredFoodData
}

// ugh two seperate filters is messy but can't think of a better way rn
const cityFilter = (foodData, city) => {
  let filteredFoodData = foodData

  if (city) {
    filteredFoodData = filteredFoodData.filter((x) => x.cities.includes(city))
  }

  return filteredFoodData
}

const initSearch = () => {
  const search = new JsSearch.Search('id')
  search.addIndex('name')
  search.addIndex('type')
  return search
}

const filterBysearchTerm = (term, searchInstance) => searchInstance.search(term)

export default {
  generalFilter,
  cityFilter,
  initSearch
}
