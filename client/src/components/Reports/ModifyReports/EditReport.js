import React, { Component } from 'react';

class EditReport extends Component {
	state = {
		//haven't thought this out much but needs somehwere to store edits to questions
		question1: '',
		question2: '',
		question3: '',
		reportName: ''
	};

	//changehandlers for ERRRRRYONE

	render() {
		return (
			<div>
				<ul>
					Component Needs:
					<li>Report name</li>
					<li>Questions</li>
					<li>Parameterics for report</li>
				</ul>
			</div>
		);
	}
}

export default EditReport;
