import { Menu, Icon, Modal } from 'semantic-ui-react'
import React, { Component } from 'react';
import { NavLink, withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import LoginForm from './LoginForm.js'

class Navbar extends Component {

  state = {
    activeItem: '',
    open: false
  }

  handleItemClick = (e, { name }) => {
    this.setState({
      activeItem: name
    })
  }

  close = () => this.setState({ open: false })
  open = () => this.setState({ open: true })
  triggerModal = () => this.setState({
    open: !this.state.open
  })

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
            {this.props.currentUser ?
              <Menu.Item
                name='logout'
                active={activeItem === 'logout'}
                onClick={this.props.handleLogout}
                as={NavLink} to="/">
              </Menu.Item>
              :
              <div>
              <Modal open={this.state.open} onClose={this.close} trigger={
                <Menu.Item
                  name='login'
                  active={activeItem === 'login'}
                  onClick={this.triggerModal}>
                </Menu.Item>
              } closeIcon>
                <Modal.Content>
                  <LoginForm />
                </Modal.Content>
              </Modal>
            </div>}
          </Menu.Menu>
        </Menu>
        :
        <Menu icon>
          <Menu.Item exact name='home' active={activeItem === 'home'} onClick={this.handleItemClick} as={NavLink} to="/">
            <Icon name="home" size="big"  className="nav-icon"/>
          </Menu.Item>
          <Menu.Menu position='right'>
              <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={this.props.handleItemClick}
                as={NavLink} to="/login">
              </Menu.Item>
              <Menu.Item
                name='sign up'
                active={activeItem === 'sign up'}
                onClick={this.props.handleItemClick}
                as={NavLink} to="/signup">
              </Menu.Item>
          </Menu.Menu>
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
