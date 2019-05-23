import React, { Component } from 'react';
import { axiosWithAuth, baseURL } from '../../config/axiosWithAuth';
import { Link } from 'react-router-dom';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import Slack from '../Slack/Slack';
import SingleReport from './SingleReport';
import './reports.css';

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

class Reports extends Component {
	constructor(props) {
		super(props);

		this.state = {
			slackModal: false,
			stepsEnabled: true,
			archiveModal: false,
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

	slackAuthCheck = e => {
		e.preventDefault();
		const endpoint = `${baseURL}/slack/channels`;
		axiosWithAuth()
			.get(endpoint)
			.then(res => {
				if (res.status !== 200) {
					console.log('56');
					this.setState({
						slackModal: true
					});
				} else {
					this.props.history.push('dashboard/reports/new');
				}
			})
			.catch(err => {
				this.setState({
					slackModal: true
				});
				console.log(err);
			});
	};

	handleClose = () => {
		this.setState({
			slackModal: false
		})
	}

	handleArchive = () => {
		this.setState({
			archiveModal: !this.state.archiveModal
		})
	}

	render() {
		//const { stepsEnabled, steps, initialStep } = this.state;

		const activeReports = this.props.reports.filter(report => report.active);

		return (
			<div className="user-reports-container">
				<header className="reports-header">
					<Typography variant="h3">Your Reports</Typography>
					<div className="reports-header-buttons">
						<Link to="/dashboard/reports/new">
							<Fab
								color="primary"
								aria-label="Add"
								size="large"
								className={this.props.role !== 'admin' ? 'disabled-link' : null}
								onClick={this.slackAuthCheck}
							>
								<AddIcon />
							</Fab>
						</Link>
					</div>
					<Dialog
						open={this.state.slackModal}
						TransitionComponent={Transition}
						keepMounted
						onClose={this.handleClose}
						aria-labelledby="alert-dialog-slide-title"
						aria-describedby="alert-dialog-slide-description"
					>
						<DialogTitle id="alert-dialog-slide-title">
							{'Want to add your Slack team to this report?'}
							<Button onClick={() => this.handleClose()}>x</Button>
						</DialogTitle>
						<Slack />
						
						<Button
							onClick={() => this.props.history.push('/dashboard/reports/new')}
						>
							Skip
						</Button>
						
					</Dialog>
				</header>
				<div>
					{/* passing reports from state to individual components */}
					{activeReports.map(report => (
						<SingleReport
							role={this.props.role}
							key={report.id}
							report={report}
							archiveReport={this.props.archiveReport}
							archiveModal={this.state.archiveModal}
							handleArchive={this.handleArchive}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default Reports;