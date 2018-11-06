import { Menu, Segment } from 'semantic-ui-react'
import React, { Component } from 'react';
import { Route, NavLink, HashRouter, Switch } from "react-router-dom";

class Navbar extends Component {

  state = {
    activeItem: ''
  }

  handleItemClick = (e, { name }) => {
    this.setState({
      activeItem: name
    })
  }

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item  name='home' active={activeItem === 'home'} onClick={this.handleItemClick} as={NavLink} to="/user/home"/>
          <Menu.Item exact
            name='lists'
            active={activeItem === 'lists'}
            onClick={this.handleItemClick} as={NavLink} to="/user/lists"
          />
          <Menu.Item
            name='calendar'
            active={activeItem === 'calendar'}
            onClick={this.handleItemClick} as={NavLink} to="/user/calendar"
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='sign up'
              active={activeItem === 'sign up'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>

      </div>
    );
  }
}

export default Navbar
