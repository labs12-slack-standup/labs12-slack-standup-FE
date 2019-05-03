import React from 'react';
import { Link } from 'react-router-dom';

//firebase sending back a user object from auth - where are we storing that? Write a ternary based on user.role:
// user.role === manager ? show manager view : show teamMember view

//how are we accessing questions? User clicks into this report, if they're a team member they should be able to answer the questions that are provided. Does this need to be a stateful component? And if we query the questions table, how do we avoid populating with ALL questions that have this report id? I think we need an endpoint to make a query that says this:
// db('questions').where(reportId=reportId and answer = null)

const SingleReport = props => {
	return (
		<div>
			<h2>Report Name: {props.report.reportName}</h2>
			<h3>Report Created: {props.report.created_at}</h3>
			<h4>Report Message: {props.report.message}</h4>
		</div>
	);
};

export default SingleReport;
