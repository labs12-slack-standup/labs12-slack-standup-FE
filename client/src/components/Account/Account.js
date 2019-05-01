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
		const endpoint = `https://master-slack-standup.herokuapp.com/api/users/byuser`;
		axiosWithAuth()
			.get(endpoint)
			.then(res =>
	
				this.setState({
					accountInfo: res.data.user
				})
			)
			.catch(err => console.log(err));
		
	}

	updateUser = () => {
		const endpoint = `https://master-slack-standup.herokuapp.com/api/users/`
		axiosWithAuth().put(endpoint, ...this.state.accountInfo).then().catch()
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value });
	}


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
				<form>
					<input type='text' value={this.state.accountInfo.fullName} onChange={this.changeHandler} name='accountInfo.fullName'  />
					<input />

				</form>
			</div>
		);
	}
}

export default Account;
