import React, { Component } from 'react';
import Reminder from './Reminder';

class ReminderList extends Component {
  render () {
    return (
      <ul className="list-group col-sm-4">
        {
          this.props.reminders.map(reminder => <Reminder key={reminder.id} reminder={reminder} deleteReminder={this.props.deleteReminder} />)
        }
      </ul>
    );
  }
}

export default ReminderList;
