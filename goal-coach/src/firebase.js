import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCpFjD1vEBpJ6Q06x8_YJPCMcG4LCLt0_E",
  authDomain: "goalcoach-f5c67.firebaseapp.com",
  databaseURL: "https://goalcoach-f5c67.firebaseio.com",
  projectId: "goalcoach-f5c67",
  storageBucket: "goalcoach-f5c67.appspot.com",
  messagingSenderId: "781968717984"
};

export const firebaseApp = firebase.initializeApp(config);

export const goalRef = firebase.database().ref('goals');

export const completeGoalRef = firebase.database().ref('completeGoals');
