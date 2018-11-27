import React, { Component } from 'react'
import Task from './Task.js'
import {connect} from 'react-redux'
import { Pagination, Button } from 'semantic-ui-react'

class TodoList extends Component {

  state = {
    oneBigThing: false,
    oneBigThingValue: "",
    task: {}
  }

  // componentDidMount(){
  //   if (this.props.currentList !== undefined || this.props.currentList.length !== 0) {
  //     this.setState({
  //       oneBigThing: true
  //     })
  //   } else {
  //     this.setState({
  //       oneBigThing: false
  //     })
  //   }
  // }

  handleClick = (event) => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  handleEnter = (event) => {
    event.preventDefault()

    // const task = this.props.currentList.tasks.find(task => task.description === this.state.oneBigThingValue)
    //
    //  (task);

    this.setState({
      oneBigThing: !this.state.oneBigThing
    })

    const data = {
      list_id: this.props.currentList.id,
      priority: "one",
      description: this.state.oneBigThingValue
    }

    fetch('http://localhost:3000/api/v1/tasks', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json())
    .then(resp => this.setState({
      task: resp
    }))
    this.props.sendTasks(this.state.task)
  }

  getValue = (event) => {
    this.setState({
      oneBigThingValue: event.target.value
    }, () => {
       (this.state.oneBigThingValue);
    })
  }

  editTask = (event) => {
    this.setState({
      oneBigThing: false
    })

    const id = this.state.task.id

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
            <h1>My {this.props.currentList.kind} list</h1>
              <div>
                {(this.state.oneBigThing === false ?
                  <form onSubmit={event => this.handleEnter(event)}>
                    <label>One big thing:</label><br></br>
                    <input type="text" placeholder="one big thing to do" onChange={this.getValue} value={this.state.oneBigThingValue}></input><br></br>
                  </form>
                  :
                  <div>
                    <p>One big thing:</p>
                    <p onClick={this.editTask}>{this.state.task.description}</p>
                  </div>
                )}
                <Task />

                <label>Three medium things:</label><br></br>
                <input type="text" placeholder="something"></input><br></br>
                <input type="text" placeholder="something"></input><br></br>
                <input type="text" placeholder="something"></input><br></br>

                <label>Five Small things:</label><br></br>
                <input type="text" placeholder="small"></input><br></br>
                <input type="text" placeholder="small"></input><br></br>
                <input type="text" placeholder="small"></input><br></br>
                <input type="text" placeholder="small"></input><br></br>
                <input type="text" placeholder="small"></input><br></br>
              </div>
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
    },
    removeTask: (id) => {
      dispatch({
        type: "REMOVE_TASK",
        payload: id
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
