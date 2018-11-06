import React, { Component } from 'react'
import Task from './Task.js'
import {connect} from 'react-redux'
import { Pagination, Button } from 'semantic-ui-react'

class List extends Component {

  state = {
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


  render() {

    return(
              <div>
                <h1>My {this.props.currentList.kind} list</h1>
                <Task />
                <form type="submit" onSubmit={this.handleSubmit}>
                  <input type="text" name="task" placeholder="make a todo"></input>
                  <button type="submit">Submit</button>
                </form>
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
