import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCrucsAZVktDATv4zg3QT_FJ20zmg3T39U',
  authDomain: 'slack-standup-1556221821574.firebaseapp.com',
};
firebase.initializeApp(config);

const uiConfig = {
  signInFlow: 'redirect',
  signInSuccessUrl: '/signedIn',
  signInOptions: [
    firebase.auth.GithubAuthProvider.PROVIDER_ID
  ]
};

class Login extends React.Component {
  render() {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={
            firebase
            .auth()
            .onAuthStateChanged(user => console.log(user))}
        />
      </div>
    );
  }
}

export default Login