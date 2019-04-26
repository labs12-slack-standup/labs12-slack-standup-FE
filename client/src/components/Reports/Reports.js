import React, { Component } from 'react';
import { Link } from "react-router-dom";
// SAME AS SURVEY LIST ON WIREFRAME


class Reports extends Component {
	state = {
		reports: []
	}

	componentDidMount() {
		// call to get reports and stick thm in state
	}
	
	
	render() {
		return (
			<div>
				Reports:
			<div>
				List of all reports here...will map over the report list for teamId
				<br />
				CONDITIONAL: If the user is a manager, they will see the analytics. If
				user is a team member, they will see 1 of 2 buttons <br />
				<Link to="/dashboard/singlereport">
					<button>Single Report</button>
				</Link>
				<div>
					CONDITONAL: Submit Response if not yet responsed, otherwise view
					responses
					<Link to="/dashboard/responseform">
						<button>Submit Response</button>
					</Link>
					or
					<Link to="/dashboard/reportresults">
						<button>View Report Results</button>
					</Link>
				</div>
				<br />
				<Link to="/dashboard/singlereport">
					<button>Single Report</button>
				</Link>
				<div>
					CONDITONAL: Submit Response if not yet responsed, otherwise view
					responses
					<Link to="/dashboard/responseform">
						<button>Submit Response</button>
					</Link>
					<Link to="/dashboard/reportresults">
						<button>View Report Results</button>
					</Link>
				</div>
				<Link to="/dashboard/singlereport">
					<button>Single Report</button>
				</Link>
				<div>
					CONDITONAL: Submit Response if not yet responsed, otherwise view
					responses
					<Link to="/dashboard/responseform">
						<button>Submit Response</button>
					</Link>
					<Link to="/dashboard/reportresults">
						<button>View Report Results</button>
					</Link>
				</div>
				<br />
			</div>
			<h2>This component needs access to:</h2>
			<ul>
				<li>QUERY: all reports by teamId</li>
				<li>Report Name, schedule, team member list,</li>
			</ul>
			</div>
		);
	}
}



export default Reports;
