import React, { Component } from 'react';
import Team from './Team';
import axiosWithAuth from '../../config/axiosWithAuth';

export class Dashboard extends Component {
	state = {
		users: []
	};

	componentDidMount() {
		axiosWithAuth()
			.get('http://localhost:5000/api/users/team')
			.then(res => this.setState({ users: res.data.users }))
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div>
				<h1>Dashboard</h1>
				<Team users={this.state.users} />
			</div>
		);
	}
}

export default Dashboard;
