import { Menu, Segment, Icon } from 'semantic-ui-react'
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
      <div className="ui bottom fixed menu">
        <Menu pointing secondary>
          <Menu.Item  name='home' active={activeItem === 'home'} onClick={this.handleItemClick} as={NavLink} to="/user/home">
            <Icon name="home" />
          </Menu.Item>
          <Menu.Item exact
            name='lists'
            active={activeItem === 'lists'}
            onClick={this.handleItemClick} as={NavLink} to="/user/lists">
            <Icon name="list" />
          </Menu.Item>
          <Menu.Item
            name='calendar'
            active={activeItem === 'calendar'}
            onClick={this.handleItemClick} as={NavLink} to="/user/calendar"
          >
            <Icon name="calendar check outline" />
          </Menu.Item>
        </Menu>

      </div>
    );
  }
}

export default Navbar
