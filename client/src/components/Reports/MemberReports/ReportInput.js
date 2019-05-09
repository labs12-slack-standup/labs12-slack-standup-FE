import React from 'react';

const ReportInput = props => {
	return (
		<div>
			<h4>{props.question}</h4>
			<input
				onChange={e => props.handleChange(e, props.question)}
				name="response"
				placeholder="Type your answer here..."
				value={props.response}
			/>
		</div>
	);
};

export default ReportInput;
