import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Pagination, Button } from 'semantic-ui-react'

class Task extends Component {

  state = {
    clicked: false
  }

  handleDelete = (event) => {
    const id = event.target.parentElement.parentElement.id

    fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.props.removeTask(id)
  }

render() {

  const sortedTasks = this.props.tasks.sort(function(a,b) {return b.id - a.id})


    return(
      <div>
        {(sortedTasks.length === 0 ? <h1>Add some tasks:</h1> :
          <ul>
            {(sortedTasks === undefined ? null : sortedTasks.map(task => <div id={task.id} onClick={this.edit}><li>{task.description}<i onClick={this.handleDelete} class="trash alternate outline icon"></i></li></div>))}
          </ul>
        )}
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
    currentList: state.currentList
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Task)
