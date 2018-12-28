import React, { Component } from 'react'
import {connect} from 'react-redux'
import './CSS/task.scss'

class Task extends Component {

  componentWillReceiveProps() {
    console.log();
  }

  state = {
    done: [],
    clicked: false,
    hovered: null,
    currentTasks: []
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

  handleClick = (event) => {
    const id = parseInt(event.target.parentElement.id)

    const task = this.props.tasks.find(task => task.id === id)

    let data = {
      done: true
    }

    if (task.done === true){
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
      if(this.props.tasks.every(task => task.done === true)) {
        this.props.isListDone(true)
        this.handleDone()
      } else {
        this.props.isListDone(false)
        this.handleDone()
      }

    const userData = {
      tasks_completed: this.props.currentUser.tasks_completed + 1
    }

    const userID = this.props.currentUser.id

    this.props.tasksDone(this.props.currentUser.tasks_completed + 1)

    fetch(`http://localhost:3000/api/v1/users/${userID}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(resp => resp.json())
    .then(console.log)
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

      const userData = {
        lists_completed: this.props.currentUser.lists_completed + 1
      }

      this.props.listsDone(this.props.currentUser.lists_completed + 1)

      const userID = this.props.currentUser.id

      fetch(`http://localhost:3000/api/v1/users/${userID}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      }).then(resp => resp.json())
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
    return(
      <div>
        {(this.props.tasks && this.props.tasks.length > 0 ?
          this.props.tasks.sort(function(a, b){return b.id - a.id}).map(task =>
          {return (
            <div className="taskdiv" key={task.id} id={task.id}>
              <ul className="fa-ul">
                <li id={task.id}>{(task.done ? <i class="fa fa-check-circle-o" aria-hidden="true" onClick={this.handleClick} id={task.id}></i> : <i class="fa fa-circle-thin" aria-hidden="true" onClick={this.handleClick} id={task.id}></i>)}<span>{task.description}</span><i onClick={this.handleDelete} class="fa fa-times"></i></li>
              </ul>

            </div>
          )
          })
          : null
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
    },
    listsDone: (num) => {
      dispatch({
        type: "LISTS_DONE",
        payload: num
      })
    },
    tasksDone: (num) => {
      dispatch({
        type: "TASKS_DONE",
        payload: num
      })
    }
  }
}

const mapStateToProps = (state) => {
  return {
    lists: state.lists,
    tasks: state.tasks,
    currentList: state.currentList,
    doneList: state.isListDone,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)
