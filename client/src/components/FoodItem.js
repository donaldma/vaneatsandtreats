import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles/index'
import { Card, CardContent, Icon, IconButton } from '@material-ui/core'
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import classNames from 'classnames'

const styles = (theme) => ({
  root: {},
  card: {
    minWidth: 275,
    marginBottom: '2rem',
    marginTop: '2rem',
    borderRadius: 0
  },
  title: {
    fontSize: 14
  },
  visitCount: {
    color: '#666;',
    opacity: 0.7
  },
  cities: {
    fontSize: '12px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  citiesRow: {
    borderTop: '1px solid #e5e5e5'
  },
  editIcon: {
    color: '#ccc',
    padding: 0
  }
})

class FoodItem extends Component {
  render() {
    const { classes, index, filters, user } = this.props
    const { id, name, rating, visitCount, price, type, cities, isClosed } = this.props.foodObj
    const displayName = isClosed ? `${name} - CLOSED` : name
    return (
      <Card className={classes.card}>
        <CardContent>
          <div className='row'>
            <div className='col-8 offset-2 text-center'>
              <div className='mb-3'>
                <span className='mb-3 font-weight-bold'>{index}.</span> {displayName}
              </div>
              <div className='mb-3'>
                <i className={classes.visitCount}>visited {visitCount} times</i>
              </div>
              <div className='mb-3'>
                <Rater rating={rating / 10} total={10} interactive={false} /> <span>{rating / 10}</span>
              </div>
              <div className='mb-3'>
                {price} • {type}
              </div>
            </div>
            {
              user && user.isAdmin &&
              <div className='col-2 text-right'>
                <Link to={{ pathname: `/food/edit/${id}`, state: { foodObj: this.props.foodObj } }}>
                  <Icon className={classes.editIcon} fontSize='small'>
                    edit
                  </Icon>
                </Link>
              </div>
            }
          </div>
          <div className={classNames(classes.citiesRow, 'row pt-3')}>
            {cities.map((x, i) => {
              const selectedCity = filters.city === x
              return (
                <div
                  key={i}
                  className={classNames(classes.cities, 'col-sm-3 col-4', { 'font-weight-bold': selectedCity })}
                >
                  {x}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles, { withTheme: true })(FoodItem)
