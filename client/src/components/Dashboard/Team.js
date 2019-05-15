import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Card, Elevation, Button } from '@blueprintjs/core';
import User from './User';


class Team extends Component {
	state = {
		openInactiveUsers: false
	};
	viewInactiveUsers = () => {
		this.setState({ openInactiveUsers: !this.state.openInactiveUsers });
	};


	render() {
		const activeUsers = this.props.users.filter(user => user.active);
		const inactiveUsers = this.props.users.filter(user => !user.active);
		
	return (
		<div>
			<h3>Teamies:</h3>
			<h4>Active Users on Team</h4>
			{activeUsers.map(user => (
				<User
					user={user}
					key={user.id}
					activateUser={props.activateUser}
					deactivateUser={props.deactivateUser}
				/>
			))}
			<br />
			<br />
			<h4>Inactive Users</h4>
			{inactiveUsers.map(user => (
				<User
					user={user}
					key={user.id}
					activateUser={props.activateUser}
					deactivateUser={props.deactivateUser}
				/>
			))}
		</div>
	);
};


export default Team;
