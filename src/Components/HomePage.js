import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Button, Header, Image, Modal, Dropdown, Form, Input } from 'semantic-ui-react'
import { Link, Redirect } from "react-router-dom";

class HomePage extends Component {

  state = {
    clicked: false,
    value: "",
    submitted: false
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.setState({
      clicked: true
    })

    if (this.state.value !== "") {
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
    .then(() => this.setState({open:false, submitted: true}))
    }
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    }, () => {
      console.log(this.state.value);
    })
  }

  close = () => this.setState({ open: false })
  open = () => this.setState({ open: true })
  triggerModal = () => this.setState({
    open: !this.state.open
  })

  move = () => {
    this.setState({
      submitted: true
    })
  }


render() {

  if (this.state.submitted === true || this.state.clicked === true) {
    return <Redirect to='/user/lists' />
  }

  return(
    <div>
      <img src={"/Artboard 1.jpg"} alt="something" className="mindful-img"/>
      <img src={"/Untitled-8.jpg"} alt="something" onClick={this.move} className="get-started-img"/>

      {/*<Modal  className="create-list-modal" open={this.state.open} onClose={this.close} trigger={<img src={"/Untitled-8.jpg"} alt="something" onClick={this.triggerModal} className="get-started-img"/>}>
        <Modal.Header>Create a list</Modal.Header>
          <Modal.Content>
              <Form.Input type="text" onChange={this.handleChange} placeholder="ex: todo, gratitude, grocery" />
              <Modal.Actions>
                <Button type="submit" value="Submit" onClick={this.handleSubmit}>Submit</Button>
              </Modal.Actions>
          </Modal.Content>
      </Modal>*/}

    {/* <Modal trigger={<Button>Find a List</Button>}>
    <Modal.Header>Find a list</Modal.Header>
    <Modal.Content>
      <form type="submit" >
        <Dropdown placeholder='Type of List' fluid selection options={listOptions} onChange={this.change}/>
        <Link to="/user/lists"><Button>Submit</Button></Link>
      </form>
    </Modal.Content>
  </Modal>*/}
    </div>
  )
}
}

const mapStateToProps = (state) => {
  return {
    lists: state.lists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addList: (list) => {
      dispatch({
        type: "ADD_LIST",
        payload: list
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
