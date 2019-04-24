import React from "react";

const CreateReport = () => {
	return (
		<div>
			<h3>MANAGER PAGE ONLY</h3>
			<ul>
				<li>FEATURE: Manger can create report</li>
				<li>FEATURE: add team members</li>
			</ul>
			<h3>What this component NEEDS</h3>
			<ul>
				<li>reportName Str</li>
				<li>reportTypeId Str</li>
				<li>teamId Str</li>
				<li>schedule stringified arr</li>
				<li>scheduleTime num</li>
				<li>***reocurring ???***</li>
				<li>message Str</li>
				<li>reminder boolean</li>
				<li>responseTimeLimit num</li>
			</ul>
			Inputs for Title Questions Schedule Response Broadcast
		</div>
	);
};

export default CreateReport;
