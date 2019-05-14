import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Elevation, Collapse, Button } from '@blueprintjs/core';

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
				<h3>Teammates:</h3>
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
				<Button onClick={this.viewInactiveUsers}>
					{this.state.openInactiveUsers === false
						? 'View Inactive Users'
						: 'Hide Inactive Users'}
				</Button>
				<Collapse isOpen={this.state.openInactiveUsers}>
					{inactiveUsers.length < 1 ? (
						<div>All Users Active</div>
					) : (
						inactiveUsers.map((user, idx) => (
							<Card key={user.id}>
								<img src={user.profilePic} alt="profile pic" />
								<h4>{user.fullName}</h4>
								<Link to={`/dashboard/team/${user.id}`}>Edit Team Memeber</Link>
							</Card>
						))
					)}
				</Collapse>
				{/* {this.inactiveUsers.length > 0
				? inactiveUsers.map(user => (
						<div key={user.id}>
							<img src={user.profilePic} alt="profile pic" />
							<h4>{user.fullName}</h4>
							<Link to={`/dashboard/team/${user.id}`}>Edit Team Memeber</Link>
						</div>
				  ))
				: null} */}
			</div>
		);
	}
}

export default Team;
