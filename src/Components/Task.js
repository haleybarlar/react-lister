import React, { Component } from 'react'
import {connect} from 'react-redux'

class Task extends Component {

  state = {
    clicked: false
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

    return(
      <div>
        <ul>
          {(this.props.tasks === undefined ? null : this.props.tasks.map(task => <div id={task.id} onClick={this.edit}><li>{task.description}</li><button onClick={this.handleDelete}>Delete</button></div>))}
          
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
    lists: state.lists,
    tasks: state.tasks,
    currentUser: state.currentUser,
    currentList: state.currentList
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Task)
