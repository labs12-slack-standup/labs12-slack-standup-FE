import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SingleReport from './SingleReport';
import { axiosWithAuth, baseURL } from '../../config/axiosWithAuth';

// SAME AS SURVEY LIST ON WIREFRAME

class Reports extends Component {
	state = {
		message: '',
		reports: []
	};

	componentDidMount() {
		// call to get reports and stick them in state
		const endpoint = `${baseURL}/reports/`;
		axiosWithAuth()
			.get(endpoint)
			.then(res =>
				this.setState({
					message: res.data.message,
					reports: res.data.reports
				})
			)
			.catch(err => console.log(err));
	}

	render() {
		if (this.state.reports.length < 1) {
			return (
				<div>
					<h2>
						You have not created any reports
					</h2>
					<Link to="/dashboard/createreport">
						<button>Create Report</button>
					</Link>
				</div>
			);
		}
		return (
			<div>
				Reports:
				<div>
					{/* passing reports from state to individual components */}
					{this.state.reports.map(report => (
						<Link
							key={report.id}
							to={`/reports/${
								report.id
							}`}
						>
							<SingleReport
								key={report.id}
								report={report}
							/>
						</Link>
					))}
					{/* List of all reports here...will map over
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
				</div> */}
					<h2>This component needs access to:</h2>
					<ul>
						<li>
							QUERY: all reports by
							teamId
						</li>
						<li>
							Report Name, schedule,
							team member list,
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default Reports;
