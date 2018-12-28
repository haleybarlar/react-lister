import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";
import './CSS/login.scss'

class LoginForm extends Component {

  state = {
    error: false,
    fields: {
      username: "",
      password: ""
    },
    clicked: false,
    signup: false
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

  handleClick = (e) => {
    this.setState({
      signup: true
    })
  }

  render() {

    const { fields } = this.state

    if (this.state.clicked) {
      return <Redirect to='/user/home' />
    } else if (this.state.signup) {
      return <Redirect to='/signup' />
    }

    return (
      <div className='login'>
        <form onSubmit={this.handleSubmit} >
          <div>
            <label>username</label><br/>
            <input
              name="username"
              placeholder="username"
              onChange={this.handleChange}
              value={fields.username}
              className="login-input"
              autoComplete="off" />
          </div>
          <div className='password'>
            <label>password</label><br/>
            <input
              type="password"
              name="password"
              placeholder="enter your password"
              onChange={this.handleChange}
              value={fields.password}
              autoComplete="off"/>
          </div>
          <button type='submit' className="login-button">log in</button>
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
