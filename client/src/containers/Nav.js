import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions'

class Nav extends Component {
  renderDesktopContent = () => {
    const { user } = this.props
    let content

    if (user) {
      content = (
        <ul className='right'>
          {
            user.isAdmin &&
            <li>
              <Link to='/food/new'>New Entry</Link>
            </li>
          }
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li>
            <Link to='#' onClick={() => this.props.logout()}>Logout</Link>
          </li>
        </ul>
      )
    } else {
      content = (
        <ul className='right'>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </ul>
      )
    }

    return content
  }

  renderMobileContent = () => {
    const { user } = this.props
    let content

    if (user) {
      content = (
        <ul>
          {
            user.isAdmin &&
            <li>
              <Link to='/food/new' className='label'>New Entry</Link>
            </li>
          }
          <li>
            <Link to='/profile' className='label'>Profile</Link>
          </li>
          <li>
            <Link to='#' className='label' onClick={() => this.props.logout()}>Logout</Link>
          </li>
        </ul>
      )
    } else {
      content = (
        <ul>
          <li>
            <Link to='/login' className='label'>Login</Link>
          </li>
        </ul>
      )
    }

    return content
  }

  render() {
    return (
      <header className='cd-morph-dropdown'>
        <div className='mobile-logo'>
          <Link to='/'><img src='/img/nav-logo.png' alt='nav-logo' className='logo-img' /></Link>
        </div>
        <a href='#0' className='nav-trigger'>Open Nav<span aria-hidden='true'></span></a>

        <div className='container p-0'>
          <nav className='main-nav'>
            <ul className='left'>
              <li className='logo'>
                <Link to='/'><img src='/img/nav-logo.png' alt='nav-logo' className='logo-img' /></Link>
              </li>
            </ul>
            {this.renderDesktopContent()}
          </nav>
        </div>

        <div className='morph-dropdown-wrapper pb-0'>
          <div className='dropdown-list'>
            {this.renderMobileContent()}

            <div className='bg-layer' aria-hidden='true'></div>
          </div>
        </div>
      </header>
    )
  }
}

const mapDispatchToProps = {
  logout
}

export default connect(null, mapDispatchToProps)(Nav)

