import React, { Component } from 'react'
import './CSS/welcome.scss'

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

    return (
      <div className="welcome">
        <div className="about-me">
          <p>Hello. Welcome to mindful todo.</p>
          <p>This is a space to store your thoughts.</p>
          <p>Lose the clutter and clear your mind.</p>
        </div>
      </div>
    )
  }
}

export default Welcome
