import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { Redirect } from "react-router-dom";
import {connect} from 'react-redux'
import { Button, Input, Message } from 'semantic-ui-react'

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
      <div>
        <Form onSubmit={this.handleSubmit} error>
          <Form.Field>
            <label>first name</label>
            <Input name="name" placeholder="first name" onChange={this.handleChange} value={this.state.fields.name} className="login-input"/>
          </Form.Field>
          <Form.Field>
            <label>username</label>
            <Input name="username" placeholder="username" onChange={this.handleChange} value={this.state.fields.username} className="login-input"/>
          </Form.Field>
          <Form.Field>
            <label>email</label>
            <Input type="email" name="email" placeholder="email" onChange={this.handleChange} value={this.state.fields.email} className="login-input"/>
          </Form.Field>
          {this.state.error ? <Message
            error
            content='Uh oh! Make sure your passwords match!'
          /> : null}
          <Form.Field>
            <label>password</label>
            <Input type="password" name="password" placeholder="password" onChange={this.handleChange} value={this.state.fields.password} className="login-input"/>
          </Form.Field>
          <Form.Field>
            <label>confirm password</label>
            <Input type="password" name="confirm" placeholder="confirm your password" onChange={this.handleChange} value={this.state.fields.confirm} className="login-input" />
          </Form.Field>
          <Button type="submit" className="login-button">Submit</Button>
        </Form>
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
