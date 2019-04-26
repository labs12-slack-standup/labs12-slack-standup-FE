import React, { Component } from "react";
import axios from "axios";

class Account extends Component {
	constructor(props) {
		super(props);
		this.state = {
			accountInfo: []
		};
	}
	componentDidMount() {
		// call to get account by id
		// Currently not dynamic - must come back when Auth is finalized
		this.getAccount(1);
	}
	getAccount = id => {
		const endpoint = `https://master-slack-standup.herokuapp.com/api/users/${id}`;
		axios
			.get(endpoint)
			.then(res =>
				this.setState({
					accountInfo: res.data.user
				})
			)
			.catch(err => console.log(err));
	};

	render() {
		return this.state.accountInfo.roles === "manager" ? (
			<div>MANAGER VIEW</div>
		) : (
			<div>
				Account Info:
				<div>
					<div>Email: {this.state.accountInfo.email}</div>
					<div>TeamId: {this.state.accountInfo.teamId}</div>
				</div>
			</div>
		);
	}
}

export default Account;
