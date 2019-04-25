import React from "react";
const ReportInput = () => {
	return (
		<>
			<h4>Question Title</h4>
			<input
				name="answer"
				// ref={node => (answer = node)}
				placeholder="Type your answer here..."
			/>
		</>
	);
};

export default ReportInput;
