import { Menu, Icon, Modal } from 'semantic-ui-react'
import React, { Component } from 'react';
import { NavLink, withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import LoginForm from './LoginForm.js'
import SignupForm from './SignupForm.js'

class Navbar extends Component {

  state = {
    activeItem: '',
    open: false,
    login: false,
    signup: false
  }

  handleItemClick = (e, { name }) => {
    console.log(name);
    this.setState({
      activeItem: name
    })
  }

  close = () => this.setState({ open: false })
  open = () => this.setState({ open: true })
  triggerModal = (event, name) => {
    if (name.name === "login") {
      this.setState({
        open: !this.state.open,
        login: true,
        signup: false
      })
    } else if (name.name === "sign up") {
      this.setState({
        open: !this.state.open,
        signup: true,
        login: false
      })
    }
  }

  render() {
    const { activeItem } = this.state

    return (
      <div >
        {this.props.currentUser ?
          <Menu icon>
            <Menu.Item exact name='home' active={activeItem === 'home'} onClick={this.handleItemClick} as={NavLink} to="/user/home">
              <Icon name="home" size="big"  className="nav-icon"/>
            </Menu.Item>
            <Menu.Item exact
              name='lists'
              active={activeItem === 'lists'}
              onClick={this.handleItemClick} as={NavLink} to="/user/lists">
              <Icon name="list" size="big" className="nav-icon"/>
            </Menu.Item>
            <Menu.Item
              name='calendar'
              active={activeItem === 'calendar'}
              onClick={this.handleItemClick} as={NavLink} to="/user/calendar"
            >
              <Icon name="calendar check outline" size="big"  className="nav-icon"/>
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item
                  name='logout'
                  active={activeItem === 'logout'}
                  onClick={this.props.handleLogout}
                  as={NavLink} to="/">
                </Menu.Item>
            </Menu.Menu>
          </Menu>
        :
          <Menu icon>
            <Menu.Item exact name='home' active={activeItem === 'home'} onClick={this.handleItemClick} as={NavLink} to="/">
              <Icon name="home" size="big"  className="nav-icon"/>
            </Menu.Item>
            <Modal className="welcome-modal" open={this.state.open} onClose={this.close} trigger={
              <Menu.Menu position='right'>
                <Menu.Item
                  name='login'
                  active={activeItem === 'login'}
                  onClick={(event, sign) => this.triggerModal(event, sign)}>
                </Menu.Item>
                <Menu.Item
                  name='sign up'
                  active={activeItem === 'sign up'}
                  onClick={(event, sign) => this.triggerModal(event, sign)}>
                </Menu.Item>
              </Menu.Menu>
            } closeIcon>
              <Modal.Content>
                {this.state.login ? <LoginForm /> : null}
                {this.state.signup ? <SignupForm /> : null}
              </Modal.Content>
            </Modal>
          </Menu>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => {
      dispatch({
        type: "LOG_OUT"
      })
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar))
