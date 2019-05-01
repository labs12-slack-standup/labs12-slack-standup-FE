import React, { Component } from "react";
import axiosWithAuth from '../../config/axiosWithAuth'

class Account extends Component {
	constructor(props) {
		super(props);
		this.state = {
			accountInfo: []
		};
	}

	componentDidMount() {
		this.getAccount();
	}

	getAccount = () => {
		const endpoint = `https://master-slack-standup.herokuapp.com/api/users/`;
		axiosWithAuth()
			.get(endpoint)
			.then(res =>
				this.setState({
					accountInfo: res.data.user
				})
			)
			.catch(err => console.log(err));
	};

	render() {
		return this.state.accountInfo.roles === "admin" ? (
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
