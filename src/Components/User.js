import React, { Component } from 'react'
import ListContainer from './ListContainer.js'
import SignupForm from './SignupForm.js'
import LoginForm from './LoginForm.js'
import Calendar from './Calendar.js'
import HomePage from './HomePage.js'
import {connect} from 'react-redux'
import { Route, NavLink, HashRouter, Switch } from "react-router-dom";

class User extends Component {

componentDidMount() {
  fetch('http://localhost:3000/api/v1/users/1')
  .then(resp => resp.json())
  .then(resp => {
    const userInfo = {...resp}
    console.log(resp.lists);
    delete userInfo["lists"]
    this.props.sendUser(userInfo)
    this.props.sendLists(resp.lists)
  })
}

render() {

  return(
    <div>
      <Switch>
        <Route exact path="/user/home" component={HomePage}/>
        <Route exact path="/user/lists" component={ListContainer}/>
        <Route exact path="/user/calendar" component={Calendar}/>
      </Switch>

    </div>
  )
}

}

const mapDispatchToProps = (dispatch) => {
  return {
    sendUser: (user) => {
      dispatch({
        type: "SEND_USER",
        payload: user
      })
    },
    sendLists: (lists) => {
      dispatch({
        type: "SEND_LISTS",
        payload: lists
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(User)
