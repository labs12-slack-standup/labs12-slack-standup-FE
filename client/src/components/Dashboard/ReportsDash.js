import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateReport from '../Reports/ModifyReports/CreateReport';
import Reports from '../Reports/Reports';
import EditReport from '../Reports/ModifyReports/EditReport';
import { baseURL, axiosWithAuth } from '../../config/axiosWithAuth';
import SingleReportResults from '../Reports/MemberReports/ReportResults';

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

	archiveReport = id => {
		const endpoint = `${baseURL}/reports/${id}`;
		const updatedReport = {
			active: false
		};
		axiosWithAuth()
			.put(endpoint, updatedReport)
			.then(res => {
				//this.setResponseAsState(res.data.reports);
				this.getReports();
			})
			.catch(err => console.log(err));
	};

	setResponseAsState = reports => {
		this.setState({
			reports: reports
		});
	};

	render() {
		return (
			<div className="reportsDash">
				<Switch>
					<Route
						exact
						path="/dashboard"
						render={props => (
							<Reports
								{...props}
								reports={this.state.reports}
								archiveReport={this.archiveReport}
							/>
						)}
					/>
					<Route
						exact
						path="/dashboard/reports/new"
						render={props => (
							<CreateReport
								{...props}
								setResponseAsState={this.setResponseAsState}
							/>
						)}
					/>
					<Route
						exact
						path="/dashboard/reports/:reportId/edit"
						render={props => (
							<EditReport
								{...props}
								setResponseAsState={this.setResponseAsState}
							/>
						)}
					/>
					<Route
						exact
						path="/dashboard/reports/:reportId"
						render={props => (
							<SingleReportResults {...props} getReports={this.getReports} />
						)}
					/>	
				</Switch>
			</div>
		);
	}
}

export default ReportsDash;
