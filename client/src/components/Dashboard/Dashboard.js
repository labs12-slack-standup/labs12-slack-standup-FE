import './Style/dashboard.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Team from './Team';
import { axiosWithAuth, baseURL } from '../../config/axiosWithAuth.js';

export class Dashboard extends Component {
	state = {
		users: []
	};

	componentDidMount() {
		axiosWithAuth()
			.get(`${baseURL}/users/team`)
			.then(res => this.setState({ users: res.data.users }))
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div className="teamDashboard">
				<h3>Dashboard</h3>
				<Team users={this.state.users} />
				<Link to="/dashboard/reports">View Current Reports</Link>
			</div>
		);
	}
}

export default Dashboard;
