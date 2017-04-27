import React, { Component } from 'react';
import moment from 'moment';

class Reminder extends Component {
  render() {
    const { reminder } = this.props;
    return (
      <li className="list-group-item">
        <div className="list-item">
          <div>{reminder.text}</div>
          <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
        </div>
        <div 
          className="list-item delete-button"
          onClick={() => this.props.deleteReminder(reminder.id)}>
          &#x2715;
        </div>
      </li>
    );
  }
}

export default Reminder;
