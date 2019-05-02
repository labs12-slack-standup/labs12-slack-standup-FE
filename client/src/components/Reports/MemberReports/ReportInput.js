
import React from 'react';

const ReportInput = props => (
	<div>
		<h4>{props.question}</h4>
		<input
			onChange={e => props.handleChange(e, props.question)}
			name="answer"
			placeholder="Type your answer here..."
			value={props.response}
		/>
	</div >
)

export default ReportInput;
