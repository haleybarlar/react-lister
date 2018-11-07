import React, { Component } from 'react'
import List from './List.js'
import TodoList from './TodoList.js'
import {connect} from 'react-redux'
import { Pagination, Menu, Segment, Icon, Modal, Dropdown, Button } from 'semantic-ui-react'
import { Link } from "react-router-dom";

class ListContainer extends Component {

  componentDidUpdate(){
    
  }

  state = {
    activeItem: 'todo',
    value: ""
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  handleSubmit = (e) => {
    e.preventDefault()

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

render() {

  let list = this.props.lists.find(list => list.kind === this.state.activeItem)

  if(list === undefined) {
    return null
  } else {
    this.props.setCurrentList(list.id)
  }

  const { activeItem } = this.state


  return(

    <div>
      <Segment attached='top'>
        <List />
      </Segment>

      <Menu attached='right' tabular>
        {(this.props.lists.length === 0 ? null : this.props.lists.map(list =>
          <Menu.Item name={list.kind} active={activeItem === list.kind} onClick={this.handleItemClick}>
            {list.kind}
          </Menu.Item>
        ))}

        <Menu.Menu position='right'>
          <Modal trigger={ <Menu.Item>
            <Icon name='add' />
              New List
            </Menu.Item>
          }>
            <Modal.Header>Create a list</Modal.Header>
            <Modal.Content>
              <form type="submit" onSubmit={this.handleSubmit}>
                <label>List type:</label>
                <input type="text" onChange={this.handleChange}></input>
                <Button>Submit</Button>
              </form>
            </Modal.Content>
          </Modal>
        </Menu.Menu>
      </Menu>
    </div>
  )
}
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    lists: state.lists,
    currentList: state.lists.find(list => list.id === state.currentListID)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendLists: (users) => {
      dispatch({
        type: "SEND_LISTS",
        payload: users
      })
    },
    setCurrentList: (id) => {
      dispatch({
        type: "SET_LIST",
        payload: id
      })
    },
    addList: (list) => {
      dispatch({
        type: "ADD_LIST",
        payload: list
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)

// {(this.props.currentList !== undefined && this.props.currentList.kind === "todo" ? <TodoList /> : <List/>)}
