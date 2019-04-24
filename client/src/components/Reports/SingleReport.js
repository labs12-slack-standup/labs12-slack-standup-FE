import React from "react";
import { Link, Route } from "react-router-dom";

const SingleReport = () => {
	return (
		<div>
			Redirect for manager or team member
			<Link to="/dashboard/manager">
				<button>Manager View</button>
			</Link>
			<Link to="/dashboard/teammember">
				<button>Team Member View</button>
			</Link>
		</div>
	);
};

export default SingleReport;
