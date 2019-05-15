import './reports.css';
import React, { Component } from 'react';
import SingleReport from './SingleReport';
import Slack from '../Slack/Slack';
import { Link } from 'react-router-dom';
import { Card, Button } from '@blueprintjs/core';

class Reports extends Component {
	render() {
		const activeReports = this.props.reports.filter(report => report.active);
		if (this.props.reports.length < 1) {
			return (
				<Card>
					<h2>You have not created any reports</h2>
					<Link to="/dashboard/reports/new">
						<button>Create Report</button>
					</Link>
					<Slack />
				</Card>
			);
		}
		return (
			<div>
				<Card>
					<Link to="/dashboard/reports/new">
						<Button>Create Report</Button>
					</Link>
					<Slack />
				</Card>
				{/* passing reports from state to individual components */}
				{activeReports.map(report => (
					<SingleReport
						key={report.id}
						report={report}
						archiveReport={this.props.archiveReport}
					/>
				))}
			</div>
		);
	}
}

export default Reports;
