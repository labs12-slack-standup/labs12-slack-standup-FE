import './Style/dashboard.css';
import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import Team from './Team';
import { axiosWithAuth, baseURL } from '../../config/axiosWithAuth.js';
import InviteUser from './InviteUser';
import { Spinner, Intent } from '@blueprintjs/core';
export class Dashboard extends Component {
	state = {
		users: [],
		newMemberEmail: '',
		joinCode: '',
		isLoading: true
	};

	componentDidMount() {
		//get user's joinCode from token and setState accordingly. Necessary to invite new team members.
		const joinCode = jwt_decode(localStorage.getItem('token')).joinCode;
		this.setState({
			joinCode: joinCode
		});

		axiosWithAuth()
			.get(`${baseURL}/users/team`)
			.then(res => {
				this.setState({ users: res.data.users });

				if (this.state.users.length > 0) {
					this.setState({ isLoading: false });
				}
			})
			.catch(err => console.log(err));
	}

	updateUser = () => {
		const endpoint = `${baseURL}/users/`;
		const editedUser = {
			active: false
		};
		axiosWithAuth()
			.put(endpoint, editedUser)
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
	};

	addUser = () => {
		//create mailObject to post to sendgrid API
		const mailObject = {
			email: this.state.newMemberEmail,
			joinCode: this.state.joinCode
		};
		//sendgrid endpoint on our back end
		const endpoint = `${baseURL}/email`;

		//figure out how to display res in UI so admin knows email has been sent successfully
		axiosWithAuth()
			.post(endpoint, mailObject)
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
	};

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		if (this.state.isLoading) {
			return <Spinner intent={Intent.PRIMARY} />;
		}
		return (
			<div className="teamDashboard">
				<h3>Dashboard</h3>
				<Team users={this.state.users} updateUser={this.updateUser} />
				<InviteUser changeHandler={this.changeHandler} addUser={this.addUser} />
				<br />
				<Link to="/dashboard/reports">View Current Reports</Link>
			</div>
		);
	}
}

export default Dashboard;
