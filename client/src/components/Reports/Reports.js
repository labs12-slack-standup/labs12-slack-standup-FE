import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SingleReport from './SingleReport';
// SAME AS SURVEY LIST ON WIREFRAME

class Reports extends Component {
	state = {
		reports: []
	};

	componentDidMount() {
		// call to get reports and stick them in state
		//with new enponit I imagine it'll be something like
		//const userID = user.userID <= not sure where we are storing that
		//const endpoint = `url/${userID}`
		const endpoint =
			'https://master-slack-standup.herokuapp.com/api/reports';
		axios.get(endpoint)
			.then(res =>
				this.setState({
					reports: res.data.reports
				})
			)
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div>
				Reports:
				<div>
					{/* passing reports from state to individual components */}
					{this.state.reports.map(report => (
						<SingleReport report={report} />
					))}
					List of all reports here...will map over
					the report list for teamId
					<br />
					CONDITIONAL: If the user is a manager,
					they will see the analytics. If user is
					a team member, they will see 1 of 2
					buttons <br />
					<Link to="/dashboard/singlereport">
						<button>Single Report</button>
					</Link>
					<div>
						CONDITONAL: Submit Response if
						not yet responsed, otherwise
						view responses
						<Link to="/dashboard/responseform">
							<button>
								Submit Response
							</button>
						</Link>
						or
						<Link to="/dashboard/reportresults">
							<button>
								View Report
								Results
							</button>
						</Link>
					</div>
					<br />
					<Link to="/dashboard/singlereport">
						<button>Single Report</button>
					</Link>
					<div>
						CONDITONAL: Submit Response if
						not yet responsed, otherwise
						view responses
						<Link to="/dashboard/responseform">
							<button>
								Submit Response
							</button>
						</Link>
						<Link to="/dashboard/reportresults">
							<button>
								View Report
								Results
							</button>
						</Link>
					</div>
					<Link to="/dashboard/singlereport">
						<button>Single Report</button>
					</Link>
					<div>
						CONDITONAL: Submit Response if
						not yet responsed, otherwise
						view responses
						<Link to="/dashboard/responseform">
							<button>
								Submit Response
							</button>
						</Link>
						<Link to="/dashboard/reportresults">
							<button>
								View Report
								Results
							</button>
						</Link>
					</div>
					<br />
				</div>
				<h2>This component needs access to:</h2>
				<ul>
					<li>QUERY: all reports by teamId</li>
					<li>
						Report Name, schedule, team
						member list,
					</li>
				</ul>
			</div>
		);
	}
}

export default Reports;
