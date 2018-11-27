import React, { Component } from 'react'
import { Segment, Button, Modal, Menu } from 'semantic-ui-react'
import { Redirect } from "react-router-dom";
import LoginForm from './LoginForm.js'
import SignupForm from './SignupForm.js'

class Welcome extends Component {

  state = {
    login: false,
    signup: false,
    open: false
  }

  handleClick = (e) => {

    if (e.target.innerText === "log in") {
      this.setState({
        login: true
      })
    } else if (e.target.innerText === "sign up") {
      this.setState({
        signup: true
      })
    }
  }

  toggle = (e) => {
    if (e.target.value === "signup") {
      this.setState({
        signup: true,
        login: false
      })
    } else if (e.target.value === "login") {
      this.setState({
        login: true,
        signup: false
      })
    }
  }

  close = () => this.setState({ open: false })
  open = () => this.setState({ open: true })
  triggerModal = (e) => {
    if (e.target.value === "login") {
      this.setState({
        open: !this.state.open,
        login: true,
        signup: false
      })
    } else if (e.target.value === "signup") {
      this.setState({
        open: !this.state.open,
        signup: true,
        login: false
      })
    }
  }

  render() {

    const square = { width: 300, height: 300 }

    return (
      <div>
        <h1 className="mindful-h1">mindful todo</h1>
        <Segment circular className="sign-up-circle" style={square}>
          <Modal open={this.state.open} onClose={this.close} trigger={
            <div>
              <Button value="login" className="welcome-segments" onClick={this.triggerModal}>log in</Button>
              <Button value="signup" className="welcome-segments" onClick={this.triggerModal}>sign up</Button>
            </div>
          } closeIcon>
            <Modal.Content>
              {this.state.login ? <LoginForm signup={this.toggle}/> : null}
              {this.state.signup ? <SignupForm login={this.toggle}/> : null}
            </Modal.Content>
          </Modal>
        </Segment>
      </div>
    )
  }
}

export default Welcome
