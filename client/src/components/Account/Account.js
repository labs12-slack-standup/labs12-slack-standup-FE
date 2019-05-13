import React, { Component } from 'react';
import { axiosWithAuth, baseURL } from '../../config/axiosWithAuth.js';
import { Card, Elevation, Button, Collapse } from '@blueprintjs/core';
import './account.css';
class Account extends Component {
	constructor(props) {
		super(props);
		this.state = {
			accountInfo: [],
			newName: '',
			newPic: '',
			achivedReports: [],
			openAchivedReports: false
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
	viewAchivedReports = () => {
		const endpoint = `${baseURL}/reports`;
		axiosWithAuth()
			.get(endpoint)
			.then(res =>
				this.setState({
					achivedReports: res.data.reports,
					openAchivedReports: !this.state.openAchivedReports
				})
			)
			.catch(err => console.log(err));
	};
	reactivateReport = id => {
		const editedReport = {
			active: true
		};

		console.log(editedReport);
		const endpoint = `${baseURL}/reports/${id}`;
		axiosWithAuth()
			.put(endpoint, editedReport)
			.then(res => console.log(res))
			.catch(err => console.log(err));
		this.props.history.push('/dashboard/reports');
	};

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
		const inactiveReports = this.state.achivedReports.filter(
			report => !report.active
		);
		return this.state.accountInfo.roles === 'admin' ? (
			<Card interactive={true} elevation={Elevation.TWO} className="userCard">
				<h3>{this.state.accountInfo.fullName}</h3>
				<div>Email: {this.state.accountInfo.email}</div>
				<div>Join Code: {this.state.accountInfo.joinCode}</div>

				<img
					src={this.state.accountInfo.profilePic}
					alt="a headshot, preferably"
				/>

				<form className="userForm" onSubmit={this.updateUser}>
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
					<Button type="submit">Submit Changes</Button>
					<div />
				</form>
				<Button onClick={this.viewAchivedReports}>
					{this.state.openAchivedReports === false
						? 'View Archived Reports'
						: 'Hide Archived Reports'}
				</Button>
				<div>
					<Collapse isOpen={this.state.openAchivedReports}>
						{inactiveReports.length < 1 ? (
							<div>No archived Reports</div>
						) : (
							inactiveReports.map((report, idx) => (
								<div key={idx}>
									<h3>{report.reportName}</h3>
									<Button onClick={() => this.reactivateReport(report.id)}>
										Reactivate Report
									</Button>
								</div>
							))
						)}
					</Collapse>
				</div>
			</Card>
		) : (
			<Card interactive={true} elevation={Elevation.TWO} className="userCard">
				<div>
					<h3>{this.state.accountInfo.fullName}</h3>
					<div>
						<div>Email: {this.state.accountInfo.email}</div>

						<img
							src={this.state.accountInfo.profilePic}
							alt="a headshot, preferably"
						/>
					</div>
					<form className="userForm" onSubmit={this.updateUser}>
						<div>
							Change display name:
							<input
								type="text"
								value={this.state.newName}
								name="newName"
								onChange={this.changeHandler}
								placeholder="new name"
							/>
						</div>
						<br />
						<div>
							Change profile picture:
							<input
								type="text"
								value={this.state.newPic}
								name="newPic"
								placeholder="picture link"
								onChange={this.changeHandler}
							/>
						</div>
						<Button type="submit">Submit Changes</Button>
					</form>
				</div>
			</Card>
		);
	}
}

export default Account;
