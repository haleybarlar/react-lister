import React, { Component } from 'react'
import List from './List.js'
import {connect} from 'react-redux'

class ListContainer extends Component {

render() {

  return(
    <div>
      <List />
    </div>
  )
}
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    lists: state.lists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendLists: (users) => {
      dispatch({
        type: "SEND_LISTS",
        payload: users
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
