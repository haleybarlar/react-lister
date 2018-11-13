import React, { Component } from 'react'
import Task from './Task.js'
import {connect} from 'react-redux'
import { Pagination, Button, Form, Popup, Input, Dropdown, Modal } from 'semantic-ui-react'
import { Link, Redirect } from "react-router-dom";

class List extends Component {

  state = {
    allDone: false,
    deleted: false,
    clicked: false
  }

  // componentDidUpdate(prevProps){
  //   if (this.props.currentList !== prevProps.currentList) {
  //   this.forceUpdate()
  //   }
  // }

  handleSubmit = (event) => {
    event.preventDefault()

    const data = {
      list_id: this.props.currentList.id,
      priority: "high",
      description: event.target.task.value,
      done: false
    }

    fetch('http://localhost:3000/api/v1/tasks', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json())
    .then(resp => this.props.sendTasks(resp))

    event.target.task.value = ""
  }

  handleDelete = (event) => {

    this.props.goBack()

    this.setState({
      deleted: true
    })

    const id = event.target.parentElement.id

    fetch(`http://localhost:3000/api/v1/lists/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.props.removeList(id)
  }

  allLists = () => {
    this.setState({
      clicked: true
    })
  }

  render() {

    console.log(this.props.currentList);
    const today = new Date()

    if(this.state.clicked === true) {
      return <Redirect to='/user/allLists' />
    }

    const lists = (!this.props.lists ? null : this.props.lists.map(list =>
      ({key: list.id, id: list.id, value: list.id, text: list.kind})
    ))

    return(

      <div >
      { /* <div className="vadim">
          <h1>select your list</h1>
          <Dropdown placeholder='Select List' search selection options={lists} onChange={this.handleChange}/>
          <h3>or</h3>
          <h1>create a new list</h1>
          <Modal open={this.state.open} onClose={this.close} trigger={
            <Button circular icon='add' onClick={this.triggerModal}>
            </Button>
          } closeIcon>
            <Modal.Header>Create a list</Modal.Header>
            <Modal.Content>
              <Form.Input type="text" onChange={this.handleChange} placeholder="ex: todo, gratitude, grocery"/>
              <Modal.Actions>
                <Button type="submit" value="Submit" onClick={this.handleSubmit}>Submit</Button>
              </Modal.Actions>
            </Modal.Content>
          </Modal>
        </div>*/}



      <div id={this.props.currentList.id} className="entire-list" >
        <h1>my {this.props.currentList.kind} list</h1>
      {/*  <Button className="delete-button" onClick={this.props.goBack} inline field>Go BACK!!!</Button>
        <Popup trigger={<Button inline field circular icon='x' onClick={this.handleDelete}/>} content="Delete this list"/>*/}
        <div className="list-div">
          <Form type="submit" onSubmit={this.handleSubmit} >
            <Input type="text" name="task" placeholder="make a todo" className="haley"/>
          </Form>
          <Task />
        </div>
      </div>

  </div>




    )
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    currentList: state.lists.find(list => list.id === state.currentListID),
    lists: state.lists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendTasks: (task) => {
      dispatch({
        type: "SEND_TASKS",
        payload: task
      })
    },
    removeList: (id) => {
      dispatch({
        type: "REMOVE_LIST",
        payload: id
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)

// <button onClick={(event) => {this.setCurrentList( this.props.list.id); this.handleClick(event);}}>
//   {this.props.list.kind}
// </button>
