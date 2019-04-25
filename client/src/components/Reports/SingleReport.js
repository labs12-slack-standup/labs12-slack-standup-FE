import React from "react";
import { Link } from "react-router-dom";

const SingleReport = () => {
	return (
		<div>
			Redirect for manager or team member
			<Link to="/dashboard/report/manager">
				<button>Manager View</button>
			</Link>
			<Link to="/dashboard/report/teammember">
				<button>Team Member View</button>
			</Link>
		</div>
	);
};

export default SingleReport;
