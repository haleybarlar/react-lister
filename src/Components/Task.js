import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Pagination, Button } from 'semantic-ui-react'

class Task extends Component {

  state = {
    done: [],
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

  handleClick = (event) => {

    // debugger

    const id = parseInt(event.target.parentElement.parentElement.id)

    const task = this.props.tasks.find(task => task.id === id)

    if (task.done === false) {

      const data = {
        done: true
      }

      fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      this.props.editTask(id)
    } else {

      const data = {
        done: false
      }

      fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      this.props.editTask(id)
    }
  }

render() {

  const sortedTasks = this.props.currentList.tasks.sort(function(a,b) {return b.id - a.id})

  if(this.props.currentList.tasks.every(task => task.done === true)) {
    this.props.isListDone(true)
  } else {
    this.props.isListDone(false)
  }

    return(
      <div>
        {(sortedTasks.length === 0 ? <h1>Add some tasks:</h1> :
          <ul>
            {(sortedTasks === undefined ? null : sortedTasks.map(task =>
              {return (task.done === true ?
                <div id={task.id} onClick={this.edit}>
                  <li>
                    <input type="checkbox" onClick={this.handleClick} checked={task.done} />
                    {task.description}
                    <i onClick={this.handleDelete} class="trash alternate outline icon"></i>
                  </li>
                </div>
                :
                <div id={task.id} onClick={this.edit}>
                  <li>
                    <input type="checkbox" onClick={this.handleClick} />
                    {task.description}
                    <i onClick={this.handleDelete} class="trash alternate outline icon"></i>
                  </li>
                </div>

              )}
            ))}
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
    },
    editTask: (id) => {
      dispatch({
        type: "EDIT_TASK",
        payload: id
      })
    },
    isListDone: (boolean) => {
      dispatch({
        type: "LIST_DONE",
        payload: boolean
      })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    lists: state.lists,
    tasks: state.tasks,
    currentList: state.lists.find(list => list.id === state.currentListID),
    doneList: state.isListDone
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Task)
