import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles/index'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const styles = (theme) => ({
  root: {}
})

class ToastWrapper extends Component {
  render() {
    return <ToastContainer className='text-center' autoClose={3000} hideProgressBar position='top-center' />
  }
}

export default withStyles(styles, { withTheme: true })(ToastWrapper)
