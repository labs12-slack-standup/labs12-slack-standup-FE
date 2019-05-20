import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { Card, Elevation, Button, Collapse } from '@blueprintjs/core';
import User from './User';

class Team extends Component {
	state = {
		openInactiveUsers: false
	};
	viewInactiveUsers = () => {
		this.setState({ openInactiveUsers: !this.state.openInactiveUsers });
	};

	render() {
		const token = jwt_decode(localStorage.getItem('token'));
		const activeUsers = this.props.users.filter(user => user.active);
		const inactiveUsers = this.props.users.filter(user => !user.active);

		return (
			<div>
				<div className="usersContainer">
					{activeUsers.map(user => (
						<User
							user={user}
							key={user.id}
							activateUser={this.props.activateUser}
							deactivateUser={this.props.deactivateUser}
						/>
					))}
					<Button
						className={
							token.roles === 'admin' ? 'activateButton' : 'bp3-disabled'
						}
						onClick={this.viewInactiveUsers}
					>
						{this.state.openInactiveUsers ? 'Hide Inactive' : 'View Inactive'}
					</Button>
				</div>
				<div className="usersContainer">
					<Collapse isOpen={this.state.openInactiveUsers}>
						{inactiveUsers.map(user => (
							<User
								token={this.token}
								user={user}
								key={user.id}
								activateUser={this.props.activateUser}
								deactivateUser={this.props.deactivateUser}
								openInactive={this.state.openInactiveUsers}
							/>
						))}
					</Collapse>
				</div>
			</div>
		);
	}
}

export default Team;
