import React, { Component } from 'react';
import Navbar from './Components/Navbar.js'
import './App.css';
import User from './Components/User.js'
import ListContainer from './Components/ListContainer.js'
import { Route, NavLink, HashRouter, Switch } from "react-router-dom";


class App extends Component {

  render() {


    return (
      <div>
        <Navbar />
          <Switch>
            <Route path="/user" component={User}/>
          </Switch>
      </div>
    );
  }
}

export default App
