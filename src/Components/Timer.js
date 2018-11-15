import React, { Component } from 'react'

class Timer extends Component {

  state = {
    timer: null,
    counter: 0
  }

  render() {
    return (
      <div>Loading{"...".substr(0, this.state.counter % 3 + 1)}</div>
    )
  }
}

export default Timer
