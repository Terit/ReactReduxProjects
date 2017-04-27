import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { firebaseApp } from '../firebase';

class SignUp extends Component {
  constructor (props) {
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

  componentWillMount () {
    if (firebaseApp.auth().currentUser) {
      this.setState({redirectToReferrer: true});
    }
  }

  signUp () {
    const { email, password } = this.state
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
      .then(() => this.setState({redirectToReferrer: true}))
      .catch(err => this.setState({error: err}));
  }

  render () {
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={'/app'}/>
      )
    }

    return (
      <div className="form-inline" style={{margin: '5%'}}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="email" 
            style={{marginRight: '5px'}}
            onChange={evt => this.setState({email: evt.target.value})}
            type="text" />
          <input
            className="form-control"
            placeholder="password" 
            style={{marginRight: '5px'}}
            onChange={evt => this.setState({password: evt.target.value})}
            type="password" />            
          <button 
            className="btn btn-primary"
            type="button"
            onClick={evt => this.signUp()} >
            Sign Up
          </button>
        </div>
        <div>{this.state.error.message}</div>
        <div><Link to={'/signin'}>Already a member? Sign In instead.</Link></div>
      </div>
    );
  }
}

export default SignUp;
