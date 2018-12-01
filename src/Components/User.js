import React, { Component } from 'react'
import GetStarted from './GetStarted.js'
import Calendar from './Calendar.js'
import HomePage from './HomePage.js'
import ListContainer from './ListContainer.js'
import {connect} from 'react-redux'
import { withRouter, Route, Switch } from "react-router-dom";

class User extends Component {

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
        this.props.setCurrentUser(resp)
        this.findUserInfo(resp)
      }
    })
  }

  findUserInfo = (resp) => {

    const id = resp.id

    fetch(`http://localhost:3000/api/v1/users/${id}`)
      .then(resp => resp.json())
      .then(resp => {
        const userInfo = {...resp}
        delete userInfo["lists"]
        this.props.setCurrentUser(userInfo)
        this.props.sendLists(resp.lists)
        this.props.listsDone(resp.lists_completed)
        this.props.tasksDone(resp.tasks_completed)
      })
  }

  render() {
    return(
      <div>
        <Switch>
          <Route path="/user/home" component={HomePage}/>
          <Route path="/user/getstarted" component={GetStarted}/>
          <Route path="/user/lists" component={ListContainer}/>
          <Route path="/user/calendar" component={Calendar}/>
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
    },
    sendTasks: (tasks) => {
      dispatch({
        type: "SEND_TASKS",
        payload: tasks
      })
    },
    listsDone: (num) => {
      dispatch({
        type: "LISTS_DONE",
        payload: num
      })
    },
    tasksDone: (num) => {
      dispatch({
        type: "TASKS_DONE",
        payload: num
      })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User))
