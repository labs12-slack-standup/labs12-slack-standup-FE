import React, { Component } from 'react';
import { axiosWithAuth, baseURL } from '../../config/axiosWithAuth.js';

class User extends Component {

	updateUser = props => {
		const endpoint = `${baseURL}/users/${this.props.match.params.userId}`;
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

	render() {
		return (
			
			
			
			<div>
				<h3>Remove User from Team</h3>
				<button onClick={() => this.updateUser()}>Remove</button>
			</div>
		);
	}
}

export default User;
