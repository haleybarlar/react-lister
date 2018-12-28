import React, { Component } from 'react'
import List from './List.js'
import {connect} from 'react-redux'
import './CSS/listcontainer.scss'
import Modali from './Modal.js'

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

  componentWillReceiveProps(nextProps){
    if (nextProps.currentList !== this.props.currentList) {
      this.setState({
        activeItem: nextProps.currentList
      })
    }
  }

  state = {
    open: false,
    activeItem: "",
    value: "",
    currentList: {},
    openModal: false
   }

  handleItemClick = (e) => {
    let current = document.getElementsByClassName("active")
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "")
    }
    e.target.className += " active"
    this.props.setCurrentList(parseInt(e.target.id))
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

  openModal = () => {
    this.setState({
      openModal: !this.state.openModal
    })
  }

  render() {
    return(
      <div className="list-container">
        <Modali modal={this.state.openModal} handleSubmit={this.handleSubmit} handleChange={this.changeValue}/>
        <div>
          {(this.props.currentList ? <List/> : <p className="add-list" onClick={this.openModal}>add a list <i class="fa fa-plus-square-o" aria-hidden="true"></i></p>)}
          <div class="scrollmenu">
            <p className="add-list" onClick={this.openModal}><i class="material-icons">library_add</i></p>
            { (this.props.currentList ?
              (
                this.props.lists === undefined || this.props.lists.length === 0 ? null :
                this.props.lists.map(list =>
                  <p
                    className="list-item"
                    key={list.id}
                    id={list.id}
                    name={list.kind}
                    onClick={this.handleItemClick}
                    >{list.kind}
                  </p>
                )
              )
              : null)
            }
          </div>
        </div>
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
