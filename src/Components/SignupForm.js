import React, { Component } from 'react'

class SignupForm extends Component {
  render() {
    return (
      <div>
        Signup Form
        <form type="submit" onSubmit={this.handleSubmit}>
          <input type="email" name="email" placeholder="enter your email"></input>
          <input type="password" name="password" placeholder="enter your password"></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default SignupForm
