import React from 'react';
import { Link } from 'react-router-dom';



const SingleReport = props => {
	return (
		<div>
			<h2>Report Name: {props.report.reportName}</h2>
			<h3>Report Created: {props.report.created_at}</h3>
			<h4>Report Message: {props.report.message}</h4>
			<Link to={`/dashboard/reports/${props.report.id}`}>Respond</Link>
			<br/>
			<Link to={`/dashboard/editreport/${props.report.id}`}>Edit</Link> 
		</div>
	);
};

export default SingleReport;
