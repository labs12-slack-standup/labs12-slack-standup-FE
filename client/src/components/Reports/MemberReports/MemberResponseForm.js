import React from 'react';
import ReportInput from './ReportInput';

import React, { Component } from 'react';

class MemberResponseForm extends Component {
	state = {
		questions: []
	};

	componentDidMount() {
		//load questions to state
	}

	render() {
		return (
			<div>
				{/* seems like this could be a map of the array of questions associated with a given report, feeding them into <ReportInput/> */}
				<h3>This component will be a form</h3>
				<ul>
					<li>
						Questions and Report Title given
						by manager
					</li>
					<li>Form entries</li>
					<li>
						Will query the questions table
						by reportId
					</li>
					<li>
						On sumbit will mutate the
						questions table (only the
						answers)
					</li>
				</ul>
			</div>
		);
	}
}

export default MemberResponseForm;
