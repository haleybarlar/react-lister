import React, { Component } from 'react'

class LoginForm extends Component {
  render() {
    return (
      <div>
        Login Form
        <form type="submit" onSubmit={this.handleSubmit}>
          <input type="email" name="email" placeholder="enter your email"></input>
          <input type="password" name="password" placeholder="enter your password"></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default LoginForm
