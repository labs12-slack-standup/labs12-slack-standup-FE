import React, { Component } from 'react';
import ReportInput from './ReportInput';
import axios from 'axios';

class MemberResponseForm extends Component {
	state = {
		clientInfo: '',
		reportName: '',
		reportMessage: '',
		questions: []
	};

	render() {
		return this.state.clientInfo.length > 0 ? (
			<>
				<div>{this.state.clientInfo}</div>
				{setTimeout(() => {
					this.props.history.push('/dashboard/reports');
				}, 3000)}
			</>
		) : (
			<div>
				<h1>{this.state.reportName}</h1>
				<p>{this.state.reportMessage}</p>
				{this.state.questions.map((q, i) => (
					<ReportInput
						question={q.question}
						response={q.response}
						handleChange={this.handleChange}
						key={i}
					/>
				))}
				<button onClick={this.submitReport}>Submit</button>
			</div>
		);
	}

	componentDidMount() {
		const endpoint =
			// 'https://master-slack-standup.herokuapp.com/api/reports';
			`http://localhost:5000/api/reports/${this.props.match.params.reportId}`;
		axios
			.get(endpoint)
			.then(res => {
				const { reportName, message, questions } = res.data.report;
				this.setState({
					reportName,
					reportMessage: message,
					questions: questions.map(q => ({
						question: q.question,
						response: ''
					}))
				});
			})
			.catch(err => console.log(err));
	}

	handleChange = (e, question) => {
		const qObj = { question, response: e.target.value };
		this.setState(prevState => ({
			...prevState,
			questions: prevState.questions.map(q =>
				q.question !== question ? q : qObj
			)
		}));
	};

	submitReport = () => {
		const endpoint =
			// 'https://master-slack-standup.herokuapp.com/api/reports';
			`http://localhost:5000/api/responses/${this.props.match.params.reportId}`;
		axios
			.post(endpoint, this.state.questions)
			.then(res => {
				this.setState(prevState => ({
					...prevState,
					questions: prevState.questions.map(q => ({
						question: q.question,
						response: ''
					})),
					clientInfo: res.data.message
				}));
			})
			.catch(err => console.log(err));
	};
}

export default MemberResponseForm;
