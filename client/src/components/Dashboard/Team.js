import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Elevation, Collapse, Button } from '@blueprintjs/core';

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
				<div className="teamList">
					{activeUsers.map((user, idx) => (
						<div key={user.id} className="teamCard">
							<img src={user.profilePic} alt="profile pic" />
							<h4>{user.fullName}</h4>
							{/* <Link to={`/dashboard/team/${user.id}`}>Edit Team Memeber</Link> */}
						</div>
					))}
				</div>
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
							<div key={user.id}>
								<img src={user.profilePic} alt="profile pic" />
								<h4>{user.fullName}</h4>
								<Link to={`/dashboard/team/${user.id}`}>Edit Team Memeber</Link>
							</div>
						))
					)}
				</Collapse>
			</div>
		);
	}
}


export default Team;
