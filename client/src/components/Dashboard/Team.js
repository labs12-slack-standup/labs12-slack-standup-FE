import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Elevation, Button } from '@blueprintjs/core';

const Team = props => {
	const activeUsers = props.users.filter(user => user.active);
	const inactiveUsers = props.users.filter(user => !user.active);

	return (
		<div>
			<h3>Teamies:</h3>
			<h4>Active Users on Team</h4>
			{activeUsers.map(user => (
				<Card interactive={true} elevation={Elevation.TWO} key={user.id}>
					<img src={user.profilePic} alt="profile pic" />
					<h4>{user.fullName}</h4>
					<Link to={`/dashboard/team/${user.id}`}>Edit Team Memeber</Link>
				</Card>
			))}
			<br />
			<br />
			<h4>Inactive Users</h4>
			{inactiveUsers.map(user => (
				<div key={user.id}>
					<img src={user.profilePic} alt="profile pic" />
					<h4>{user.fullName}</h4>
					<Link to={`/dashboard/team/${user.id}`}>Edit Team Memeber</Link>
				</div>
			))}
			{/* {props.users.map(user => {
				return user.active ? (
					<div key={user.id}>
						<h3>Active Users</h3>
						<img src={user.profilePic} alt="profile pic" />
						<h4>{user.fullName}</h4>
						<Link to={`/dashboard/team/${user.id}`}>Edit Team Memeber</Link>
						<br />
						<br />
					</div>
				) : (
					<div>
						<h3>Inactive Users</h3>
						<img src={user.profilePic} alt="profile pic" />
						<h4>{user.fullName}</h4>
					</div>
				); */}
		</div>
	);
};

export default Team;
