import Modal from 'react-modal';
import React, { Component } from 'react'
import './CSS/modali.scss'

class Modali extends Component {
  state = {
    modalIsOpen: ""
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.modal !== this.props.modal) {
      this.setState({
        modalIsOpen: nextProps.modal
      })
    }
  }

  openModal = () => {
    this.setState({modalIsOpen: true})
  }

  closeModal = () => {
    this.setState({modalIsOpen: false})
  }

  render() {
    console.log(this.props.modal)
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          className="Modal"
        >
        <i onClick={this.closeModal} class="material-icons">close</i>
          <form className="modal-form" onSubmit={this.props.handleSubmit}>
            <p>create a new list</p>
            <input id="container" type="text" onChange={this.props.handleChange} placeholder="ex: ideas, gratitude, todo" autoComplete="off"/><br />
            <button type="submit" id="new-list-button">submit</button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default Modali
