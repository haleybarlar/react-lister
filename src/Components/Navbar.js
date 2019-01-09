import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import './CSS/navbar.scss'
import Hamburger from './Hamburger.js'


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
    debugger
    if (event.target.textContent.toLowerCase() === "log in") {
      this.setState({
        open: !this.state.open,
        login: true,
        signup: false
      })
    } else if (event.target.textContent.toLowerCase() === "sign up") {
      this.setState({
        open: !this.state.open,
        signup: true,
        login: false
      })
    }
  }

  render() {
    // const { activeItem } = this.state

    return (
      <div className="navbar">
        {this.props.currentUser ?
          <div>
            <Link to="/user/home"><p className="main">mindful todo</p></Link>
            <Hamburger handleLogout={this.props.handleLogout}/>
            <div className="nav-right">
              <Link to="/user/lists"><p className="right-p padding">lists <i class="fa fa-list" aria-hidden="true"></i></p></Link>
              <Link to="/user/calendar"><p className="right-p padding">calendar <i class="fa fa-calendar-o" aria-hidden="true"></i></p></Link>
              <Link to="/" onClick={this.props.handleLogout}><p className="right-p">logout <i class="fa fa-sign-out" aria-hidden="true"></i></p></Link>
            </div>
          </div>
        :
          <div>
            <Link to="/"><p className="main">mindful todo</p></Link>
            <Hamburger handleLogout={this.props.handleLogout}/>
            <div className="nav-right">
              <Link to="/login"><p id="login" className="right-p">log in <i class="fa fa-sign-in" aria-hidden="true"></i></p></Link>
              <Link to="/signup"><p className="right-p">sign up <i class="fa fa-user-plus" aria-hidden="true"></i></p></Link>
            </div>
          </div>
        }
      </div>
    )
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

// <Menu icon>
//   <Menu.Item exact name='home' active={activeItem === 'home'} onClick={this.handleItemClick} as={NavLink} to="/user/home">
//     <Icon name="home" size="big"  className="nav-icon"/>
//   </Menu.Item>
//   <Menu.Item exact
//     name='lists'
//     active={activeItem === 'lists'}
//     onClick={this.handleItemClick} as={NavLink} to="/user/lists">
//     <Icon name="list" size="big" className="nav-icon"/>
//   </Menu.Item>
//   <Menu.Item
//     name='calendar'
//     active={activeItem === 'calendar'}
//     onClick={this.handleItemClick} as={NavLink} to="/user/calendar"
//   >
//     <Icon name="calendar check outline" size="big"  className="nav-icon"/>
//   </Menu.Item>
//   <h1 className="mindful-h1" id="loggedin-navbar">mindful todo</h1>
//   <Menu.Menu position='right'>
//       <Menu.Item
//         name='logout'
//         active={activeItem === 'logout'}
//         onClick={this.props.handleLogout}
//         as={NavLink} to="/">
//       </Menu.Item>
//   </Menu.Menu>
// </Menu>

// :

// <Menu icon>
//   <Menu.Item exact name='home' active={activeItem === 'home'} onClick={this.handleItemClick} as={NavLink} to="/">
//     <Icon name="home" size="big"  className="nav-icon"/>
//   </Menu.Item>
//   <h1 className="mindful-h1">mindful todo</h1>
//   <Modal className="welcome-modal" open={this.state.open} onClose={this.close} trigger={
//     <Menu.Menu position='right'>
//       <Menu.Item
//         name='login'
//         active={activeItem === 'login'}
//         onClick={(event, sign) => this.triggerModal(event, sign)}>
//       </Menu.Item>
//       <Menu.Item
//         name='sign up'
//         active={activeItem === 'sign up'}
//         onClick={(event, sign) => this.triggerModal(event, sign)}>
//       </Menu.Item>
//     </Menu.Menu>
//   } closeIcon>
//     <Modal.Content>
//       {this.state.login ? <LoginForm /> : null}
//       {this.state.signup ? <SignupForm /> : null}
//     </Modal.Content>
//   </Modal>
// </Menu>
