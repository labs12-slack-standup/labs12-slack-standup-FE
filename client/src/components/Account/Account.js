import './account.css';
import React, { Component } from 'react';

import { axiosWithAuth, baseURL } from '../../config/axiosWithAuth.js';
import { Collapse } from '@blueprintjs/core';

import {
	Card,
	Button,
	Input,
	InputLabel,
	TextField,
	FormControl
} from '@material-ui/core';

class Account extends Component {
	constructor(props) {
		super(props);
		this.state = {
			accountInfo: [],
			newName: '',
			newPic: '',
			achivedReports: [],
			openAchivedReports: false,
			openEditUser: false,
			showJoinCode: false
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
		this.props.history.push('/dashboard');
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
	openUserEdit = () => {
		this.setState({ openEditUser: !this.state.openEditUser });
	};
	showJoinCode = () => {
		this.setState({ showJoinCode: !this.state.showJoinCode });
	};

	render() {
		const inactiveReports = this.state.achivedReports.filter(
			report => !report.active
		);
		return (
			<div className="userCard">
				<Card raised={true} className="top-user-card">
					<div className="userCard-content">
						<div className="profileCard-content">
							<h3>{this.state.accountInfo.fullName}</h3>
							<TextField
								InputLabelProps={{ shrink: true }}
								className="email-field"
								label="Email"
								value={this.state.accountInfo.email}
								margin="normal"
								variant="outlined"
								color="primary"
								fullWidth
								disabled
							/>
							<div className="editUser">
								<Button
									style={{ margin: '10px 0' }}
									variant="outlined"
									color="primary"
									onClick={this.openUserEdit}
								>
									{this.state.openEditUser === false ? 'Edit' : 'Cancel'}
								</Button>
								<Collapse isOpen={this.state.openEditUser}>
									<form className="userForm" onSubmit={this.updateUser}>
										<FormControl id="edit-user-content">
											<InputLabel htmlFor="custom-css-standard-input">
												Edit Name
											</InputLabel>
											<Input
												id="custom-css-standard-input"
												type="text"
												value={this.state.newName}
												name="newName"
												onChange={this.changeHandler}
												placeholder="Enter new name"
											/>
										</FormControl>
										<FormControl>
											<InputLabel htmlFor="custom-css-standard-input">
												Edit Picture
											</InputLabel>
											<Input
												id="custom-css-standard-input"
												type="text"
												value={this.state.newPic}
												name="newPic"
												placeholder="Enter new picture Link"
												onChange={this.changeHandler}
											/>
										</FormControl>
										<Button
											style={{ display: 'block', margin: '10px 0' }}
											id="edit-user-button"
											variant="contained"
											color="primary"
											type="submit"
											onClick={this.openUserEdit}
										>
											Submit
										</Button>
										<div />
									</form>
								</Collapse>
							</div>
						</div>
						<img
							src={this.state.accountInfo.profilePic}
							alt="a headshot, preferably"
						/>
					</div>
				</Card>
				{this.state.accountInfo.roles === 'admin' ? (
					<Card raised={true} className="top-user-card">
						<div className="accountForms">
							<h3>Admin Controls</h3>
							<div>
								<div>
									<Button
										style={{ margin: '10px 0' }}
										id="edit-user-button"
										variant="outlined"
										color="primary"
										onClick={this.showJoinCode}
									>
										Join Code
									</Button>
									{this.state.showJoinCode === true ? (
										<TextField
											label="Join Code"
											value={this.state.accountInfo.joinCode}
											margin="normal"
											variant="outlined"
											disabled
										/>
									) : null}
								</div>
								<div className="editUser">
									<Button
										variant="outlined"
										color="primary"
										onClick={this.viewAchivedReports}
										style={
											this.state.accountInfo.roles === 'admin'
												? { display: 'block' }
												: { display: 'none' }
										}
									>
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
														<Button
															variant="outlined"
															color="primary"
															onClick={() => this.reactivateReport(report.id)}
														>
															Reactivate Report
														</Button>
													</div>
												))
											)}
										</Collapse>
									</div>
								</div>
							</div>
						</div>
					</Card>
				) : null}
			</div>
		);
	}
}

export default Account;
