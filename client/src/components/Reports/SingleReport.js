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

	return (
		<Card className="reportsCard">
			{console.log(props.report)}
			<Link
				to={`/dashboard/reports/${props.report.id}`}
				style={{ textDecoration: 'none' }}
			>
				<h1>{props.report.reportName}</h1>
				<h4>Scheduled days for delivery:</h4>
				<div>
					<Icon icon="timeline-events" />
					<section className="days-flex">
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
			</Link>

			<Link
				to={`/dashboard/reports/${props.report.id}/edit`}
				className={props.role !== 'admin' ? 'disabled-link' : ''}
			>
				<Button className={props.role !== 'admin' ? 'bp3-disabled' : null}>
					Edit{' '}
				</Button>
			</Link>
			<Button
				onClick={() => props.archiveReport(props.report.id)}
				className={props.role !== 'admin' ? 'disabled-link' : null}
			>
				Archive
			</Button>
		</Card>
	);
};

export default SingleReport;
