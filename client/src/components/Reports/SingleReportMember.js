import React, { Component } from 'react';
import ReportInput from "./MemberReports/ReportInput";
// import { Link, Route } from "react-router-dom";


//not quite sure how this one was working so I just commented out the code from graphQL version> I think probably we need to load questions into state by querying report by userID then questions by reportID -- EK



class SingleReportMember extends Component {
	state = {

	}
	
	render() {
		return (
			<div>
				
			</div>
		);
	}
}

export default SingleReportMember;


// const SingleReportMember = () => {
// 	const submitReportForm = () => {
// 		// REPORT INFO HERE
// 	};
// 	return (
// 		<div>
// 			<h3>Report Name</h3>
// 			<ul />
// 			<form
// 				onSubmit={e => {
// 					e.preventDefault();
// 					submitReportForm({
// 						variables: {}
// 					});
// 				}}
// 			>
// 				{/* INDIVIDUAL FORM SUBMISSIONS */}
// 				{/* For each question, there should be a new ReportInput */}
// 				<ReportInput />
// 			</form>
// 		</div>
// 	);
// };

// export default SingleReportMember;
