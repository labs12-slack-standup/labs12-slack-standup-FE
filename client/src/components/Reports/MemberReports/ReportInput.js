import React from 'react';
import TextField from "@material-ui/core/TextField";

const ReportInput = props => {
	console.log(props)
	return (
		<div className="member-report-input">
			<h4>{props.question}</h4>
			{/* <input
				onChange={e => props.handleChange(e, props.question)}
				name="response"
				placeholder="Type your answer here..."
				value={props.response}
			/> */}
				<TextField
					fullWidth={true}
					onChange={e => props.handleChange(e, props.question)}
					margin="normal"
					multiline={true}
					name="response"
					value={props.response}
					variant="outlined"
				/>
		</div>
	);
};

export default ReportInput;
