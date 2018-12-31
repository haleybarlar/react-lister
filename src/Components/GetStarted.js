import React, { Component } from 'react'
import ListContainer from './ListContainer.js'
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";
import './CSS/getstarted.scss'
import Modali from './Modal.js'


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
    lists: [],
    dropdown: false,
    openModal: false
  }

  // handleChange = (event) => {
  //   this.setState({
  //     value: event.target.value
  //   })
  // }

  handleChange = (event) => {
    console.log(event.currentTarget.value);

    if(event.currentTarget.value !== "") {
    this.setState({
      clicked: true
    })
    this.props.setCurrentList(parseInt(event.currentTarget.value))
    }
  }

  changeValue = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.state.value !== "") {
    this.setState({
      submitted: true,
      openModal: false
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

  goBack = () => {
    this.setState({
      clicked: false
    })
  }

  triggerDropdown = (event) => {
    if (event.target.tagName !== "P") {
      this.setState ({
        dropdown: false
      })
    } else {
      this.setState({
        dropdown: !this.state.dropdown
      })
    }
  }

  openModal = () => {
    this.setState({
      openModal: !this.state.openModal
    })
  }

  render() {

    if (this.state.submitted === true || this.state.clicked === true) {
      return <Redirect to='/user/lists' />
    }

    const lists = (!this.state.lists || this.state.lists.length === 0 ? null : this.state.lists.map(list =>
      ({key: list.id, id: list.id, value: list.id, text: list.kind})
    ))

    return(

    <div>
      <Modali modal={this.state.openModal} handleSubmit={this.handleSubmit} handleChange={this.changeValue}/>
      {(this.state.clicked === false && this.state.submitted === false ?
      <div className="whole">
      <div className="get-started" onClick={this.triggerDropdown}>
        <div className='home-page'>
          <h1>hello, {this.props.currentUser.name}.</h1>
            <h1 id="create-new" onClick={this.openModal}>create a new list <i id="add" class="material-icons">add</i></h1>
            <h3>or</h3>
        </div>
        </div>
        <div>
          {(this.state.dropdown === true ?
            <div className="vertical-menu">
              <p onClick={this.triggerDropdown} id="title">choose your list <i onClick={this.triggerDropdown} id="not" class="material-icons">expand_more</i></p>
              {(lists ? lists.map(list => <p value={list.id} id={list.id} onClick={this.handleChange}>{list.text}</p>) : <p>you don't have any yet</p>)}
            </div>
            : <div id="not-clicked"><p id="not" onClick={this.triggerDropdown}>choose your list <i onClick={this.triggerDropdown} id="not" class="material-icons">expand_more</i></p></div>
        )}
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

// <Modal open={this.state.open} onClose={this.close} trigger={
//   <Button circular icon='add' onClick={this.triggerModal}></Button>
// } closeIcon>
//   <Modal.Header id="modal-header">Create a list</Modal.Header>
//   <Modal.Content>
//     <form onSubmit={this.handleSubmit}>
//     <input id="input" className="get-started-input" type="text" onChange={this.changeValue} placeholder="ex: todo, gratitude, grocery"/>
//     <Modal.Actions>
//       <button type="submit" value="Submit" id="new-list-button">Submit</button>
//     </Modal.Actions>
//   </form>
//   </Modal.Content>
// </Modal>
