import React, { Component } from 'react';
import { axiosWithAuth, baseURL } from '../../config/axiosWithAuth.js';

class Account extends Component {
	constructor(props) {
		super(props);
		this.state = {
			accountInfo: [],
			newName: '',
			newPic: ''
		};
	}

	componentDidMount() {
		const endpoint = `${baseURL}/users/byuser`;
		axiosWithAuth()
			.get(endpoint)
			.then(res =>
				this.setState({
					accountInfo: res.data.user
				})
			)
			.catch(err => console.log(err));
	}

	updateUser = e => {
		e.preventDefault();
		const endpoint = `${baseURL}/users/`;
		const editedUser = {};
		if (this.state.newName) {
			editedUser.fullName = this.state.newName;
			this.setState({
				accountInfo: {
					...this.state.accountInfo,
					fullName: editedUser.fullName
				}
			});
		}
		if (this.state.newPic) {
			editedUser.profilePic = this.state.newPic;
			this.setState({
				accountInfo: {
					...this.state.accountInfo,
					profilePic: editedUser.profilePic
				}
			});
		}
		console.log(editedUser);
		axiosWithAuth()
			.put(endpoint, editedUser)
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
	};

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		// return this.state.accountInfo.roles === 'admin' ? (
		// 	<div>MANAGER VIEW</div>
		// ) : (
		return (
			<div>
				Account Info:
				<div>
					<div>Email: {this.state.accountInfo.email}</div>
					<div>Join Code: {this.state.accountInfo.joinCode}</div>
					<div>Full Name: {this.state.accountInfo.fullName}</div>

					<img
						src={this.state.accountInfo.profilePic}
						alt="a headshot, preferably"
					/>
				</div>
				<form onSubmit={this.updateUser}>
					<input
						type="text"
						value={this.state.newName}
						name="newName"
						onChange={this.changeHandler}
						placeholder="What's your name"
					/>
					<input
						type="text"
						value={this.state.newPic}
						name="newPic"
						placeholder="gimme a picture link"
						onChange={this.changeHandler}
					/>
					<button type="submit">Submit Changes</button>
				</form>
			</div>
		);
	}
}

export default Account;
