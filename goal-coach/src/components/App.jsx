import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseApp } from '../firebase';
import AddGoal from './AddGoal';
import GoalList from './GoalList';
import CompleteGoalList from './CompleteGoalList';

class App extends Component {
  signOut() {
    firebaseApp.auth().signOut();
    this.props.history.push('/signin');
  }

  render() {
    return (
      <div style={{ margin: '5px' }}>
        <h3>Goal Coach</h3>
        <AddGoal />
        <hr />
        <h4>Goals</h4>
        <GoalList />
        <hr />
        <h4>Complete Goals</h4>
        <CompleteGoalList />
        <hr />
        <button
          className="btn btn-danger"
          onClick={() => this.signOut()}>
          Sign Out
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

export default withRouter(connect(mapStateToProps, null)(App));
