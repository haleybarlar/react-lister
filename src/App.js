import React, { Component, Fragment } from 'react';
import Navbar from './Components/Navbar.js'
import LoginForm from './Components/LoginForm.js'
import HomePage from './Components/HomePage.js'
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
        this.props.setCurrentUser(resp)
    })
  }

  handleLogout = () => {
    localStorage.removeItem("jwt");
    this.props.logoutUser()
  }

  render() {
    return (

      <Fragment className="whole-div">
          <Navbar handleLogout={this.handleLogout}/>
          <Switch>
            <Route exact path="/home" component={HomePage}/>
            <Route exact path="/user" component={User}/>
            <Route exact path="/login" component={LoginForm}/>
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
