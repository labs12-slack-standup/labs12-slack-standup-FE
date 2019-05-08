import React, { Component } from 'react';
import SingleReport from './SingleReport';
import { axiosWithAuth, baseURL } from '../../config/axiosWithAuth';
import Slack from '../Slack/Slack';

import { Link } from 'react-router-dom';
import CreateReport from './ModifyReports/CreateReport';
// SAME AS SURVEY LIST ON WIREFRAME

class Reports extends Component {
	render() {
		if (this.props.reports.length < 1) {
			return (
				<div>
					<h2>You have not created any reports</h2>
					<Link to="/dashboard/reports/new">
						<button>Create Report</button>
					</Link>
					<Slack />
				</div>
			);
		}
		return (
			<div>
				Reports
				<div>
					<Link to="/dashboard/reports/new">
						<button>Create Report</button>
					</Link>
					<Slack />
					{/* passing reports from state to individual components */}
					{this.props.reports.map(report => (
						<SingleReport
							key={report.id}
							report={report}
							deleteReport={this.props.deleteReport}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default Reports;
