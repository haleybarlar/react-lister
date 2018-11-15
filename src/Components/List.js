import React, { Component } from 'react'
import Task from './Task.js'
import {connect} from 'react-redux'
import { Button, Form, Popup, Input } from 'semantic-ui-react'
import { Redirect } from "react-router-dom";

document.addEventListener("touchstart", function(){}, true)

class List extends Component {

  state = {
    allDone: false,
    deleted: false,
    clicked: false
  }

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

    this.setState({
      deleted: true
    })

    const id = event.target.parentElement.parentElement.id

    fetch(`http://localhost:3000/api/v1/lists/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if(this.props.lists.length > 1) {
      this.props.removeList(id)
    }
  }

  allLists = () => {
    this.setState({
      clicked: true
    })
  }

  render() {

    console.log(this.props.currentList);

    if(this.state.clicked === true) {
      return <Redirect to='/user/allLists' />
    }

    return(
      <div >
      {(this.props.currentList.tasks.length=== 0 ?
        <div>
          <h1  id={this.props.currentList.id}>{this.props.currentList.kind}</h1>
            <Popup
              trigger={
                <Button
                  inline field circular icon='x'
                  onClick={this.handleDelete}
                  id="delete-list-button"/>
              }
              content="Delete this list"/>
          <Form type="submit" onSubmit={this.handleSubmit} >
            <Input
              type="text"
              name="task"
              placeholder="make a todo"
              className="haley"/>
          </Form>
        </div>
      :
      <div id={this.props.currentList.id} className="entire-list" >
        <h1 id="list-name-h1">{this.props.currentList.kind}</h1>
        <Popup
          trigger={
            <Button
              inline field circular icon='x'
              onClick={this.handleDelete}
              id="delete-list-button"/>
          }
          content="Delete this list"/>
        <Form type="submit" onSubmit={this.handleSubmit} >
          <Input
            type="text"
            name="task"
            placeholder="make a todo"
            className="haley"
          />
        </Form>
        <div
          className="list-div"
          style={{overflow: 'auto', maxHeight: 550, padding: 10}}>
          <Task />
        </div>
      </div>
      )}
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
