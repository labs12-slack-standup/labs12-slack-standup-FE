import './dashboard.css';
import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import Team from './Team';
import { axiosWithAuth, baseURL } from '../../config/axiosWithAuth.js';
import InviteUser from './InviteUser';
import { Card } from '@blueprintjs/core';
import { Spinner, Intent } from '@blueprintjs/core';

export class Dashboard extends Component {
	state = {
		users: [],
		newMemberEmail: '',
		joinCode: '',
		isLoading: true,
		message: '',
		active: true
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

	activateUser = id => {
		const endpoint = `${baseURL}/users/${id}`;
		const editedUser = {
			active: true
		};
		//create an array with everyone but the user the function's been called on
		const newUsers = this.state.users.filter(user => user.id !== id);

		axiosWithAuth()
			.put(endpoint, editedUser)
			.then(res => {
				newUsers.push(res.data.editedUser);
				this.setState({
					users: newUsers
				});
			})
			.catch(err => {
				console.log(err);
			});
	};

	deactivateUser = id => {
		const endpoint = `${baseURL}/users/${id}`;
		const editedUser = {
			active: false
		};
		const newUsers = this.state.users.filter(user => user.id !== id);

		axiosWithAuth()
			.put(endpoint, editedUser)
			.then(res => {
				newUsers.push(res.data.editedUser);
				this.setState({
					users: newUsers
				});
			})
			.catch(err => {
				console.log(err);
			});
	};

	addUser = e => {
		e.preventDefault();
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
				this.setState({ message: 'Email sent!' });
			})
			.catch(err => {
				console.log(err);
				this.setState({
					message:
						'There was an issue sending the email, please email your new team member manually.'
				});
			});
	};

	changeHandler = e => {
		this.setState({ newMemberEmail: e.target.value });
	};
	clearMessage = () => {
		this.setState({ message: '' });
	};

	render() {
		if (this.state.isLoading) {
			return <Spinner intent={Intent.PRIMARY} />;
		}
		return (
			<Card className="teamDashboard">
				<Team
					className="teamContainer"
					users={this.state.users}
					updateUser={this.updateUser}
					activateUser={this.activateUser}
					deactivateUser={this.deactivateUser}
				/>
				<InviteUser
					changeHandler={this.changeHandler}
					addUser={this.addUser}
					message={this.state.message}
					clearMessage={this.clearMessage}
				/>
			</Card>
		);
	}
}

export default Dashboard;
