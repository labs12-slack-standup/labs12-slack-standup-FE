import React, { Component } from 'react';

class CreateReport extends Component {
	state = {
		reportName: '',
		reportTypeId: '',
		teamId: '',
		schedule: [],
		scheduleTime: null,
		reocurring: '',
		message: '',
		reminder: null,
		responseTimeLimit: null
		//need placeholders for question inputs.
	};


	render() {
		return (
			<div>
				<h3>MANAGER PAGE ONLY</h3>
				<ul>
					<li>
						FEATURE: Manger can create
						report
					</li>
					<li>FEATURE: add team members</li>
				</ul>
				<h3>What this component NEEDS</h3>
				<ul>
					{/* NAME */}
					<li>reportName Str</li>
					{/* TYPE OF REPORT */}
					<li>reportTypeId Str</li>
					{/* TEAM ID */}
					<li>teamId Str</li>
					{/* WHAT DAYS ARE THE REPORTS GOING TO BE SENT OUT */}
					<li>schedule stringified arr</li>
					{/* WHAT TIME ARE THE REPORTS GOING TO BE SENT OUT */}
					<li>scheduleTime num</li>
					{/* HOW OFTEN WILL THIS BE REPEATED */}
					<li>reocurring str</li>
					{/* MESSAGE TO BE SENT WITH EACH REPORT */}
					<li>message Str</li>
					{/* WILL THE TEAM MEMBER BE REMINDED THAT THE REPORT IS SENT? */}
					<li>reminder boolean</li>
					{/* HOW LONG WILL THE USER HAVE TO RESPOND? */}
					<li>responseTimeLimit num</li>
				</ul>
				Inputs for Title Questions Schedule Response
				Broadcast
			</div>
		);
	}
}

export default CreateReport;
