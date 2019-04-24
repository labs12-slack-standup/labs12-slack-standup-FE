import React from "react";
import { Link, Route } from "react-router-dom";

const Reports = () => {
	return (
		<div>
			Reports:
			<div>
				List of all reports here...will map over the report list for teamId
				Within each Report there will be a
				<Link to="/dashboard/singlereport">
					<button>Single Report</button>
				</Link>
			</div>
		</div>
	);
};

export default Reports;
