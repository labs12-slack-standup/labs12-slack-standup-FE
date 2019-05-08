import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CreateReport from '../Reports/ModifyReports/CreateReport';
import SingleReport from '../Reports/SingleReport';
import Reports from '../Reports/Reports';
import EditReport from '../Reports/ModifyReports/EditReport';

import { baseURL, axiosWithAuth } from '../../config/axiosWithAuth';
import Dashboard from './Dashboard';
import MemberResponseForm from '../Reports/MemberReports/MemberResponseForm';

class ReportsDash extends Component {
	state = {
		message: '',
		reports: []
	};
	componentDidMount() {
		// call to get reports and stick them in state
		this.getReports();
	}

	getReports = () => {
		const endpoint = `${baseURL}/reports`;
		axiosWithAuth()
			.get(endpoint)
			.then(res =>
				this.setState({
					message: res.data.message,
					reports: res.data.reports
				})
			)
			.catch(err => console.log(err));
	};
	deleteReport = id => {
		const endpoint = `${baseURL}/reports/${id}`;

		axiosWithAuth()
			.delete(endpoint)
			.then(res => console.log(res))
			.catch(err => console.log(err));
	};
	render() {
		return (
			<div>
				<Route
					exact
					path="/dashboard/reports"
					render={props => (
						<Reports
							{...props}
							reports={this.state.reports}
							deleteReport={this.deleteReport}
						/>
					)}
				/>
				<Route
					exact
					path="/dashboard/reports/new"
					render={props => (
						<CreateReport {...props} getReports={this.getReports} />
					)}
				/>
				<Route
					exact
					path="/dashboard/reports/:reportId/edit"
					render={props => (
						<EditReport {...props} getReports={this.getReports} />
					)}
				/>
				<Route
					exact
					path="/dashboard/reports/:reportId"
					render={props => (
						<MemberResponseForm {...props} getReports={this.getReports} />
					)}
				/>
			</div>
		);
	}
}

export default ReportsDash;
