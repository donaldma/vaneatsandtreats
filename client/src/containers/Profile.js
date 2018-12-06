import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles/index'
import { updateMeUser } from '../actions'
import { toast } from 'react-toastify'
import classNames from 'classnames'

const styles = theme => ({
  text: {
    color: 'black'
  }
})

class Profile extends Component {
  state = {
    password: '',
    confirmPassword: ''
  }

  componentDidMount() {
    if (!this.props.user || this.props.user === null) {
      this.props.history.push('/login')
    }
  }

  handleSubmit = async (e) => {
    const { password, confirmPassword } = this.state
    e.preventDefault()

    if (password !== confirmPassword) return toast.error('Passwords do not match')

    await this.props.updateMeUser({ password: password })

    this.setState({
      password: '',
      confirmPassword: ''
    })
  }

  handleChange = (state, value) => this.setState({ [state]: value })

  render() {
    const { classes, user } = this.props

    return (
      <div className='home-container container'>
        <div className='row'>
          <div className='col-12'>
            <div className='modal-dialog modal-login'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h4 className='modal-title'>Profile</h4>
                </div>
                <div className='modal-body'>
                  <form id='modal-form' onSubmit={(e) => this.handleSubmit(e)}>
                    <div className='form-group'>
                      <label>Username</label>
                      <div className={classNames(classes.text, 'input-group')}>
                        {user && user.username}
                      </div>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='password'>Password</label>
                      <div className='input-group'>
                        <input
                          id='password'
                          type='password'
                          className='form-control'
                          required='required'
                          value={this.state.password}
                          onChange={(e) => this.handleChange('password', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='confirm-password'>Confirm Password</label>
                      <div className='input-group'>
                        <input
                          id='confirm-password'
                          type='password'
                          className='form-control'
                          required='required'
                          value={this.state.confirmPassword}
                          onChange={(e) => this.handleChange('confirmPassword', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <button type='submit' className='btn btn-primary btn-block btn-lg'>Update Profile</button>
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
  updateMeUser
}

export default withStyles(styles, { withTheme: true })(connect(null, mapDispatchToProps)(Profile))

