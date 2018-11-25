import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";

class LoginForm extends Component {

  state = {
    error: false,
    fields: {
      username: "",
      password: ""
    },
    clicked: false
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

  handleChange = (e) => {
    const newFields = {
      ...this.state.fields,
      [e.target.name]: e.target.value
    }
    this.setState({ fields: newFields })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.login(this.state.fields.username, this.state.fields.password)
    this.setState({
      clicked: true
    })
  }

  render() {

    const { fields } = this.state

    if (this.state.clicked === true) {
      return <Redirect to='/user/home' />
    }

    return (
      <div>
        {this.state.error ? <h1>Try Again</h1> : null}
        Login Form
        <form type="submit" onSubmit={this.handleSubmit}>
          <input name="username" placeholder="enter your username" onChange={this.handleChange} value={fields.username}></input>
          <input type="password" name="password" placeholder="enter your password" onChange={this.handleChange} value={fields.password}></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    lists: state.lists,
    currentUser: state.currentUser
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
    },
    setCurrentUser: (info) => {
      dispatch({
        type: "SEND_USER",
        payload: info
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
