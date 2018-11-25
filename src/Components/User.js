import React, { Component } from 'react'
import ListContainer from './ListContainer.js'
import Calendar from './Calendar.js'
import HomePage from './HomePage.js'
import HoldTheLists from './HoldTheLists.js'

import {connect} from 'react-redux'
import { Route, Switch } from "react-router-dom";

class User extends Component {

// componentDidMount() {
//   fetch('http://localhost:3000/api/v1/users/1')
//   .then(resp => resp.json())
//   .then(resp => {
//     const userInfo = {...resp}
//     console.log(resp.lists);
//     delete userInfo["lists"]
//     this.props.sendUser(userInfo)
//     this.props.sendLists(resp.lists)
//   })
// }

componentDidMount() {
  const token = localStorage.getItem("jwt");
  if (token) {
    this.setUser(token)
  }
}

setUser = (jwt) => {
  fetch("http://localhost:3000/api/v1/profile", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${jwt}`
    }
  })
  .then(resp => resp.json())
  .then(resp => {
    if (!resp.message) {
      console.log(resp);
      this.props.setCurrentUser(resp)
      // this.findUserInfo(resp)
  }
  })
}

// findUserInfo = (resp) => {
//
//   const id = resp.id
//
//   fetch(`http://localhost:3000/api/v1/users/${id}`)
//     .then(resp => resp.json())
//     .then(resp => {
//       const userInfo = {...resp}
//       console.log(resp.lists);
//       delete userInfo["lists"]
//       // this.props.setCurrentUser(userInfo)
//       // this.props.sendLists(resp.lists)
//     })
// }

render() {

  return(
    <div>
      <Switch>
        <Route exact path="/user/home" component={HomePage}/>
        <Route exact path="/user/getStarted" component={ListContainer}/>
        <Route exact path="/user/lists" component={HoldTheLists}/>
        <Route exact path="/user/calendar" component={Calendar}/>
      </Switch>
    </div>
  )
}

}

const mapDispatchToProps = (dispatch) => {
  return {
    sendLists: (lists) => {
      dispatch({
        type: "SEND_LISTS",
        payload: lists
      })
    },
    setCurrentUser: (info) => {
      dispatch({
        type: "SEND_USER",
        payload: info
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(User)
