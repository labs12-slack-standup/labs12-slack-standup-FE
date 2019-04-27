import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./onboarding.css";

import CreateTeam from "./CreateTeam";
import LandingPage from "./LandingPage";
import JoinTeam from "./JoinTeam";

class Onboarding extends Component {
	constructor(props) {
		super(props);
		this.state = {
			joinToggle: false,
			createToggle: false,
			joincode: "",
			singleEmail: "",
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
	// push emails to state when submited
	// allows the emails to be displayed above the Add Team Member button\
	// *****Currently does not clear field***** LEVEL 2 BUG

	emailHandler = e => {
		e.preventDefault();
		const updatedEmails = [...this.state.emails];
		updatedEmails.push(this.state.singleEmail);
		console.log(updatedEmails);
		this.setState({ emails: updatedEmails });
		this.setState({ singleEmail: "" });
	};
	removeEmail = emailIdx => {
		console.log(emailIdx);

		const updateEmails = [...this.state.emails].filter((item, idx) => {
			console.log(idx);
			return idx !== emailIdx;
		});
		this.setState({
			emails: updateEmails
		});
	};

	render() {
		return this.state.createToggle ? (
			<CreateTeam
				emails={this.state.emails}
				emailHandler={this.emailHandler}
				joinToggle={this.joinToggle}
				toggleAllOff={this.toggleAllOff}
				changeHandler={this.changeHandler}
				removeEmail={this.removeEmail}
			/>
		) : this.state.joinToggle ? (
			<JoinTeam
				createToggle={this.createToggle}
				toggleAllOff={this.toggleAllOff}
				changeHandler={this.changeHandler}
			/>
		) : (
			<LandingPage
				joinToggle={this.joinToggle}
				createToggle={this.createToggle}
			/>
		);
	}
}

export default Onboarding;
