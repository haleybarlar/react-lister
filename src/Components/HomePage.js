import React, { Component } from 'react'

import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";
import { Segment, Button } from 'semantic-ui-react'

class HomePage extends Component {

  state = {
    clicked: false,
    value: "",
    submitted: false
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.setState({
      clicked: true
    })

    if (this.state.value !== "") {
    const data = {
      user_id: 1,
      kind: this.state.value,
      done: false
    }

    fetch('http://localhost:3000/api/v1/lists', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json())
    .then(resp => {this.props.addList(resp); this.props.setCurrentList(resp.id);})
    .then(() => this.setState({open:false, submitted: true}))
    }
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  close = () => this.setState({ open: false })
  open = () => this.setState({ open: true })
  triggerModal = () => this.setState({
    open: !this.state.open
  })

  setClicked = () => {
    this.setState({
      clicked: true
    })
  }

render() {

  const square = { width: 200, height: 200 }

  if (this.state.clicked === true) {
    return <Redirect to='/user/getStarted' />
  }

  return(
    <div>
      <img src={"/Artboard 1.jpg"} alt="something" className="mindful-img"/>
      <Segment circular style={square} onClick={this.setClicked} className="a-circle">
        <h1 className="get-started-h1">get started</h1>
      </Segment>
    </div>
  )
}
}

const mapStateToProps = (state) => {
  return {
    lists: state.lists
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
