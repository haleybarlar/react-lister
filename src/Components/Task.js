import React, { Component } from 'react'
import {connect} from 'react-redux'

class Task extends Component {

  componentDidUpdate() {
      fetch('http://localhost:3000/api/v1/users/1')
      .then(resp => resp.json())
      .then(resp => this.props.sendUsers(resp))
  }

  handleDelete = (event) => {

    const id = event.target.parentElement.id

    fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.props.removeTask(id)
  }

render() {

  const sortedIds = (this.props.currentUser.tasks ? this.props.currentUser.tasks.sort(function(a, b) {return b.id - a.id}) : null)

    return(
      <div>
        <ul>
          {sortedIds && sortedIds.map(task => <li key={task.id} id={task.id}>{task.description}<button onClick={this.handleDelete} >Delete</button></li>)}
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendUsers: (users) => {
      dispatch({
        type: "SEND_USERS",
        payload: users
      })
    },
    removeTask: (task_id) => {
      dispatch({
        type: "REMOVE_TASK",
        payload: task_id
      })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)
