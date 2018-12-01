import React, { Component } from 'react'
import { Button, Modal, Grid, Image, List } from 'semantic-ui-react'
import LoginForm from './LoginForm.js'
import SignupForm from './SignupForm.js'

class Welcome extends Component {

  state = {
    login: false,
    signup: false,
    open: false
  }

  handleClick = (e) => {

    if (e.target.innerText === "log in") {
      this.setState({
        login: true
      })
    } else if (e.target.innerText === "sign up") {
      this.setState({
        signup: true
      })
    }
  }

  toggle = (e) => {
    if (e.target.value === "signup") {
      this.setState({
        signup: true,
        login: false
      })
    } else if (e.target.value === "login") {
      this.setState({
        login: true,
        signup: false
      })
    }
  }

  close = () => this.setState({ open: false })
  open = () => this.setState({ open: true })
  triggerModal = (e) => {
    if (e.target.value === "login") {
      this.setState({
        open: !this.state.open,
        login: true,
        signup: false
      })
    } else if (e.target.value === "signup") {
      this.setState({
        open: !this.state.open,
        signup: true,
        login: false
      })
    }
  }

  render() {

    return (
      <div>
        <h1 className="mindful-h1">mindful todo</h1>

        <Grid container className="welcome-grid">
          <Grid.Column width={7}>
            <Image src={"./3099178910.jpg"} alt="#" className="welcome-img"/>
          </Grid.Column>
          <Grid.Column width={6}>
            <List relaxed>
              <List.Item>
                <List.Icon name='check circle outline' size='large' verticalAlign='middle' />
                <List.Content>
                  <p>declutter your brain by writing down your thoughts</p>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='check circle outline' size='large' verticalAlign='middle' />
                <List.Content>
                  <p>get rewarded for completeting tasks and lists</p>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='check circle outline' size='large' verticalAlign='middle' />
                <List.Content>
                  <p>follow your progress and watch your productivity grow</p>
                </List.Content>
              </List.Item>
            </List>
              <Modal className="welcome-modal" open={this.state.open} onClose={this.close} trigger={
                <div className="welcome-button">
                  <Button value="login" className="welcome-segments" id="login" onClick={this.triggerModal}>log in</Button>
                  <Button value="signup" className="welcome-segments" id="signup" onClick={this.triggerModal}>sign up</Button>
                </div>
              } closeIcon>
              <Modal.Content>
                {this.state.login ? <LoginForm signup={this.toggle}/> : null}
                {this.state.signup ? <SignupForm login={this.toggle}/> : null}
              </Modal.Content>
            </Modal>
          </Grid.Column>
        </Grid>

      </div>
    )
  }
}

export default Welcome
