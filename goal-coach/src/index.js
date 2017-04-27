import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { firebaseApp } from './firebase';
import { logUser } from './actions'
import reducer from './reducers';

import App from './components/App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';


const store = createStore(reducer);

firebaseApp.auth().onAuthStateChanged(user => {
  if (user) {
    const { email } = user;
    store.dispatch(logUser(email));
  } else {
    store.dispatch(logUser({}));
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router path="/">
      <div>
        <Route path="/app" component={App} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
