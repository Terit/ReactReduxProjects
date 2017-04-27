import React, { Component } from 'react';

class StopWatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: 0
    }
  }

  countDown (seconds) {
    seconds -= 1;
    this.setState({seconds});

    if (seconds > 0) {
      setTimeout(_ => this.countDown(seconds), 1000);
    } else {
      this.props.timesUp();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.seconds) return;
    if (nextProps.seconds == this.props.seconds) return
    this.countDown(nextProps.seconds);
  }

  render () {
    return (
      <div>
        <h3>Stop Watch</h3>
        <div>{this.state.seconds}</div>
      </div>
    );
  }
}

export default StopWatch;
