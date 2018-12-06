import React, { Component } from 'react'
import FoodItem from '../components/FoodItem'

class FoodList extends Component {
  render() {
    const { filteredFoodData, filters, user } = this.props

    return (
      <div>
        <div className='row'>
          <div className='col-lg-6 offset-lg-3'>
            {
              filteredFoodData.map((x, i) => {

                return (
                  <FoodItem
                    key={i}
                    index={i + 1}
                    foodObj={x}
                    id={x.id}
                    name={x.name}
                    rating={x.rating}
                    visitCount={x.visitCount}
                    price={x.price}
                    type={x.type}
                    cities={x.cities}
                    isClosed={x.isClosed}
                    filters={filters}
                    user={user}
                  />
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default FoodList