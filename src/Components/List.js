import React, { Component } from 'react'
import Task from './Task.js'
import {connect} from 'react-redux'
import { withRouter } from "react-router-dom";
import './CSS/list.scss'

document.addEventListener("touchstart", function(){}, true)

class List extends Component {

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.currentList!==prevState.currentList){
      return { currentList: nextProps.currentList };
    } else return null;
  }

  state = {
    allDone: false,
    deleted: false,
    clicked: false,
    empty: false
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const data = {
      list_id: this.props.currentList.id,
      priority: "high",
      description: event.target.task.value,
      done: false
    }

    fetch('http://localhost:3000/api/v1/tasks', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json())
    .then(resp => {
      this.props.sendTasks(resp)
    })

    event.target.task.value = ""
  }

  handleDelete = (event) => {

    this.setState({
      deleted: true
    })

    const id = event.target.parentElement.id

    fetch(`http://localhost:3000/api/v1/lists/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if(this.props.lists.length > 1) {
      this.props.removeList(id)
    } else {
      this.setState({
        empty: true
      })
    }
  }

  render() {
    return(
      <div class='list'>
        {(this.props.tasks && this.props.tasks.length > 0 ?
          <div id={this.props.currentList.id} className="entire-list" >
            <button
              onClick={this.handleDelete}
              id="delete-list-button"><i class="material-icons">close</i></button>
            <h1 id="title">{this.props.currentList.kind}</h1>
            <form onSubmit={this.handleSubmit} >
              <input
                type="text"
                name="task"
                placeholder="What's on your mind?"
                className="haley"
                autoComplete="off"
              />
          </form>
            <div
              className="listdiv"
              style={{overflow: 'auto', maxHeight: 550}}>
              <Task />
            </div>
          </div>
          :
          <div id={this.props.currentList.id} className="entire-list" >

                  <button
                    onClick={this.handleDelete}
                    id="delete-list-button"><i class="material-icons">close</i></button>

              <form type="submit" onSubmit={this.handleSubmit} >
              <input
                type="text"
                name="task"
                placeholder="What's on your mind?"
                autoComplete="off"
                className="haley"/>
            </form>
            <div
              className="listdiv"
              style={{overflow: 'auto', maxHeight: 550}}>
            </div>
          </div>
        )}

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    currentList: state.currentList,
    doneList: state.isListDone,
    lists: state.lists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentList: (id) => {
      dispatch({
        type: "SET_LIST",
        payload: id
      })
    },
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
    sendUser: (user) => {
      dispatch({
        type: "SEND_USER",
        payload: user
      })
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List))


// {(this.props.tasks && this.props.tasks.length === 0 ?
//   <div id={this.props.currentList.id} className="entire-list" >
//     <h1 id="list-name-h1">{this.props.currentList.kind}</h1>
//       <Popup
//         trigger={
//           <Button
//             inline field circular icon='x'
//             onClick={this.handleDelete}
//             id="delete-list-button"/>
//         }
//         content="Delete this list"/>
//     <Form type="submit" onSubmit={this.handleSubmit} >
//       <Input
//         type="text"
//         name="task"
//         placeholder="make a todo"
//         className="haley"/>
//     </Form>
//   </div>
//   :
//   <div id={this.props.currentList.id} className="entire-list" >
//     {(this.props.doneList ? <h1
//        id="list-name-h1">{this.props.currentList.kind} <Icon name="checkmark"></Icon></h1> :
//        <h1 id="list-name-h1">{this.props.currentList.kind} </h1>)}
//     <Popup
//       trigger={
//         <Button
//           inline field circular icon='x'
//           onClick={this.handleDelete}
//           id="delete-list-button"/>
//       }
//       content="Delete this list"/>
//     <Form type="submit" onSubmit={this.handleSubmit} >
//       <Input
//         type="text"
//         name="task"
//         placeholder="make a todo"
//         className="haley"
//       />
//     </Form>
//     <div
//       className="list-div"
//       style={{overflow: 'auto', maxHeight: 550, padding: 10}}>
//       <Task />
//     </div>
//   </div>
// )}
