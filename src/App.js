import React, { Component } from 'react';
import './App.css';
import User from './Components/User.js'


class App extends Component {

  render() {
    return (
      <div>
        <button>Log In</button>
        <button>Sign Up</button>
        <User />
      </div>
    );
  }
}

export default App
