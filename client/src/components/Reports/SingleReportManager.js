import React from "react";
import { Link, Route } from "react-router-dom";

// IN WIREFRAME THIS IS SAME AS SURVEY LIST

const SingleReportManager = () => {
	return (
		<div>
			Display the reports for the team Button for Slack Connection Button to
			create new Report
			<Link to="/dashboard/createreport">
				<button>Create Report</button>
			</Link>
		</div>
	);
};

export default SingleReportManager;
