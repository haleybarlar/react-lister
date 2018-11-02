import React, { Component } from 'react'
import ListContainer from './ListContainer.js'
import {connect} from 'react-redux'

class User extends Component {

componentDidMount() {
  fetch('http://localhost:3000/api/v1/users/1')
  .then(resp => resp.json())
  .then(resp => this.props.sendUser(resp))
}

render() {

  return(
    <div>
      <ListContainer />
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
    }
  }
}

export default connect(null, mapDispatchToProps)(User)
