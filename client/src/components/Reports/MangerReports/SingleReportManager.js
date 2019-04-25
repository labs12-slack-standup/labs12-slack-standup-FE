import React from "react";
import { Link } from "react-router-dom";

// IN WIREFRAME THIS IS SAME AS SURVEY LIST

const SingleReportManager = () => {
	return (
		<div>
			Display an individual report for the team Button for Slack Connection
			<Link to="/dashboard/editreport">
				<button>Edit Report</button>
			</Link>
		</div>
	);
};

export default SingleReportManager;
