import React, { Component } from 'react'
import classNames from 'classnames'

class Filterbar extends Component {
  state = {
    prices: ['$', '$$', '$$$', '$$$$']
  }

  render() {
    const { filters, types, cities, resetFilters, handlePriceChange, handleGeneralChange } = this.props
    return (
      <div className='filters-section py-3'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6 offset-lg-3'>
              <div className='row'>
                <div className='col-sm-6 my-1 text-center'>
                  <div className='btn-group'>
                    {
                      this.state.prices.map((x, i) => {
                        const selectedPrices = filters.price.includes(x)

                        return (
                          <label key={i} className={classNames('btn price-toggle', { 'price-toggle-active': selectedPrices })} onClick={() => handlePriceChange(x)}>
                            {x}
                          </label>
                        )
                      })
                    }
                  </div>
                </div>
                <div className='col-sm-6 my-1 text-center'>
                  <div className='btn-group'>
                    <label
                      className={classNames('btn price-toggle', { 'price-toggle-active': filters.sortByHighestRated })}
                      onClick={() => handleGeneralChange('sortByHighestRated', !filters.sortByHighestRated)}
                    >
                      {'Highest Rated'}
                    </label>
                  </div>
                </div>
                <div className='col-sm-6 my-1 text-center'>
                  <div className='dropdown'>
                    <button className='btn btn-dropdown dropdown-toggle' type='button' id='type' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                      <span>{filters.type ? filters.type : 'Food Type'}</span>
                    </button>
                    <div className='dropdown-menu' aria-labelledby='type'>
                      {
                        types.map((x, i) => {
                          return (
                            <button
                              key={i}
                              className={classNames('dropdown-item', { 'font-weight-bold': x === 'mel + ken top' })}
                              type='button'
                              onClick={() => handleGeneralChange('type', x)}
                            >
                              {x}
                            </button>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
                <div className='col-sm-6 my-1 text-center'>
                  <div className='dropdown'>
                    <button className='btn btn-dropdown dropdown-toggle' type='button' id='city' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                      <span>{filters.city ? filters.city : 'City'}</span>
                    </button>
                    <div className='dropdown-menu' aria-labelledby='city'>
                      {
                        cities.map((x, i) => (
                          <button key={i} className='dropdown-item' type='button' onClick={() => handleGeneralChange('city', x)}>{x}</button>
                        ))
                      }
                    </div>
                  </div>
                </div>
                <div className='col-12 mt-3'>
                  <input className='form-control filter-search' type='text' placeholder='Search By Name' value={filters.searchTerm} onChange={(e) => handleGeneralChange('searchTerm', e.target.value)} />
                </div>
              </div>

            </div>
            <button className='reset-filter' onClick={() => resetFilters()}>Reset</button>
          </div >

        </div>
      </div>
    )
  }
}

export default Filterbar

