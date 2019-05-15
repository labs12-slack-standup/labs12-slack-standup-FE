import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from '@blueprintjs/core';

const SingleReport = props => {
	return (
		<Card className="reportsCard">
			<Link
				to={`/dashboard/reports/${props.report.id}`}
				style={{ textDecoration: 'none' }}
			>
				<h2>{props.report.reportName}</h2>
				<h4>Message: {props.report.message}</h4>
				<h5>{props.report.created_at}</h5>

				<Button>
					<Link to={`/dashboard/reports/${props.report.id}/edit`}>Edit</Link>
				</Button>
				<Button onClick={() => props.archiveReport(props.report.id)}>
					Archive
				</Button>
			</Link>
		</Card>
	);
};

export default SingleReport;
