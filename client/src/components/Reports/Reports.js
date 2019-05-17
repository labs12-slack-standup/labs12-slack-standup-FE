import './reports.css';
import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import SingleReport from './SingleReport';
import Slack from '../Slack/Slack';
import { Link } from 'react-router-dom';
import { Card, Button } from '@blueprintjs/core';
//import { Steps } from 'intro.js-react';

//import 'intro.js/introjs.css';

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
		if (activeReports.length < 1) {
			return (
				<div>
					{/* <Steps
						enabled={stepsEnabled}
						steps={steps}
						initialStep={initialStep}
						onExit={this.onExit}
					/> */}
					<Card className={`createNewReportCard`}>
						<h2>You have not created any reports</h2>
						<Link to="/dashboard/reports/new">
							<Button
								className={this.props.role !== 'admin' ? 'bp3-disabled' : null}
							>
								Create Report
							</Button>
						</Link>
						{!slackCheck ? (
							<Slack />
						) : (
							<h2>When created, your reports will be delivered via Slack.</h2>
						)}
					</Card>
				</div>
			);
		}
		return (
			<div>
				<Card className="createReportCard">
					<Link to="/dashboard/reports/new">
						<Button
							className={this.props.role !== 'admin' ? 'bp3-disabled' : null}
						>
							Create Report
						</Button>
					</Link>
					{!slackCheck ? (
						<Slack />
					) : (
						<h2>Your reports will be delivered via Slack.</h2>
					)}
				</Card>
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
		);
	}
}

export default Reports;
