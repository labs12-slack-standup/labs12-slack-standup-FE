import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./onboarding.css";

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

	render() {
		return this.state.createToggle ? (
			<div className="onboarding">
				<h3>Create a team:</h3>
				<h4>Members Added:</h4>
				{this.state.emails.map((email, idx) => (
					<div key={idx}>{email}</div>
				))}
				<div>Add your team members here by email:</div>
				<form onSubmit={this.emailHandler}>
					<input
						type="email"
						// onSubmit={this.emailHandler}
						name="singleEmail"
						onChange={this.changeHandler}
					/>
					<button onClick={this.emailHandler}>Add Team Member</button>
				</form>
				<Link to="dashboard/reports">
					<button>Create Team</button>
				</Link>
				<div>Have a join code?</div>
				<button onClick={this.joinToggle}>Input Join Code</button>
			</div>
		) : this.state.joinToggle ? (
			<div className="onboarding">
				Enter Join Code (provided by your manger):
				<form>
					<input
						type="text"
						placeholder="join code"
						onChange={this.changeHandler}
						name="joincode"
						// onSubmit={this.submitHandler}
					/>
				</form>
				<div>
					Actually don't have a join code? That's okay, let's create a team:
					<button onClick={this.createToggle}>Create Team</button>
				</div>
				<Link to="dashboard/reports">
					<button>Let's go!</button>
				</Link>
			</div>
		) : (
			<div className="onboarding">
				<h3>Hi! Thanks for signing up.</h3>
				<h4>Do you have a join code?</h4>
				<h4>If not, no worries, you can create a team here too</h4>
				<button onClick={this.joinToggle}>I have a join code</button>
				<button onClick={this.createToggle}>Create a Team</button>
			</div>
		);
	}
}

export default Onboarding;
