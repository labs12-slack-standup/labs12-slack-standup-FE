
import React, { Component } from 'react';

class ReportInput extends Component {
	state ={
		answer:''
	}

	//changehandler
	
	render() {
		return (
			<div>
				<h4>Question Title</h4>
			<input
				name="answer"
				// ref={node => (answer = node)}
				placeholder="Type your answer here..."
			/>
			</div>
		);
	}
}

export default ReportInput;
