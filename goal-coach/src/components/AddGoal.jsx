import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goalRef } from '../firebase';

class AddGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    }
  }

  addGoal() {
    goalRef.push({ email: this.props.user.email, title: this.state.title });
  }

  render() {
    return (
      <div>
        <div className="form-inline">
          <div className="form-group">
            <input
              type="text"
              placeholder="Add a goal"
              style={{ marginRight: '5px' }}
              className="form-control"
              onChange={evt => this.setState({ title: evt.target.value })} />
            <button
              className="btn btn-success"
              onClick={() => this.addGoal()}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

export default connect(mapStateToProps, null)(AddGoal);
