import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";
import GetStarted from './GetStarted.js'

class HomePage extends Component {

  state = {
    clicked: false,
    value: "",
    submitted: false
  }

render() {

  if (this.state.clicked === true) {
    return <Redirect to='/user/getStarted' />
  }

  console.log(this.props.currentUser.name);

  return(
    <div className='home-page'>
      <h1>hello, {this.props.currentUser.name}.</h1>
      <GetStarted />
    </div>
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
    addList: (list) => {
      dispatch({
        type: "ADD_LIST",
        payload: list
      })
    },
    setCurrentList: (id) => {
      dispatch({
        type: "SET_LIST",
        payload: id
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
