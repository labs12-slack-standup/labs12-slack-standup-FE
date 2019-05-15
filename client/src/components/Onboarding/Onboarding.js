import React, { Component } from 'react';
import './onboarding.css';
import { Redirect } from 'react-router-dom';
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
			teamId: null
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
		const teamEmails = this.state.emails.replace(/\s+/g, '').split(',');

		//create an object to send to mail api
		const mailObject = {
			//email singular to ensure consistency with adding an new user email on the dashboard
			email: teamEmails,
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

			//post mail object to mail endpoint
			await axiosWithAuth().post(`${baseURL}/email`, mailObject);
		} catch (error) {
			console.log(error);
		}

		this.setState({ teamId: randId });
	};

	submitHandler = async e => {
		e.preventDefault();

		try {
			const newToken = await axiosWithAuth().get(
				`${baseURL}/users/joinCode/${this.state.joinCode}`
			);
			console.log('new token', newToken);
			localStorage.setItem('token', newToken.data.updatedToken);
			this.props.history.push('/dashboard');
		} catch (err) {
			console.log(err);
		}
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
			/>
		) : (
			// Join a Team page - joinToggle true
			<JoinTeam
				createToggle={this.createToggle}
				toggleAllOff={this.toggleAllOff}
				changeHandler={this.changeHandler}
				submitHandler={this.submitHandler}
			/>
		);
	}
}

export default Onboarding;
