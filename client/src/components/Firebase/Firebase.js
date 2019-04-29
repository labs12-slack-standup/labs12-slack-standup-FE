import axios from "axios";
import React from "react";
import firebase from "firebase";

const GHprovider = new firebase.auth.GithubAuthProvider();
//const GOprovider = new firebase.auth.GoogleAuthProvider();

const config = {
	apiKey: "AIzaSyCrucsAZVktDATv4zg3QT_FJ20zmg3T39U",
	authDomain: "slack-standup-1556221821574.firebaseapp.com"
};
firebase.initializeApp(config);

class Firebase extends React.Component {
	render() {
		return (
			<div>
				<button onClick={this.submitGitHub}>GitHub Auth</button>
				{/* <button onClick={this.submitGoogle}>Google Auth</button> */}
			</div>
		);
	}
	submitGitHub = async () => {
		try {
			const { GHuser } = await firebase.auth().signInWithPopup(GHprovider);
			await axios.post(
				"https://master-slack-standup.herokuapp.com/api/auth/firebase",
				GHuser
			);
			console.log(GHuser);
			this.props.history.push("/onboarding");
		} catch (err) {
			console.log(err);
		}
	};
	// submitGoogle = async () => {
	// 	try {
	// 		const { GOuser } = await firebase.auth().signInWithPopup(GOprovider);
	// 		await axios.post(
	// 			"https://master-slack-standup.herokuapp.com/api/auth/firebase",
	// 			GOuser
	// 		);
	// 		console.log(GOuser);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };
}

export default Firebase;
