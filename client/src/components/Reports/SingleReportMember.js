import React from "react";
import ReportInput from "./MemberReports/ReportInput";
// import { Link, Route } from "react-router-dom";

const SingleReportMember = () => {
	const submitReportForm = () => {
		// REPORT INFO HERE
	};
	return (
		<div>
			<h3>Report Name</h3>
			<ul />
			<form
				onSubmit={e => {
					e.preventDefault();
					submitReportForm({
						variables: {}
					});
				}}
			>
				{/* INDIVIDUAL FORM SUBMISSIONS */}

				<ReportInput />
			</form>
		</div>
	);
};

export default SingleReportMember;
