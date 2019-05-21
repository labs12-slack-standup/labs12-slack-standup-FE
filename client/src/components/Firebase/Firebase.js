import axios from 'axios';
import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import jstz from 'jstz';
import { baseURL } from '../../config/axiosWithAuth';
import jwt_decode from 'jwt-decode';

const config = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN
};

firebase.initializeApp(config);

class Firebase extends Component {
	render() {
		const uiConfig = {
			signInFlow: 'popup',
			signInSuccessUrl: '/onboarding',
			signInOptions: [
				firebase.auth.GoogleAuthProvider.PROVIDER_ID,
				firebase.auth.GithubAuthProvider.PROVIDER_ID
			],
			callbacks: {
				signInSuccessWithAuthResult: ({ user }) => {
					axios
						.post(`${baseURL}/auth/firebase`, {
							user,
							timezone: jstz.determine().name()
						})
						.then(res => {
							localStorage.setItem('token', res.data);
							const token = jwt_decode(res.data);
							if (token.teamId) {
								this.props.history.push('/dashboard');
							} else {
								this.props.history.push('/onboarding');
							}
						})
						.catch(err => {
							console.log(err);
						});
				}
			}
		};
		return (
			<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
		);
	}
}

export default Firebase;

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
