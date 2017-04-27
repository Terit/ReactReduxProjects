import React, { Component } from 'react';
import Clock from './Clock'
import StopWatch from './StopWatch';
import { Form, FormControl, Button } from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deadline: 'December 25, 2017',
      newDeadline: '',
      timerSeconds: '',
      newTimerSecond: ''
    }
  }

  changeDeadline () {
    this.setState({
      deadline: this.state.newDeadline
    });
  }

  startTimer () {
    this.setState({ timerSeconds: this.state.newTimerSeconds });
  }

  timesUp () {
    alert('Times Up!');
    this.setState({ timerSeconds: null });
  }

  render () {
    return (
      <div className="App">
        <div className="App-title">
          Countdown to {this.state.deadline}
        </div>
        <Clock deadline={this.state.deadline} />
        <Form inline>
          <FormControl
            className="Deadline-input"
            placeholder="New Date"
            onChange={evt => this.setState({newDeadline: evt.target.value})} />
          <Button onClick={_ => this.changeDeadline()}>
            Submit
          </Button>
        </Form>
        <StopWatch
          timesUp={_ => this.timesUp()}
          seconds={this.state.timerSeconds} />
        <Form inline>
          <FormControl
            placeholder="Time in seconds"
            onChange={evt => this.setState({newTimerSeconds: evt.target.value})} />
          <Button onClick={_ => this.startTimer()}>
            Start
          </Button>
        </Form>
      </div>
    );
  }
}

export default App;
