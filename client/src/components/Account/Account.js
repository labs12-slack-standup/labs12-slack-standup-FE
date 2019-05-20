import './account.css';
import React, { Component } from 'react';
import { axiosWithAuth, baseURL } from '../../config/axiosWithAuth.js';
import {
	FocusStyleManager,
	Card,
	Elevation,
	Collapse
} from '@blueprintjs/core';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

FocusStyleManager.onlyShowFocusOnTabs();
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
				<div className="profileCard">
					<h3>{this.state.accountInfo.fullName}</h3>
					<FormControl>
						<InputLabel
							htmlFor="custom-css-standard-input"
							style={{
								color: blue[500],
								root: {
									'&$cssFocused': {
										color: blue[500]
									}
								},
								focused: {}
							}}
						>
							Email
						</InputLabel>
						<Input
							id="custom-css-standard-input"
							style={{
								maxWidth: '400px',
								width: '400px',
								margin: '40px 0',
								color: blue[500],
								underline: {
									'&:after': {
										borderBottomColor: blue[500]
									}
								}
							}}
							value={this.state.accountInfo.email}
							placeholder={this.state.accountInfo.email}
							type="text"
							readOnly
						/>
					</FormControl>
					<img
						src={this.state.accountInfo.profilePic}
						alt="a headshot, preferably"
					/>
					{this.state.accountInfo.roles === 'admin' ? (
						<div>
							<Button
								style={{ margin: '30px 0' }}
								variant="outlined"
								color="primary"
								onClick={this.showJoinCode}
							>
								{this.state.showJoinCode ? 'Hide Join Code' : 'Show Join Code'}
							</Button>
							{!this.state.showJoinCode ? (
								<FormControl style={{ display: 'block' }}>
									<InputLabel
										htmlFor="custom-css-standard-input"
										style={{
											color: blue[500],
											root: {
												'&$cssFocused': {
													color: blue[500]
												}
											},
											focused: {}
										}}
									>
										Join Code
									</InputLabel>
									<Input
										id="custom-css-standard-input"
										style={{
											margin: '10px 0',
											color: blue[500],
											underline: {
												'&:after': {
													borderBottomColor: blue[500]
												}
											}
										}}
										value={this.state.accountInfo.joinCode}
										type={
											!this.state.accountInfo.showJoinCode ? 'password' : 'text'
										}
										readOnly
									/>
								</FormControl>
							) : (
								<div className="join-code">
									<FormControl>
										<InputLabel
											htmlFor="custom-css-standard-input"
											style={{
												color: blue[500],
												root: {
													'&$cssFocused': {
														color: blue[500]
													}
												},
												focused: {}
											}}
										>
											Join Code
										</InputLabel>
										<Input
											id="custom-css-standard-input"
											style={{
												margin: '10px 0',
												color: blue[500],
												underline: {
													'&:after': {
														borderBottomColor: blue[500]
													}
												}
											}}
											value={this.state.accountInfo.joinCode}
											type="text"
											readOnly
										/>
									</FormControl>
								</div>
							)}
						</div>
					) : null}
				</div>
				<div className="accountForms">
					<div className="editUser">
						<Button
							variant="outlined"
							color="primary"
							onClick={this.openUserEdit}
						>
							{this.state.openEditUser === false ? 'Edit' : 'Hide'}
						</Button>
						<Collapse isOpen={this.state.openEditUser}>
							<form className="userForm" onSubmit={this.updateUser}>
								<FormControl style={{ display: 'block' }}>
									<InputLabel
										htmlFor="custom-css-standard-input"
										style={{
											color: blue[500],
											root: {
												'&$cssFocused': {
													color: blue[500]
												}
											},
											focused: {}
										}}
									>
										Edit Name
									</InputLabel>
									<Input
										id="custom-css-standard-input"
										style={{
											// margin: '10px 0',
											color: blue[500],
											underline: {
												'&:after': {
													borderBottomColor: blue[500]
												}
											}
										}}
										type="text"
										value={this.state.newName}
										name="newName"
										onChange={this.changeHandler}
										placeholder="Enter new name"
									/>
								</FormControl>
								<FormControl>
									<InputLabel
										htmlFor="custom-css-standard-input"
										style={{
											color: blue[500],
											root: {
												'&$cssFocused': {
													color: blue[500]
												}
											},
											focused: {}
										}}
									>
										Edit Picture
									</InputLabel>
									<Input
										id="custom-css-standard-input"
										style={{
											margin: '10px 0',
											color: blue[500],
											underline: {
												'&:after': {
													borderBottomColor: blue[500]
												}
											}
										}}
										type="text"
										value={this.state.newPic}
										name="newPic"
										placeholder="Enter new picture Link"
										onChange={this.changeHandler}
									/>
								</FormControl>
								<Button
									variant="outlined"
									color="primary"
									style={{
										input: {
											display: 'none'
										},
										display: 'block',
										margin: '10px',
										width: '100px'
									}}
									type="submit"
									onClick={this.openUserEdit}
								>
									Submit
								</Button>
								<div />
							</form>
						</Collapse>
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
		);
	}
}

export default Account;
