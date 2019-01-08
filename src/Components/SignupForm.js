import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import {connect} from 'react-redux'
import './CSS/signup.scss'

class SignupForm extends Component {

  state = {
    error: false,
    password_error: false,
    submitted: false,
    fields: {
      username: "",
      password: "",
      email: "",
      name: "",
      confirm: ""
    },
    clicked: false,
    login: false
  }

  handleChange = (e) => {
    const newFields = {
      ...this.state.fields,
      [e.target.name]: e.target.value
    }
    this.setState({ fields: newFields })
  }

  handleSubmit = event => {

    event.preventDefault()

    if (this.state.fields.password === this.state.fields.confirm) {

      fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          user: {
            "username": this.state.fields.username,
             "password": this.state.fields.password,
             "email": this.state.fields.email,
             "name": this.state.fields.name,
             "lists_completed": 0,
             "tasks_completed": 0,
             "dates_done": 0
          }
        })
      })
      .then(resp => resp.json())
      .then(resp => {
        if (resp.error) {
          this.setState({
            error: true,
            fields: {
              password: "",
              confirm: ""
            }
          })

        } else {
          this.login(this.state.fields.username, this.state.fields.password)
          this.setState({
            submitted: true
          })
        }
      })
    } else {
      this.setState({
        error: true,
        fields: {
          password: "",
          confirm: ""
        }
      })
    }
  }

  login = (username, password) => {
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(resp => resp.json())
    .then(resp => {
      if (resp.error) {
        this.setState({ error: true})
      } else {
        this.handleLogin(resp)
      }
    })
  }

  handleLogin = (resp) => {
    localStorage.setItem("jwt", resp.jwt);
    this.setUser(resp.jwt)
    // this.props.history.push("/user/home")
  }

  setUser = (jwt) => {
    fetch("http://localhost:3000/api/v1/profile", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${jwt}`
      }
    })
    .then(resp => resp.json())
    .then(resp => {
        this.props.setCurrentUser(resp)
    })
  }

  handleClick = (e) => {
    this.setState({
      login: true
    })
  }


  render() {

    if (this.state.submitted && this.state.error === false) {
      return <Redirect to='/user/home' />
    }

    return (
      <div className="signup">
        <form onSubmit={this.handleSubmit} error>
          <div className="password">
            <label>FIRST NAME</label>
            <input
              name="name"
              placeholder="first name"
              onChange={this.handleChange}
              value={this.state.fields.name}
              className="login-input"
              autoComplete="off"/>
          </div>
          <div className="password">
            <label>USERNAME</label>
            <input
              name="username"
              placeholder="username"
              onChange={this.handleChange}
              alue={this.state.fields.username}
              className="login-input"
              autoComplete="off"/>
          </div>
          <div className="password">
            <label>EMAIL</label>
            <input
              type="email"
              name="email"
              placeholder="email"
              onChange={this.handleChange}
              value={this.state.fields.email}
              className="login-input"
              autoComplete="off"/>
          </div>
          {this.state.error ?
            <h1>
              Uh oh! Make sure your passwords match!
            </h1>
          :
            null
          }
          <div className="password">
            <label>PASSWORD</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={this.handleChange}
              value={this.state.fields.password}
              className="login-input"
              autoComplete="off"/>
          </div>
          <div className="password">
            <label>CONFIRM PASSWORD</label>
            <input
              type="password"
              name="confirm"
              placeholder="confirm your password"
              onChange={this.handleChange}
              value={this.state.fields.confirm}
              className="login-input"
              autoComplete="off"/>
          </div>
          <button
            type="submit"
            className="login-button">
            Submit
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (info) => {
      dispatch({
        type: "SEND_USER",
        payload: info
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(SignupForm)
