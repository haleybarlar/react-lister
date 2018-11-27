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

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.currentList!==prevState.currentList){
      return { currentTasks: nextProps.tasks};
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.currentList!==this.props.currentList){
      //Perform some operation here
      this.setState({currentTasks: this.props.tasks});
    }
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

    fetch(`http://localhost:3000/api/v1/users/${userID}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }).then(resp => resp.json())
    .then( )
    })

  }

  handleDone = () => {

    const today = new Date()

    const id = this.props.currentUser.id

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

      fetch(`http://localhost:3000/api/v1/users/${id}`, {
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

  console.log(this.state.currentTasks);

    return(
      <div>
        {(this.props.tasks && this.props.tasks.length > 0 ?
          this.props.tasks.sort(function(a, b){return b.id - a.id}).map(task =>
          {return (
            <div className="task-div" key={task.id} id={task.id}>
                <input style={style} type="checkbox" value="1" id="checkboxFiveInput" name="" onClick={this.handleClick} checked={task.done} />
                 <span>{task.description}</span>
              <i onClick={this.handleDelete} className="trash alternate outline icon"></i>
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

// <div className="haley">
//   {(this.props.currentList.tasks !== undefined && this.props.currentList.tasks.length > 0 ?
//     this.props.currentList.tasks.sort(function(a,b) {return b.id - a.id}).map(task =>
//       {return (
        // <div className="task-div" key={task.id} id={task.id}>
        //     <input style={style} type="checkbox" value="1" id="checkboxFiveInput" name="" onClick={this.handleClick} checked={task.done} />
        //      <span>{task.description}</span>
        //   <i onClick={this.handleDelete} className="trash alternate outline icon"></i>
        // </div>
//       )}
//     )
//     : null
//   )}
// </div>
