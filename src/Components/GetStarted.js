import React, { Component } from 'react'
import ListContainer from './ListContainer.js'
import {connect} from 'react-redux'
import { Modal, Dropdown, Button, Form } from 'semantic-ui-react'
import { Redirect } from "react-router-dom";

class GetStarted extends Component {

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.lists!==prevState.lists){
      return { lists: nextProps.lists};
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.currentList!==this.props.currentList){
      this.setState({lists: this.props.lists})
    }
  }

  state = {
    value: "",
    open: false,
    clicked: false,
    submitted: false,
    lists: []
  }

  // handleChange = (event) => {
  //   this.setState({
  //     value: event.target.value
  //   })
  // }

  handleChange = (event) => {
    console.log(event.currentTarget.id);

    if(event.currentTarget.id !== "") {
    this.setState({
      clicked: true
    })
    this.props.setCurrentList(parseInt(event.currentTarget.id))
    }
  }

  changeValue = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.setState({
      submitted: true
    })

    const data = {
      user_id: this.props.currentUser.id,
      kind: this.state.value,
      done: false,
      time_completed: null
    }

    fetch('http://localhost:3000/api/v1/lists', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json())
    .then(resp => {this.props.addList(resp); this.props.setCurrentList(resp.id);})
  }

  close = () => this.setState({ open: false })
  open = () => this.setState({ open: true })
  triggerModal = () => this.setState({
    open: !this.state.open
  })

  goBack = () => {
    this.setState({
      clicked: false
    })
  }

  render() {

    // let list = this.props.lists.find(list => list.kind === this.state.activeItem)
    // if(this.props.currentList === undefined) {
    //   return null
    // } else {
    //   this.props.setCurrentList(this.props.currentList.id)
    // }

    if (this.state.submitted === true || this.state.clicked === true) {
      return <Redirect to='/user/lists' />
    }

    const lists = (!this.state.lists || this.state.lists.length === 0 ? null : this.state.lists.map(list =>
      ({key: list.id, id: list.id, value: list.id, text: list.kind})
    ))

    return(

    <div>
      {(this.state.clicked === false && this.state.submitted === false ?
      <div className="list-container-div">
        <div className="vadim">
          <h1 className="change-font">select your list</h1>
          <Dropdown placeholder='Select List' search selection options={lists} onChange={this.handleChange}/>
          <h3 className="change-font">or</h3>
          <h1 className="change-font">create a new list</h1>
          <Modal open={this.state.open} onClose={this.close} trigger={
            <Button circular icon='add' onClick={this.triggerModal}></Button>
          } closeIcon>
            <Modal.Header>Create a list</Modal.Header>
            <Modal.Content>
              <Form onSubmit={this.handleSubmit}>
              <Form.Input id="input" className="get-started-input" type="text" onChange={this.changeValue} placeholder="ex: todo, gratitude, grocery"/>
              <Modal.Actions>
                <Button type="submit" value="Submit">Submit</Button>
              </Modal.Actions>
              </Form>
            </Modal.Content>
          </Modal>
        </div>
        </div>
        :
        <ListContainer />
      )}
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    lists: state.lists,

    listDone: state.isListDone,
    currentUser: state.currentUser
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
    addList: (list) => {
      dispatch({
        type: "ADD_LIST",
        payload: list
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

export default connect(mapStateToProps, mapDispatchToProps)(GetStarted)

// {(this.props.currentList !== undefined && this.props.currentList.kind === "todo" ? <TodoList /> : <List/>)}
