import React, { Component } from 'react'
import Task from './Task.js'
import List from './List.js'
import {connect} from 'react-redux'
import { Pagination, Button, Form, Popup, Input, Dropdown, Modal, Card, Grid } from 'semantic-ui-react'
import { Link, Redirect } from "react-router-dom";

class AListOfLists extends Component {

  state = {
    allDone: false,
    deleted: false
  }


  render() {

    if(this.props.lists.length === 0) {
      return null
    } else {
      console.log(this.props.lists)
    }

    return(

      <div >

        <div className="grid-container">
          {(this.props.lists.length === 0 ? null : this.props.lists.map(list =>
            <div className="grid-item">
              <ul>
              {(list.tasks.map(task =>
                <div>
                  <li>
                  <p className="a-thing">{task.description}</p>
                  </li>
                </div>
              ))}
              </ul>
            </div>

          )

          )}
        </div>


      {/*<div id={this.props.currentList.id} className="entire-list" >
        <h1>my {this.props.currentList.kind} list</h1>
        <Button className="delete-button" onClick={this.props.goBack} inline field>Go BACK!!!</Button>
      <Popup trigger={<Button inline field circular icon='x' onClick={this.handleDelete}/>} content="Delete this list"/>
        <div className="list-div">
          <Form type="submit" onSubmit={this.handleSubmit} >
            <Input type="text" name="task" placeholder="make a todo" className="haley"/>
          </Form>
          <Task />
        </div>
      </div>*/}
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AListOfLists)

// <button onClick={(event) => {this.setCurrentList( this.props.list.id); this.handleClick(event);}}>
//   {this.props.list.kind}
// </button>
