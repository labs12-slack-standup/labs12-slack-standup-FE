import React, { Component } from 'react';
import './onboarding.css';
import CreateTeam from './CreateTeam';
import LandingPage from './LandingPage';
import JoinTeam from './JoinTeam';
import { axiosWithAuth, baseURL } from '../../config/axiosWithAuth.js';

class Onboarding extends Component {
	constructor(props) {
		super(props);
		this.state = {
			joinToggle: false,
			createToggle: false,
			joinCode: '',
			singleEmail: '',
			emails: [],
			teamId: null,
			error: ''
		};
	}

	// toggles
	joinToggle = e => {
		this.setState({ joinToggle: !this.state.joinToggle });
		this.setState({ createToggle: false });
	};
	createToggle = () => {
		this.setState({ createToggle: !this.state.createToggle });
		this.setState({ joinToggle: false });
	};
	toggleAllOff = () => {
		this.setState({ createToggle: false });
		this.setState({ joinToggle: false });
	};
	// change handlers
	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	createTeam = async () => {
		this.separateEmails();
		const teamId = length => {
			return Math.round(
				Math.pow(9, length + 1) - Math.random() * Math.pow(9, length)
			);
		};

		const joinId = length => {
			return Math.round(
				Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)
			)
				.toString(36)
				.slice(1);
		};

		const randId = await teamId(8);
		const joinCode = await joinId(6);

		// splits email string into array by commas and removes spaces

		//create an object to send to mail api
		const mailObject = {
			//email singular to ensure consistency with adding an new user email on the dashboard
			email: this.state.emails,
			joinCode: joinCode
		};
		console.log('mailObject', mailObject);

		try {
			const updated = await axiosWithAuth().put(`${baseURL}/users/`, {
				teamId: randId,
				roles: 'admin',
				joinCode
			});
			localStorage.setItem('token', updated.data.token);

			// if the user's entered emails, make the post call to the email endpoint
			if (mailObject.email.length > 0) {
				await axiosWithAuth().post(`${baseURL}/email`, mailObject);
			}

			//redirect back to dashboard after team creation
			this.props.history.push('/dashboard');
		} catch (error) {
			console.log(error);
			this.setState({
				error:
					'There was an issue with the emails, please be sure to separate each email with a comma. Alternatively, you can pass the join code to your teammates manually.'
			});
		}
		// took this out because it was trying to update after the push to dashboard, but not sure why it was here in the first place so I haven't deleted it -- eek
		// this.setState({ teamId: randId });
	};

	// On submit to join a team by join code
	// Sets the user's teamId to match the manager's
	// Also gives user new token
	submitHandler = async e => {
		e.preventDefault();
		console.log(this.state.joinCode);
		try {
			const newToken = await axiosWithAuth().get(
				`${baseURL}/users/joinCode/${this.state.joinCode}`
			);
			localStorage.setItem('token', newToken.data.updatedToken);
			this.props.history.push('/dashboard');
		} catch (err) {
			console.log(err);
			this.setState({
				error: 'There was an issue joining this team. Check your join code'
			});
		}
	};
	clearError = () => {
		this.setState({ error: '' });
	};
	separateEmails = () => {
		const teamEmails = this.state.singleEmail.replace(/\s+/g, '').split(',');
		this.setState({ emails: teamEmails });
	};

	render() {
		// Landing Page - all booleans false
		return !this.state.joinToggle && !this.state.createToggle ? (
			<LandingPage
				joinToggle={this.joinToggle}
				createToggle={this.createToggle}
			/>
		) : this.state.createToggle ? (
			// Create a Team page - createToggle true
			<CreateTeam
				createTeam={this.createTeam}
				emails={this.state.emails}
				emailHandler={this.emailHandler}
				joinToggle={this.joinToggle}
				toggleAllOff={this.toggleAllOff}
				changeHandler={this.changeHandler}
				error={this.state.error}
				clearError={this.clearError}
			/>
		) : (
			// Join a Team page - joinToggle true
			<JoinTeam
				createToggle={this.createToggle}
				toggleAllOff={this.toggleAllOff}
				changeHandler={this.changeHandler}
				submitHandler={this.submitHandler}
				error={this.state.error}
				clearError={this.clearError}
			/>
		);
	}
}

export default Onboarding;
