import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Pagination, Button } from 'semantic-ui-react'

class Task extends Component {

  // componentDidUpdate(prevProps){
  //   if (this.props.currentList !== prevProps.currentList) {
  //   this.forceUpdate()
  //   }
  // }

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
    let data = {
      done: true
    }
    if (task.done){
      data = {
        done: false
      }
    }

    fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(task => {
      this.props.editTask(task.id)
      if(this.props.currentList.tasks.every(task => task.done === true)) {
        this.props.isListDone(true)
        this.handleDone()
      }
      else {
        this.props.isListDone(false)
        this.handleDone()
      }
    })

  }

  handleDone = () => {

    const today = new Date()



    const id = this.props.currentList.id

    if (this.props.doneList === true) {

      const data = {
        done: true,
        time_completed: today
      }

      fetch(`http://localhost:3000/api/v1/lists/${id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(resp => resp.json())
      .then(list => this.props.editList(list))
    } else {

      const data = {
        done: false
      }

      fetch(`http://localhost:3000/api/v1/lists/${id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(resp => resp.json())
      .then(list => this.props.editList(list))
    }
  }

render() {

  console.log(this.props.tasks);

  const sortedTasks = this.props.currentList.tasks.sort(function(a,b) {return b.id - a.id})



    return(
      <div>
        {(sortedTasks.length === 0 ? <h1>Add some tasks:</h1> :
          <ul>
            {(sortedTasks === undefined ? null : sortedTasks.map(task =>
              {return (
                <div key={task.id} id={task.id} onClick={this.edit}>
                  <li>
                    <input type="checkbox" onClick={this.handleClick} checked={task.done} />
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
    },
    editList: (list) => {
      dispatch({
        type: "EDIT_LIST",
        payload: list
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
