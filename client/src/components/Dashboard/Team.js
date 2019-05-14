import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Elevation, Button } from '@blueprintjs/core';
import User2 from './User2';

const Team = props => {
	const activeUsers = props.users.filter(user => user.active);
	const inactiveUsers = props.users.filter(user => !user.active);

	return (
		<div>
			<h3>Teamies:</h3>
			<h4>Active Users on Team</h4>
			{activeUsers.map(user => (
				<User2
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
				<User2
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
