import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Button, Header, Image, Modal, Dropdown } from 'semantic-ui-react'
import { Link } from "react-router-dom";

class HomePage extends Component {

  state = {
    clicked: false,
    value: ""
  }

  handleClick = (event) => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    alert("great job!")

    const data = {
      user_id: 1,
      kind: this.state.value
    }

    fetch('http://localhost:3000/api/v1/lists', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json())
    .then(resp => this.props.addList(resp))
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.textContent
    })
  }

  change = (event) => {
    console.log(event.target.textContent);
  }

render() {

  const listOptions = [
    {
      text: 'Todo',
      value: 'Todo'
    },
    {
      text: 'Gratitude',
      value: 'Gratitude'
    },
    {
      text: 'Grocery',
      value: 'Grocery'
    }
  ]

  return(
    <div>
      <Modal trigger={<Button>Create a new list</Button>}>
        <Modal.Header>Create a list</Modal.Header>
        <Modal.Content>
          <form type="submit" onSubmit={this.handleSubmit}>
            <Dropdown placeholder='Create a list' fluid selection options={listOptions} onChange={this.handleChange}/>
            <Link to="/user/lists"><Button>Submit</Button></Link>
          </form>
        </Modal.Content>
      </Modal>

      <Modal trigger={<Button>Find a List</Button>}>
        <Modal.Header>Find a list</Modal.Header>
        <Modal.Content>
          <form type="submit" >
            <Dropdown placeholder='Type of List' fluid selection options={listOptions} onChange={this.change}/>
            <Link to="/user/lists"><Button>Submit</Button></Link>
          </form>
        </Modal.Content>
      </Modal>
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
