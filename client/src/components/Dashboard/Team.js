import React, { Component } from 'react';
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
				</div>
			</div>
		);
	}
}

export default Team;
