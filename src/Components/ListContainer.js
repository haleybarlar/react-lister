import React, { Component } from 'react'
import List from './List.js'
import TodoList from './TodoList.js'
import {connect} from 'react-redux'
import { Pagination, Menu, Segment, Icon, Modal, Dropdown, Button } from 'semantic-ui-react'
import { Link } from "react-router-dom";

class ListContainer extends Component {


  state = {
    value: "",
    open: false
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  handleItemClick = (list) => {
    this.props.setCurrentList(list.id)
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
    .then(() => this.setState({open:false}))
  }

  close = () => this.setState({ open: false })
  open = () => this.setState({ open: true })
  triggerModal = () => this.setState({
    open: !this.state.open
  })

render() {

  // let list = this.props.lists.find(list => list.kind === this.state.activeItem)
  if(this.props.currentList === undefined) {
    return null
  } else {
    this.props.setCurrentList(this.props.currentList.id)
  }


  console.log(this.state.open)

  // if (this.props.lists.length === 0 ? null : this.props.lists.sort(function(a,b) {return b.id - a.id}))
  return(

    <div>
      <Segment attached='top'>
        <List />
      </Segment>

      <Menu attached='right' tabular>
        {(this.props.lists.length === 0 ? null : this.props.lists.map(list =>
          <Menu.Item name={list.kind} active={this.props.currentList === list} onClick={() => {
            this.handleItemClick(list)
          }}>
            {(list.done ? <strike>{list.kind}</strike> : list.kind)}
          </Menu.Item>
        ))}

        <Menu.Menu position='right'>
          <Modal open={this.state.open} onClose={this.close} trigger={
            <Menu.Item onClick={this.triggerModal}>
              <Icon name='add' />
                New List
            </Menu.Item>
          } closeIcon>
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
    currentList: state.lists.find(list => list.id === state.currentListID),
    listDone: state.isListDone
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
