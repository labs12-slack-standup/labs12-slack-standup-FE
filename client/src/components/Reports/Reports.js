import React, { Component } from 'react';
import SingleReport from './SingleReport';
import Slack from '../Slack/Slack';
import { Link } from 'react-router-dom';

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
