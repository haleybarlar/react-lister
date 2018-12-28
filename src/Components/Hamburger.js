import { slide as Menu } from 'react-burger-menu'
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import './CSS/hamburger.scss'

class Hamburger extends Component {

  render () {
    return (
      <Menu right>
        {this.props.currentUser ?
          <div>
            <Link to="/user/lists"><p className="right-p">lists</p></Link>
            <Link to="/user/calendar"><p className="right-p">calendar</p></Link>
            <Link to="/" onClick={this.props.handleLogout}><p className="right-p">logout</p></Link>
          </div>
        :
          <div>
            <Link to="/login"><p className="right-p">log in</p></Link>
            <Link to="/signup"><p className="right-p">sign up</p></Link>
          </div>
        }


      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Hamburger)
