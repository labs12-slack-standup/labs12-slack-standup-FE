import React, { Component } from "react";
import { Link } from "react-router-dom";

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
	bothToggleOff = e => {};
	// change handlers
	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	emailHandler = e => {
		e.preventDefault();
		this.state.emails.push(e.target.value);
	};

	render() {
		return this.state.createToggle ? (
			<div>
				<h3>Create a team:</h3>
				<div>Add your team members here by email:</div>
				<form onSubmit={this.emailHandler}>
					<input
						type="text"
						// onSubmit={this.emailHandler}
						name="singleEmail"
						onChange={this.changeHandler}
					/>
				</form>
				<div>Have a join code?</div>
				<button onClick={this.joinToggle}>Input Join Code</button>
				<Link to="dashboard/reports">
					<button>Let's go!</button>
				</Link>
			</div>
		) : this.state.joinToggle ? (
			<div>
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
			<div>
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
