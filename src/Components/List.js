import React, { Component } from 'react'
import Task from './Task.js'
import {connect} from 'react-redux'

class List extends Component {

  state = {
    clicked: false
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const data = {
      list_id: this.props.list.id,
      priority: "high",
      description: event.target.task.value
    }

    console.log('data', data)

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

  setCurrentList = (id) => {
    this.props.setCurrentList(id)
  }

  handleClick = (event) => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  render() {

    return(

      <div>


        <button onClick={(event) => {this.setCurrentList( this.props.list.id); this.handleClick(event);}}>
          {this.props.list.kind}
        </button>

        {(this.props.list.id === this.props.currentList.id && this.state.clicked ?
          <div>
            <form type="submit" onSubmit={this.handleSubmit}>
              <input type="text" name="task" placeholder="make a todo"></input>
              <button type="submit">Submit</button>
            </form>
            <Task />
          </div>
        : null)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    currentList: state.currentList
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
    setCurrentList: (id) => {
      dispatch({
        type: "SET_LIST",
        payload: id
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
