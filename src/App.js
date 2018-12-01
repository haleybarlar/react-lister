import React, { Component, Fragment } from 'react';
import Navbar from './Components/Navbar.js'
import LoginForm from './Components/LoginForm.js'
import Welcome from './Components/Welcome.js'
import SignupForm from './Components/SignupForm.js'
import './App.css';
import User from './Components/User.js'
import { withRouter, Route, Switch } from "react-router-dom";
import {connect} from 'react-redux'

class App extends Component {

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    if (token) {
      this.setUser(token)
    }
  }

  setUser = (token) => {
    fetch("http://localhost:3000/api/v1/profile", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`
      }
    })
    .then(resp => resp.json())
    .then(resp => {
      if (!resp.message) {
        this.props.setCurrentUser(resp)
      }
    })
  }

  handleLogout = () => {
    localStorage.removeItem("jwt");
    this.props.logoutUser()
  }

  render() {
    return (

      <Fragment>
          <Navbar handleLogout={this.handleLogout}/>
          <Switch>
            {this.props.currentUser ?
              <div>
                <Route path="/user" component={User}/>
                <Route path="/login" component={LoginForm}/>
                <Route path="/signup" component={SignupForm}/>
              </div>
            :
            <div>
              <Route exact path="/" component={Welcome}/>
              <Route path="/login" component={LoginForm}/>
              <Route path="/signup" component={SignupForm}/>
            </div>
            }
          </Switch>
      </Fragment>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    lists: state.lists,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (info) => {
      dispatch({
        type: "SEND_USER",
        payload: info
      })
    },
    logoutUser: () => {
      dispatch({
        type: "LOG_OUT"
      })
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
