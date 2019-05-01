import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import './onboarding.css';
import axios from 'axios';
import axiosWithAuth from '../../config/axiosWithAuth.js';

import CreateTeam from './CreateTeam';
import LandingPage from './LandingPage';
import JoinTeam from './JoinTeam';

class Onboarding extends Component {
	constructor(props) {
		super(props);
		this.state = {
			joinToggle: false,
			createToggle: false,
			joincode: '',
			singleEmail: '',
			emails: []
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
				Math.pow(9, length + 1) -
					Math.random() * Math.pow(9, length)
			);
		};

		const joinCode = length => {
			return Math.round(
				Math.pow(36, length + 1) -
					Math.random() * Math.pow(36, length)
			)
				.toString(36)
				.slice(1);
		};
		//storing joinCode in state to send in emails to users when that gets built
		const uniqueJoinCode = joinCode(6)
		this.setState({ joinCode: uniqueJoinCode });

		const endpoint = `https://localhost:4444/api/users/`;
		//inserting a random ten-digit number for teamId and 6 digit alphanumeric for joinCode
		try {
			await axiosWithAuth().put(endpoint, {
				teamId: teamId(8),
			joinCode: uniqueJoinCode,
			roles: 'admin'
			})
		} catch (error) {
			console.log(error);	
		}
		
		
		};
	

	// push emails to state when submited
	// allows the emails to be displayed above the Add Team Member button\
	// *****Currently does not clear input field***** LEVEL 2 BUG

	emailHandler = e => {
		e.preventDefault();
		const updatedEmails = [...this.state.emails];
		updatedEmails.push(this.state.singleEmail);
		console.log(updatedEmails);
		this.setState({ emails: updatedEmails });
		this.setState({ singleEmail: '' });
		document.createTeamForm.reset();
	};
	// function for removing emails from array before submitting them to create a team
	removeEmail = emailIdx => {
		const updateEmails = [...this.state.emails].filter(
			(item, idx) => idx !== emailIdx
		);
		this.setState({
			emails: updateEmails
		});
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
				joinCode={this.state.joinCode}
				emails={this.state.emails}
				emailHandler={this.emailHandler}
				joinToggle={this.joinToggle}
				toggleAllOff={this.toggleAllOff}
				changeHandler={this.changeHandler}
				removeEmail={this.removeEmail}
			/>
		) : (
			// Join a Team page - joinToggle true
			<JoinTeam
				createToggle={this.createToggle}
				toggleAllOff={this.toggleAllOff}
				changeHandler={this.changeHandler}
			/>
		);
	}
}

export default Onboarding;
