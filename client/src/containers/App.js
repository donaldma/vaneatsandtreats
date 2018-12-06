import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { getMeUser } from '../actions'
import ToastWrapper from '../components/ToastWrapper'
import Loader from '../components/Loader'
import Home from './Home'
import Nav from './Nav'
import Login from './Login'
import Profile from './Profile'
import NewEntry from './NewEntry'
import EditEntry from './EditEntry'

class App extends Component {
  componentDidMount() {
    this.props.getMeUser()
  }

  render() {
    if (this.props.userReducer.isFetching) return <Loader />

    const user = this.props.userReducer.data

    return (
      <Router>
        <div>
          <Nav user={user} />
          <Switch>
            <Route exact path='/' render={(props) => <Home {...props} user={user} />} />
            <Route exact path='/profile' render={(props) => <Profile {...props} user={user} />} />
            <Route exact path='/food/new' render={(props) => <NewEntry {...props} user={user} />} />
            <Route exact path='/food/edit/:id' render={(props) => <EditEntry {...props} user={user} />} />
            <Route exact path='/login' component={Login} />
            <Route component={Home} />
          </Switch>
          <ToastWrapper />
        </div>
      </Router>
    )
  }
}

const mapDispatchToProps = {
  getMeUser
}

const mapStateToProps = ({ userReducer }) => ({
  userReducer
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
