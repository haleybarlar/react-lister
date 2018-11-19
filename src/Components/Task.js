import React, { Component } from 'react'
import {connect} from 'react-redux'

const style = {
  cursor: "pointer",
  // position: "absolute",
  width: "26px",
  height: "25px",
  // top: "0",
  // left: "0",
  background: "grey",
  border:"1px solid #ddd"
}

class Task extends Component {

  componentDidUpdate(prevProps){
    if (this.props.currentList !== prevProps.currentList) {
    this.forceUpdate()
    }
  }

  state = {
    done: [],
    clicked: false,
    hovered: null,
    currentTask: null
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
      } else {
        this.props.isListDone(false)
        this.handleDone()
      }

    const userData = {
      tasks_completed: this.props.currentUser.tasks_completed + 1
    }

    fetch(`http://localhost:3000/api/v1/users/1`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }).then(resp => resp.json())
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

      fetch(`http://localhost:3000/api/v1/users/1`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      }).then(resp => resp.json())
      .then(console.log)

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

  mouseOver = (event) => {
    this.setState({
      hovered: true,
      id: event.target.id
    })
  }

  mouseOut = () => {
    this.setState({
      hovered: false
    })
  }


render() {

  const sortedTasks = this.props.currentList.tasks.sort(function(a,b) {return b.id - a.id})


    return(
      <div className="haley">
        {(sortedTasks.length === 0 ? null :
          (sortedTasks === undefined ? null : sortedTasks.map(task =>
            {return (
              <div className="task-div" key={task.id} id={task.id}>
                { /*<div class="checkboxFive" key={task.id} id={task.id}> */}
                  <input style={style} type="checkbox" value="1" id="checkboxFiveInput" name="" onClick={this.handleClick} checked={task.done} />
                { /*  <label for="checkboxFiveInput" onClick={this.handleClick}></label> */}
                { /*</div> */}
                {/*<input type="checkbox" onClick={this.handleClick} checked={task.done} />*/}
                   <span>{task.description}</span>
                <i onClick={this.handleDelete} className="trash alternate outline icon"></i>

              </div>
            )}
          ))
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
    doneList: state.isListDone,
    currentUser: state.currentUser
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Task)
