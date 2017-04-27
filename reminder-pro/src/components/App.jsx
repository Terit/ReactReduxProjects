import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions';
import ReminderList from './ReminderList';

import '../index.css'

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      text: '',
      dueDate: '',
    }
  }

  addReminder () {
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  render() {
    return (
      <div className="app">
        <div className="title">
          Reminder Pro
        </div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input 
              placeholder="I have to..." 
              type="text" 
              className="form-control"
              onChange={evt => this.setState({text: evt.target.value})} />
            <input 
              type="datetime-local" 
              className="form-control"
              onChange={evt => this.setState({dueDate: evt.target.value})} />
          </div>
          <button 
            type="button" 
            className="btn btn-success"
            onClick={() => this.addReminder()}>
            Add Reminder
          </button>
        </div>
        <ReminderList 
          reminders={this.props.reminders}
          deleteReminder={this.props.deleteReminder}
          />
        <div 
          className="btn btn-danger"
          onClick={() => this.props.clearReminders()}>
          Clear Reminders
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reminders: state
  }
}

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App);
