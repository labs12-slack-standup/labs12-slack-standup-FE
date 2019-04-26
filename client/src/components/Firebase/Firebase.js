import axios from "axios";
import React from "react";
import firebase from "firebase";

const provider = new firebase.auth.GithubAuthProvider();
const config = {
	apiKey: "AIzaSyCrucsAZVktDATv4zg3QT_FJ20zmg3T39U",
	authDomain: "slack-standup-1556221821574.firebaseapp.com"
};
firebase.initializeApp(config);

class Firebase extends React.Component {
	render() {
		return <button onClick={this.submit}>GitHub Auth</button>;
	}
	submit = async () => {
		try {
			const { user } = await firebase.auth().signInWithPopup(provider);
			await axios.post(
				"https://master-slack-standup.herokuapp.com/api/auth/firebase",
				user
			);
			this.props.history.push("/onboarding");
		} catch (err) {
			console.log(err);
		}
	};
}

export default Firebase;
