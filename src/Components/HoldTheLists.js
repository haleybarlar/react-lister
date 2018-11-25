import React, { Component } from 'react'
import List from './List.js'
import {connect} from 'react-redux'
import { Menu, Segment, Modal, Button, Grid, Form } from 'semantic-ui-react'

class HoldTheLists extends Component {

  componentDidUpdate(prevProps){
    if(this.props.currentList !== prevProps.currentList) {
      this.forceUpdate()
    }
  }

  componentDidMount() {
    this.setState({
      activeItem: this.props.currentList.kind
    })
  }

  state = {
    open: false,
    activeItem: "",
    value: ""
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
      user_id: 1,
      kind: this.state.value,
      done: false
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
            {
              (
                this.props.lists === undefined ? null :
                this.props.lists.map(list =>

                  <Menu.Item
                    key={list.id}
                    id={list.id}
                    name={list.kind}
                    active={activeItem === list.kind}
                    onClick={this.handleItemClick} />
                )
              )
            }
            <Modal open={this.state.open} onClose={this.close} trigger={
              <Menu.Item circular icon='add' onClick={this.triggerModal}></Menu.Item>
            } closeIcon>
              <Modal.Header>Create a list</Modal.Header>
              <Modal.Content>
                <Form.Input type="text" onChange={this.changeValue} placeholder="ex: todo, gratitude, grocery"/>
                <Modal.Actions>
                  <Button type="submit" value="Submit" onClick={this.handleSubmit}>Submit</Button>
                </Modal.Actions>
              </Modal.Content>
            </Modal>
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment >
            <List />
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
    currentList: state.lists.find(list => list.id === state.currentListID),
    doneList: state.isListDone,
    listDone: state.isListDone
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

export default connect(mapStateToProps, mapDispatchToProps)(HoldTheLists)

// {(this.props.currentList !== undefined && this.props.currentList.kind === "todo" ? <TodoList /> : <List/>)}
