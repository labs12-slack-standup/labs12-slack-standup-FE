import React, { Component } from 'react';
import { axiosWithAuth, baseURL } from '../../../config/axiosWithAuth';

class ReportResults extends Component {
	state = {
		responses: []
	};

	render() {
		// console.log(this.state.responses);
		if (!this.state.responses || this.state.responses.length < 1) {
			return <div>No Responses.</div>;
		}
		return (
			<div>
				{this.state.responses.map(response => (
					<div key={response.userId}>
						<h3>{response.fullName}</h3>
						{response.questions.map(({ question, answer }) => (
							<div>
								<p>{question}</p>
								<p>{answer}</p>
							</div>
						))}
					</div>
				))}
			</div>
		);
	}

	componentDidMount() {
		axiosWithAuth()
			.get(`${baseURL}/responses/${this.props.match.params.reportId}`)
			.then(res => this.setState({ responses: res.data.membersArray }))
			.catch(err => console.log(err));
	}
}

export default ReportResults;
