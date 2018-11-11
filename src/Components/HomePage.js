import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Button, Header, Image, Modal, Dropdown } from 'semantic-ui-react'
import { Link, Redirect } from "react-router-dom";

class HomePage extends Component {

  state = {
    clicked: false,
    value: "",
    submitted: false
  }

  handleSubmit = (e) => {
    e.preventDefault()

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
    .then(resp => this.props.addList(resp))
    .then(() => this.setState({open:false, submitted: true}))


  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    }, () => {
      console.log(this.state.value);
    })
  }

  close = () => this.setState({ open: false })
  open = () => this.setState({ open: true })
  triggerModal = () => this.setState({
    open: !this.state.open
  })


render() {

  if (this.state.submitted === true) {
    return <Redirect to='/user/lists' />
  }

  return(
    <div>
      <Modal open={this.state.open} onClose={this.close} trigger={<Button onClick={this.triggerModal}>Create a new list</Button>}>
        <Modal.Header>Create a list</Modal.Header>
          <Modal.Content>
            <form type="submit" onSubmit={this.handleSubmit} >
              <label>List type:</label>
              <input type="text" onChange={this.handleChange}></input>
              <Modal.Actions>
              <input type="submit" value="Submit"/>
              </Modal.Actions>
            </form>
          </Modal.Content>
      </Modal>

      <h1>or</h1>
      <Link to='/user/lists'><Button>Go to your lists</Button></Link>

    {/* <Modal trigger={<Button>Find a List</Button>}>
    <Modal.Header>Find a list</Modal.Header>
    <Modal.Content>
      <form type="submit" >
        <Dropdown placeholder='Type of List' fluid selection options={listOptions} onChange={this.change}/>
        <Link to="/user/lists"><Button>Submit</Button></Link>
      </form>
    </Modal.Content>
  </Modal>*/}
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
