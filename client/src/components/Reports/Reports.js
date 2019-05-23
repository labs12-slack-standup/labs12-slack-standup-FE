import React from 'react';
import { Link } from 'react-router-dom';

import SingleReport from './SingleReport';

// style imports
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import './reports.css';

const Reports = props => {
	// filter only the active reports
	const activeReports = props.reports.filter(report => report.active);
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
							className={props.role !== 'admin' ? 'disabled-link' : null}
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
