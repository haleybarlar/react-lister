import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect } from "react-router-dom";
import { Segment, Grid, Divider, Icon, Header, Button } from 'semantic-ui-react'

class HomePage extends Component {

  state = {
    clicked: false,
    value: "",
    submitted: false
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.setState({
      clicked: true
    })

    if (this.state.value !== "") {
    const data = {
      user_id: 1,
      kind: this.state.value,
      done: false
    }

    fetch('http://localhost:3000/api/v1/lists', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json())
    .then(resp => {this.props.addList(resp); this.props.setCurrentList(resp.id);})
    .then(() => this.setState({open:false, submitted: true}))
    }
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  close = () => this.setState({ open: false })
  open = () => this.setState({ open: true })
  triggerModal = () => this.setState({
    open: !this.state.open
  })

  setClicked = () => {
    this.setState({
      clicked: true
    })
  }

render() {

  if (this.state.clicked === true) {
    return <Redirect to='/user/getStarted' />
  }

  console.log(this.props.currentUser.name);

  return(
    <div>
      <h1 className="mindful-h1" id="home">mindful todo</h1>

      <Segment circular raised id="welcome-circle">
        <h1 className="get-started-h1" id="welcome-h1">welcome, {this.props.currentUser.name}!</h1>
        </Segment>

        <Segment placeholder raised className="class-stats">
          <Grid columns={2} stackable textAlign='center'>
            <Divider vertical id="home-stats">
              <Icon name="check circle outline" className="icon" size="huge" />
            </Divider>
            <Grid.Row verticalAlign='middle'>
              <Grid.Column>
                <Header>
                  <p className="lists">total lists completed</p>
                  <h1 className="total">{this.props.currentUser.lists_completed}</h1>
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header>
                  <p className="lists">total tasks completed</p>
                  <h1 className="total">{this.props.currentUser.tasks_completed}</h1>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Button className="circle-button" onClick={this.setClicked}>get started</Button>
        </Segment>

    </div>
  )
}
}

const mapStateToProps = (state) => {
  return {
    lists: state.lists,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addList: (list) => {
      dispatch({
        type: "ADD_LIST",
        payload: list
      })
    },
    setCurrentList: (id) => {
      dispatch({
        type: "SET_LIST",
        payload: id
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
