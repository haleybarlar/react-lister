import React, { Component } from 'react'
import List from './List.js'
import {connect} from 'react-redux'
import { Menu, Segment, Modal, Button, Grid, Form, Progress } from 'semantic-ui-react'

class ListContainer extends Component {

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.currentList!==prevState.currentList && nextProps.currentList){
      return { activeItem: nextProps.currentList.kind};
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.currentList!==this.props.currentList && this.props.currentList){
      //Perform some operation here
      this.setState({activeItem: this.props.currentList.kind})
    }
  }

  state = {
    open: false,
    activeItem: "",
    value: "",
    currentList: {}
   }

  handleItemClick = (e, { name }) => {
    this.props.setCurrentList(parseInt(e.target.id))
    this.setState({
      activeItem: name
    })
  }

  close = () => this.setState({ open: false })
  open = () => this.setState({ open: true })
  triggerModal = () => this.setState({
    open: !this.state.open
  })

  changeValue = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  goBack = () => {
    this.props.goBack(this.state.activeItem)
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.state.value !== "") {
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
    .then(() => this.setState({open:false}))
    } else {
      this.setState({
        open: false
      })
    }
  }

  render() {

    const { activeItem } = this.state

    return(
      <div>
        <Grid>
          <Grid.Column width={4}>
            <Menu fluid vertical tabular>
              { (this.props.currentList ?
                (
                  this.props.lists === undefined || this.props.lists.length === 0 ? null :
                  this.props.lists.map(list =>
                    <Menu.Item
                      key={list.id}
                      id={list.id}
                      name={list.kind}
                      active={activeItem === list.kind}
                      onClick={this.handleItemClick} >
                    </Menu.Item>
                  )
                )
                : null)
              }
              <Modal open={this.state.open} onClose={this.close} trigger={
                <Menu.Item circular icon='add' onClick={this.triggerModal}></Menu.Item>
              } closeIcon>
                <Modal.Header>Create a list</Modal.Header>
                <Modal.Content>
                  <Form onSubmit={this.handleSubmit}>
                    <label>type of list</label>
                    <Form.Input id="container" type="text" onChange={this.changeValue} placeholder="ex: todo, gratitude, grocery"/>
                    <Modal.Actions>
                      <Button type="submit">Submit</Button>
                    </Modal.Actions>
                  </Form>
                </Modal.Content>
              </Modal>
            </Menu>
          </Grid.Column>

          <Grid.Column stretched width={12}>
            <Segment >
              {(this.props.currentList ? <List/> : <h1>waiting</h1>)}
            </Segment>
          </Grid.Column>
        </Grid>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    lists: state.lists,
    currentList: state.currentList,
    doneList: state.isListDone,
    listDone: state.isListDone,
    currentUser: state.currentUser,
    tasks: state.tasks
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

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
