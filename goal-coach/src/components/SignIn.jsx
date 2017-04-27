import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { firebaseApp } from '../firebase';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: {
        message: ''
      },
      redirectToReferrer: false,
    }
  }

  componentWillMount() {
    if (firebaseApp.auth().currentUser) {
      this.setState({ redirectToReferrer: true });
    }
  }

  signIn() {
    const { email, password } = this.state;
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .then(() => this.setState({ redirectToReferrer: true }))
      .catch(err => this.setState({ error: err }));
  }

  render() {
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={'/app'} />
      )
    }

    return (
      <div className="form-inline" style={{ margin: '5%' }}>
        <h2>Sign In</h2>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="email"
            style={{ marginRight: '5px' }}
            onChange={evt => this.setState({ email: evt.target.value })}
            type="text" />
          <input
            className="form-control"
            placeholder="password"
            style={{ marginRight: '5px' }}
            onChange={evt => this.setState({ password: evt.target.value })}
            type="password" />
          <button
            className="btn btn-primary"
            type="button"
            onClick={evt => this.signIn()} >
            Sign In
          </button>
        </div>
        <div>{this.state.error.message}</div>
        <div><Link to={'/signup'}>Sign Up instead</Link></div>
      </div>
    );
  }
}

export default SignIn;
