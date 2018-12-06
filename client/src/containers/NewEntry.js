import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles/index'
import { postFood } from '../actions'
import classNames from 'classnames'
import TagsInput from 'react-tagsinput'
import { toast } from 'react-toastify'

import 'react-tagsinput/react-tagsinput.css'

const styles = (theme) => ({
  text: {
    color: 'black'
  }
})

class NewEntry extends Component {
  state = {
    name: '',
    cities: [],
    type: '',
    rating: '',
    price: '',
    visitCount: 1,
    isClosed: false
  }

  componentDidMount() {
    if (!this.props.user || this.props.user === null) {
      this.props.history.push('/login')
    }
  }

  handleSubmit = async (e) => {
    const { name, cities, type, rating, price, visitCount, isClosed } = this.state
    e.preventDefault()

    if (!name) return toast.error('Please enter a name')
    if (cities && cities.length < 1) return toast.error('Please enter at least one city')
    if (!type) return toast.error('Please enter a type')
    if (!rating) return toast.error('Please enter a rating')
    if (!price) return toast.error('Please enter a price')

    await this.props.postFood({
      name,
      cities,
      type,
      rating,
      price,
      visitCount,
      isClosed
    })

    if (this.props.foodReducer.error) {
      return toast.error(this.props.foodReducer.error)
    }

    toast.success('New Entry Saved!')

    this.props.history.push('/')
  }

  handleChange = (state, value) => this.setState({ [state]: value })

  render() {
    const { classes, user } = this.props

    if (user && !user.isAdmin) {
      return (
        <div className='home-container container'>
          <div className='row vert-align'>
            <div className='col-12'>
              <h1>MUST BE AN ADMIN TO ADD NEW ENTRIES.</h1>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className='home-container container'>
        <div className='row'>
          <div className='col-12'>
            <div className='modal-dialog modal-login'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h4 className='modal-title'>New Entry</h4>
                </div>
                <div className='modal-body'>
                  <form id='modal-form' onSubmit={(e) => this.handleSubmit(e)}>
                    <div className='form-group'>
                      <label htmlFor='name'>Name</label>
                      <div className='input-group'>
                        <input
                          id='name'
                          type='text'
                          className='form-control'
                          required='required'
                          value={this.state.name}
                          onChange={(e) => this.handleChange('name', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='type'>Type</label>
                      <div className='input-group'>
                        <input
                          id='type'
                          type='text'
                          className='form-control'
                          required='required'
                          value={this.state.type}
                          onChange={(e) => this.handleChange('type', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='rating'>Rating</label>
                      <div className='input-group'>
                        <input
                          id='rating'
                          type='number'
                          className='form-control'
                          required='required'
                          value={this.state.rating}
                          onChange={(e) => this.handleChange('rating', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='price'>Price</label>
                      <div className='input-group'>
                        <input
                          id='price'
                          type='text'
                          className='form-control'
                          required='required'
                          value={this.state.price}
                          onChange={(e) => this.handleChange('price', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='visitCount'>Visit Count</label>
                      <div className='input-group'>
                        <input
                          id='visitCount'
                          type='number'
                          className='form-control'
                          required='required'
                          value={this.state.visitCount}
                          onChange={(e) => this.handleChange('visitCount', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='cities'>Cities</label>
                      <div className='input-group'>
                        <TagsInput
                          id='cities'
                          inputProps={{
                            className: 'react-tagsinput-input',
                            placeholder: 'Add a city'
                          }}
                          value={this.state.cities}
                          onChange={(tags) => this.handleChange('cities', tags)}
                        />
                      </div>
                      <div>
                        <i>
                          <small>* press enter after each city</small>
                        </i>
                      </div>
                    </div>
                    <div className='form-group'>
                      <div className='form-check'>
                        <input
                          id='isClosed'
                          type='checkbox'
                          className='form-check-input'
                          checked={this.state.isClosed}
                          onChange={(e) => this.handleChange('isClosed', !this.state.isClosed)}
                        />
                        <label className='form-check-label' htmlFor='isClosed'>
                          Is this place permanently closed?
                        </label>
                      </div>
                    </div>
                    <div className='form-group'>
                      <button type='submit' className='btn btn-primary btn-block btn-lg'>
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  postFood
}

const mapStateToProps = ({ foodReducer }) => ({
  foodReducer
})

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewEntry)
)
