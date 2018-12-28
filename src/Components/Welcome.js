import React, { Component } from 'react'
import './CSS/welcome.scss'

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
      <div className="welcome">
        <div className="about-me">
          <p>hello. welcome to mindful todo.</p>
          <p>this is a space to transfer your thoughts.</p>
          <p>say all or nothing at all.</p>
          <p>your secret's safe with me.</p>
        </div>
      </div>
    )
  }
}

export default Welcome


// <Grid container className="welcome-grid">
//   <Grid.Column width={7}>
//     <Image src={'https://images.unsplash.com/photo-1517021818302-9b520a06c834?ixlib=rb-0.3.5&s=407b3a1f90c0d6b32d1aa055bc57290c&w=1000&q=80'} alt="#" className="welcome-img" />
//   </Grid.Column>
//   <Grid.Column width={9}>
//     <h3 id="welcome-h3">a place to calm your overactive mind</h3>
//     <List relaxed>
//       <List.Item>
//         <List.Icon name='check circle outline' size='small' verticalAlign='middle' />
//         <List.Content>
//           <p>declutter your brain by writing down your thoughts</p>
//         </List.Content>
//       </List.Item>
//       <List.Item>
//         <List.Icon name='check circle outline' size='small' verticalAlign='middle' />
//         <List.Content>
//           <p>get rewarded for completeting tasks and lists</p>
//         </List.Content>
//       </List.Item>
//       <List.Item>
//         <List.Icon name='check circle outline' size='small' verticalAlign='middle' />
//         <List.Content>
//           <p>follow your progress and watch your productivity grow</p>
//         </List.Content>
//       </List.Item>
//     </List>
//       <Modal className="welcome-modal" open={this.state.open} onClose={this.close} trigger={
//         <div className="welcome-button">
//           <Button value="login" id="login" onClick={this.triggerModal}>log in</Button>
//           <Button value="signup" id="signup" onClick={this.triggerModal}>sign up</Button>
//         </div>
//       } closeIcon>
//       <Modal.Content>
//         {this.state.login ? <LoginForm signup={this.toggle}/> : null}
//         {this.state.signup ? <SignupForm login={this.toggle}/> : null}
//       </Modal.Content>
//     </Modal>
//   </Grid.Column>
// </Grid>
//
