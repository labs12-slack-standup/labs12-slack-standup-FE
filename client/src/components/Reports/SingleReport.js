import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Icon } from '@blueprintjs/core';
import { iconClass } from '@blueprintjs/core/lib/esm/common/classes';

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
		<Card className="reportsCard">
			{console.log(props.report)}
			<Link
				to={`/dashboard/reports/${props.report.id}`}
				style={{ textDecoration: 'none' }}
			>
				<h1 className="reports-card-title">{props.report.reportName}</h1>
				<h4 className="reports-card-schedule">Schedule</h4>
				<div className="reports-card-flex">
					<div className="reports-card-flex-icon">
						<Icon icon="timeline-events" />
					</div>
					<section className="reports-card-flex-days">
						{week.map(day => (
							<div
								key={day}
								className={`day ${
									props.report.schedule.includes(day) ? 'selected' : ''
								}`}
							>
								{day.charAt(0)}
							</div>
						))}
					</section>
				</div>
				<div className="reports-card-flex whitespace">
					<div className="reports-card-flex-icon">
						<Icon icon="time" />
					</div>
					<div className="reports-card-time">{timeStr}</div>
				</div>
			</Link>
			<div className="flex">
				<div>
					<Link
						to={`/dashboard/reports/${props.report.id}/edit`}
						className={props.role !== 'admin' ? 'disabled-link' : ''}
					>
						<Button className={props.role !== 'admin' ? 'bp3-disabled' : null}>
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
			</div>
		</Card>
	);
};

export default SingleReport;
