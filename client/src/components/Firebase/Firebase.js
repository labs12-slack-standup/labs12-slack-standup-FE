import axios from 'axios';
import React, { Component } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import jstz from 'jstz';

const config = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN
};
firebase.initializeApp(config);

const uiConfig = {
	signInFlow: 'popup',
	signInSuccessUrl: '/onboarding',
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.GithubAuthProvider.PROVIDER_ID
	],
	callbacks: {
		signInSuccessWithAuthResult: ({ user }) => {
			axios.post(
				'https://master-slack-standup.herokuapp.com/api/auth/firebase',
				{
					user,
					timezone: jstz.determine().name()
				}
			)
				.then(res =>
					localStorage.setItem('token', res.data)
				)
				.catch(err => {
					console.log(err);
				});

			// try {
			//     console.log('before')
			//     const response = await axios.post(
			//         // "https://master-slack-standup.herokuapp.com/api/auth/firebase",
			//         "http://localhost:4444/api/auth/firebase",
			//         {
			//             user,
			//             timezone: jstz
			//                 .determine()
			//                 .name()
			//         }
			//     );
			//     console.log('after')
			//     console.log(response.data);
			//     localStorage.setItem('token', response.data);

			//     // console.log(window.location.pathname);
			//     // if (window.location.pathname === '/signup') {
			//     //     console.log(window.location.pathname);
			//     //     this.props.history.push('/onboarding');
			//     // } else {
			//     //     console.log(window.location.pathname);
			//     //     this.props.history.push('/dashboard');
			//     // }
			// } catch (err) {
			//     console.log(err);
			// }
		}
	}
};

class Firebase extends Component {
	render() {
		return (
			<StyledFirebaseAuth
				uiConfig={uiConfig}
				firebaseAuth={firebase.auth()}
			/>
		);
	}
}

export default Firebase;
