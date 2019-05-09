import React, { Component } from 'react';
import { axiosWithAuth, baseURL } from '../../config/axiosWithAuth.js';

class Account extends Component {
	constructor(props) {
		super(props);
		this.state = {
			accountInfo: [],
			newName: '',
			newPic: '',
			achivedReports: []
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
					achivedReports: res.data.reports
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
			<div>
				MANAGER VIEW Account Info:
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
					<div />
				</form>
				<button onClick={this.viewAchivedReports}>View Archived Reports</button>
				<div>This will be an accordian with styling</div>
				<div>
					{inactiveReports.map((report, idx) => (
						<div key={idx}>
							<h3>{report.reportName}</h3>
							<button onClick={() => this.reactivateReport(report.id)}>
								Reactivate Report
							</button>
						</div>
					))}
				</div>
			</div>
		) : (
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
