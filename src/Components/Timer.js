import React, { Component } from 'react'
import {connect} from 'react-redux'

class Timer extends Component {

  state = {
    timer: null,
    counter: 0
  }

  // componentDidMount() {
  //   let timer = setInterval(this.tick, 1000);
  //   this.setState({timer});
  // }
  // componentWillUnmount() {
  //   this.clearInterval(this.state.timer);
  // }
  //
  // tick = () => {
  //   this.setState({
  //     counter: this.state.counter + 1
  //   });
  // }


  render() {
    return (
      <div>Loading{"...".substr(0, this.state.counter % 3 + 1)}</div>
    )
  }
}

export default Timer
