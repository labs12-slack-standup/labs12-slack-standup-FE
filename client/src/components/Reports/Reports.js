import React from "react";
import { Link } from "react-router-dom";
// SAME AS SURVEY LIST ON WIREFRAME

const Reports = () => {
	return (
		<div>
			Reports:
			<div>
				List of all reports here...will map over the report list for teamId
				Within each Report there will be a
				<Link to="/dashboard/singlereport">
					<div>
						<button>Single Report</button>
						CONDITONAL: Submit Response if not yet responsed, otherwise view
						responses
						<Link to="/dashboard/submitresponse">
							<button>Submit Response</button>
						</Link>
					</div>
				</Link>
				<br />
				<Link to="/dashboard/singlereport">
					<div>
						<button>Single Report</button>
						CONDITONAL: Submit Response if not yet responsed, otherwise view
						responses
						<Link to="/dashboard/submitresponse">
							<button>Submit Response</button>
						</Link>
					</div>
				</Link>
				<br />
				<Link to="/dashboard/singlereport">
					<div>
						<button>Single Report</button>
						CONDITONAL: Submit Response if not yet responsed, otherwise view
						responses
						<Link to="/dashboard/submitresponse">
							<button>Submit Response</button>
						</Link>
					</div>
				</Link>
				<br />
			</div>
			<h2>This component needs access to:</h2>
			<ul>
				<li>QUERY: all reports by teamId</li>
				<li>Report Name, schedule, team member list,</li>
			</ul>
		</div>
	);
};

export default Reports;
