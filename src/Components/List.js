import React, { Component } from 'react'
import Task from './Task.js'
import {connect} from 'react-redux'

class List extends Component {

  handleSubmit = (event) => {
    event.preventDefault()

    const data = {
      list_id: 1,
      priority: "high",
      description: event.target.task.value
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
        <form type="submit" onSubmit={this.handleSubmit}>
          <input type="text" name="task" placeholder="make a todo"></input>
          <button type="submit">Submit</button>
        </form>
        <Task />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendTasks: (task) => {
      dispatch({
        type: "SEND_TASKS",
        payload: task
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
