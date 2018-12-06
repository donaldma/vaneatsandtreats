import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFood,postActivity } from '../actions'
import FoodList from '../components/FoodList'
import Filterbar from '../components/Filterbar'
import Loader from '../components/Loader'
import FiltersHelper from '../utils/FiltersHelper'
import Helpers from '../utils/Helpers'

class Home extends Component {
  state = {
    filters: {
      price: [],
      type: undefined,
      city: undefined,
      sortByHighestRated: false,
      searchTerm: '',
      searchInstance: undefined
    }
  }

  async componentDidMount() {
    const promises = [this.props.getFood(), this.props.postActivity()]
    await Promise.all(promises)

    this.setState({ searchInstance: FiltersHelper.initSearch() })
  }

  resetFilters = () => {
    this.setState({
      filters: {
        price: [],
        type: undefined,
        city: undefined,
        sortByHighestRated: false,
        searchTerm: ''
      }
    })
  }

  handlePriceChange = (price) => {
    const { filters } = this.state
    let modifiedPriceState

    if (filters.price.includes(price)) {
      const indexOfPriceToRemove = filters.price.findIndex((x) => x === price)
      modifiedPriceState = [
        ...filters.price.slice(0, indexOfPriceToRemove),
        ...filters.price.slice(indexOfPriceToRemove + 1, filters.price.length)
      ]
    } else {
      modifiedPriceState = [...filters.price, price]
    }

    this.setState({
      filters: {
        ...filters,
        price: modifiedPriceState
      }
    })
  }

  handleGeneralChange = (state, value) => {
    const { filters } = this.state

    this.setState({
      filters: {
        ...filters,
        [state]: value
      }
    })
  }

  render() {
    const { user } = this.props
    const { searchInstance, filters } = this.state

    if (!searchInstance || this.props.foodReducer.data === null) return <Loader />

    const filteredFoodData = FiltersHelper.generalFilter(this.props.foodReducer.data, filters, searchInstance)
    const finalFilteredFoodData = FiltersHelper.cityFilter(filteredFoodData, filters.city)

    const types = Helpers.getUniqueByKey(this.props.foodReducer.data, 'type')
    const cities = Helpers.getUniqueByKey(filteredFoodData, 'cities')

    return (
      <div className='home-container'>
        <Filterbar
          filters={filters}
          types={types}
          cities={cities}
          handlePriceChange={this.handlePriceChange}
          handleGeneralChange={this.handleGeneralChange}
          resetFilters={this.resetFilters}
        />
        <div className='container'>
          <FoodList filteredFoodData={finalFilteredFoodData} filters={filters} user={user} />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getFood, postActivity
}

const mapStateToProps = ({ foodReducer }) => ({
  foodReducer
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
