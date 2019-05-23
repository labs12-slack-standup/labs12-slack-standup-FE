import React from 'react';

import { Link } from 'react-router-dom';

import SingleReport from './SingleReport';

// style imports
import { Fab, Icon, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import './reports.css';

// Container for all reports including title
// Parent component = ReportsDash.js in '/components/Dashboard/ReportsDash'

const Reports = props => {
	// filter only the active reports
	const activeReports = props.reports.filter(report => report.active);
	return (
		<div className="user-reports-container">
			<header className="reports-header">
				<Typography className="reports-header-text" variant="h3">
					Reports
				</Typography>
				<div className="reports-header-buttons">
					<Link
						to={
							props.role !== 'admin' ? '/dashboard' : '/dashboard/reports/new'
						}
					>
						<Fab
							color="primary"
							aria-label="Add"
							size="large"
							disabled={props.role !== 'admin' ? true : false}
						>
							{props.role !== 'admin' ? <Icon>lock</Icon> : <AddIcon />}
						</Fab>
					</Link>
				</div>
			</header>
			<div>
				{/* passing reports from state to individual components */}
				{activeReports.map(report => (
					<SingleReport
						role={props.role}
						key={report.id}
						report={report}
						archiveReport={props.archiveReport}
					/>
				))}
			</div>
		</div>
	);
};

export default Reports;
