import React, { Component } from 'react';
import SingleReport from './SingleReport';
import { axiosWithAuth, baseURL } from '../../config/axiosWithAuth';
import Slack from '../Slack/Slack';

import { Link } from 'react-router-dom';

class Reports extends Component {
	state = {
		message: '',
		reports: []
	};

	componentDidMount() {
		// call to get reports and stick them in state
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
	}
	
	deleteReport = id => {
		const endpoint = `${baseURL}/reports/${id}`;

		axiosWithAuth()
			.delete(endpoint)
			.then(res => 
				this.setState({
					message: res.data.message,
					reports: res.data.reports
				})
			)
			.catch(err => console.log(err));
	};

	render() {
		return (
			<>
				<h3>Reports</h3>
				<section>
					<Slack />
					<Link to="/dashboard/createreport">
						<button>Create Report</button>
					</Link>
				</section>
				{
					this.state.reports < 1 ?
					<div>
						<h2>You have not created any reports</h2>
					</div> :
					this.state.reports.map(report => (
						<SingleReport
							key={report.id}
							report={report}
							deleteReport={this.deleteReport}
						/>
					))
				}
			</>
		)
	}
}

export default Reports;
