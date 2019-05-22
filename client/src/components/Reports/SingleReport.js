import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Fab } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

import './reports.css';

const SingleReport = props => {
	const week = [
		'Monday',
		'Tueday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday'
	];

	const time = props.report.scheduleTime.split(':');
	let timeStr = `${time[0]}:${time[1]}am`;
	if (time[0] > 12) {
		timeStr = `${time[0] - 12}:${time[1]}pm`;
	}

	return (
		<Card raised={true} className="reportsCard">
			<div className="single-report-header">
				<h1 className="reports-card-title">{props.report.reportName}</h1>
				<div className="single-report-buttons">
					<Link
						to={`/dashboard/reports/${props.report.id}/edit`}
						className={props.role !== 'admin' ? 'disabled-link' : ''}
					>
						<Fab
							color="default"
							size="small"
							aria-label="Edit"
							className={props.role !== 'admin' ? 'disabled-link' : ''}
						>
							<Icon>edit_icon</Icon>
						</Fab>
					</Link>
					<Fab
						color="secondary"
						size="small"
						aria-label="Delete"
						onClick={() => props.archiveReport(props.report.id)}
						className={props.role !== 'admin' ? 'disabled-link' : ''}
					>
						<Icon>delete_icon</Icon>
					</Fab>
				</div>
			</div>
			<div className="single-report-content">
				<Link
					to={`/dashboard/reports/${props.report.id}`}
					style={{ textDecoration: 'none' }}
				>
					<h4 className="reports-card-schedule">Schedule</h4>
					<div className="reports-card-flex">
						<div className="reports-card-flex-icon">
							<Icon>calendar_today</Icon>
						</div>
						<section className="reports-card-flex-days">
							{week.map((day, idx) => (
								<div
									key={day}
									className={`day ${
										props.report.schedule.includes(day) ? 'selected' : ''
									}`}
								>
									{idx === 0 || idx === 2 || idx === 4
											? day.charAt(0)
											: day.charAt(0) + day.charAt(1)}
								</div>
							))}
						</section>
					</div>
					<div className="reports-card-flex whitespace">
						<div className="reports-card-flex-icon">
							<Icon>alarm</Icon>
						</div>
						<div className="reports-card-time">{timeStr}</div>
					</div>
				</Link>
				{/* <div className="flex">
					<div>
						<Link
							to={`/dashboard/reports/${props.report.id}/edit`}
							className={props.role !== 'admin' ? 'disabled-link' : ''}
						>
							<Button className={props.role !== 'admin' ? 'disabled-link' : ''}>
								Edit{' '}
							</Button>
						</Link>
					</div>
					<div>
						<Button
							onClick={() => props.archiveReport(props.report.id)}
							className={props.role !== 'admin' ? 'disabled-link' : ''}
						>
							Archive
						</Button>
					</div>
				</div> */}
			</div>
		</Card>
	);
};

export default SingleReport;
