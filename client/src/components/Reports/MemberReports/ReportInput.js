import React from 'react';

const ReportInput = props => {
	// console.log(props);
	return (
		<div>
			<h4>{props.question.question}</h4>
			<input
				onChange={e => props.handleChange(e, props.question.question)}
				name={`answer`}
				placeholder="Type your answer here..."
				value={props.response}
			/>
		</div>
	);
};

export default ReportInput;
