import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login, logout } from '../actions'

class Login extends Component {
  state = {
    username: undefined,
    password: undefined
  }

  handleLogin = async (e) => {
    const { username, password } = this.state

    e.preventDefault()

    await this.props.login({
      username: username,
      password: password
    })

  }

  handleLogout = () => this.props.logout()

  handleChange = (state, value) => this.setState({ [state]: value })

  render() {

    return (
      <div className='home-container container'>
        <div className='row'>
          <div className='col-12 text-center'>
            <div className='modal-dialog modal-login'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h4 className='modal-title'>Sign In</h4>
                </div>
                <div className='modal-body'>
                  <form id='modal-form' onSubmit={(e) => this.handleLogin(e)}>
                    <div className='form-group'>
                      <div className='input-group'>
                        <input
                          id='username'
                          type='text'
                          className='form-control'
                          placeholder='Username'
                          required='required'
                          onChange={(e) => this.handleChange('username', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <div className='input-group'>
                        <input
                          id='password'
                          type='password'
                          className='form-control'
                          placeholder='Password'
                          required='required'
                          onChange={(e) => this.handleChange('password', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <button type='submit' className='btn btn-primary btn-block btn-lg'>Sign In</button>
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
  login,
  logout
}

export default connect(null, mapDispatchToProps)(Login)
