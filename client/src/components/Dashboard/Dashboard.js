import './Style/dashboard.css';
import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import Team from './Team';
import { axiosWithAuth, baseURL } from '../../config/axiosWithAuth.js';
import InviteUser from './InviteUser';
import Reports from '../Reports/Reports';

export class Dashboard extends Component {
	state = {
		users: [],
		newMemberEmail: '',
		joinCode: ''
	};

	componentDidMount() {
		//get user's joinCode from token and setState accordingly. Necessary to invite new team members.
		const joinCode = jwt_decode(localStorage.getItem('token')).joinCode;
		this.setState({
			joinCode: joinCode
		});

		axiosWithAuth()
			.get(`${baseURL}/users/team`)
			.then(res => this.setState({ users: res.data.users }))
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
		}
		//create an array with everyone but the user the function's been called on
		const newUsers = this.state.users.filter(user => user.id !== id)

		
		axiosWithAuth()
			.put(endpoint, editedUser)
			.then(res => {
				newUsers.push(res.data.editedUser)
				this.setState({
					users: newUsers
				})
			})
			.catch(err => {
				console.log(err);
			});
			

	};

	deactivateUser = id => {
		const endpoint = `${baseURL}/users/${id}`;
		const editedUser = {
			active: false
		}
		const newUsers = this.state.users.filter(user => user.id !== id)
		
		axiosWithAuth()
			.put(endpoint, editedUser)
			.then(res => {
				newUsers.push(res.data.editedUser)
				this.setState({
					users: newUsers
				})
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
		return (
			<div className="teamDashboard">
				<h3>Dashboard</h3>
			
				<Team users={this.state.users} updateUser={this.updateUser} activateUser={this.activateUser} deactivateUser={this.deactivateUser}/>
				<InviteUser changeHandler={this.changeHandler} addUser={this.addUser} />
				<br />
				<Link to="/dashboard/reports">View Current Reports</Link>
			</div>
		);
	}
}

export default Dashboard;
