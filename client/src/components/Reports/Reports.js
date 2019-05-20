import './reports.css';
import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import SingleReport from './SingleReport';
import Slack from '../Slack/Slack';
import { Link } from 'react-router-dom';
import { slackURL } from '../../config/axiosWithAuth';

import { Card, Button } from '@blueprintjs/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
//import { Steps } from 'intro.js-react';

import './reports.css';

class Reports extends Component {
	constructor(props) {
		super(props);

		this.state = {
			stepsEnabled: true,
			initialStep: 0,
			steps: [
				{
					element: 'navbar',
					intro: "You don't have any active reports."
				},
				{
					element: '.createNewReportCard',
					intro: 'Start by creating one...'
				}
			]
		};
	}
	onExit = () => {
		this.setState(() => ({ stepsEnabled: false }));
	};

	render() {
		//const { stepsEnabled, steps, initialStep } = this.state;

		const activeReports = this.props.reports.filter(report => report.active);
		const slackCheck = jwt_decode(localStorage.getItem('token')).slackTeamId;
		console.log(slackCheck);
		return (
			<div>
				<header className="reports-header">
					<Typography variant="h3">Your Reports</Typography>
					<div className="reports-header-buttons">
						<Link to="/dashboard/reports/new">
							<Fab
								color="primary"
								aria-label="Add"
								size="large"
								className={this.props.role !== 'admin' ? 'disabled-link' : null}
							>
								<AddIcon />
							</Fab>
						</Link>
				  </div>
        </header>
        <div>
					{/* passing reports from state to individual components */}
					{activeReports.map(report => (
						<SingleReport
							role={this.props.role}
							key={report.id}
							report={report}
							archiveReport={this.props.archiveReport}
						/>
					))}
				</div>
      </div>
			);
	}
}

export default Reports;
