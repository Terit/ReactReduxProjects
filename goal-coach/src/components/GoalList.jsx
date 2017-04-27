import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goalRef } from '../firebase';
import { setGoals } from '../actions';

import GoalItem from './GoalItem';

class GoalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: []
    }
  }

  componentDidMount() {
    goalRef.on('value', snap => {
      const goals = [];
      snap.forEach(goal => {
        const { email, title } = goal.val();
        const serverKey = goal.key;
        goals.push({ email, title, serverKey });
      });
      this.props.setGoals(goals);
    });
  }

  render() {
    return (
      <div>
        {this.props.goals.map((goal, i) => <GoalItem key={i} goal={goal} />)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { goals } = state;
  return {
    goals
  }
}

export default connect(mapStateToProps, { setGoals })(GoalList);
