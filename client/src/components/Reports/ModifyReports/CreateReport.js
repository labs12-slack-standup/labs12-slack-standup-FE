import React, { Component } from 'react';

import {axiosWithAuth, baseURL} from '../../../config/axiosWithAuth';
import moment from 'moment'


class CreateReport extends Component {
	state = {
		reportName: '',
		schedule: [],
		scheduleTime: null,
		recurring: '',
		message: '',
		responseTimeLimit: null,
		questions: [],
		singleQuestion: ''

	};
	// schedule and questions are arrays in state but need to be stringified when posting
	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	questionsHandler = e => {
		e.preventDefault();
		const updateQuestion = [...this.state.questions];
		updateQuestion.push(this.state.singleQuestion);
		// console.log(updateQuestion);
		this.setState({ questions: updateQuestion });
		this.setState({ singleQuestion: '' });
		document.addQuestionForm.reset();
	};
	// function for removing Questions from array before submitting them to create a team
	removeQuestions = idx => {
		const updateQuestion = [...this.state.questions].filter(
			(item, idx) => idx !== idx
		);
		this.setState({
			questions: updateQuestion
		});
	};
	
	updateSchedule = e => {
		const updatedSchedule = [...this.state.schedule];
		updatedSchedule.push(e.target.name);
		this.setState({ schedule: updatedSchedule });
	};
	//create report - axios post request
	addReport = () => {
		const stringifiedSched = JSON.stringify(this.state.schedule);
		const stringifiedQs = JSON.stringify(this.state.questions);
		const report = {
			reportName: this.state.reportName,
			schedule: stringifiedSched,
			questions: stringifiedQs,
			scheduleTime: this.state.scheduleTime,
			recurring: this.state.recurring,
			message: this.state.message,
			responseTimeLimit: this.state.responseTimeLimit,
			created_at: moment().format()
		};
		console.log(report);
		const endpoint = `${baseURL}/reports`;
		axiosWithAuth()
			.post(endpoint, report)
			.then(res => console.log(res))
			.catch(err => console.log(err));
	};


	render() {
		const days = [
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
			'Sunday'
		];

		return (
			<div>
				<h3>New Report</h3>
				<div>Report Name:</div>
				<form>
					<input
						type="text"
						onChange={this.changeHandler}
						name="reportName"
						placeholder="report name"
					/>
					<input
						type="text"
						onChange={this.changeHandler}
						name="message"
						placeholder="Message to be sent with each report"
					/>
					{days.map((day, idx) => (
						<div key={idx}>
							<input
								type="checkbox"
								onChange={this.updateSchedule}
								name={day}
								id={day}
							/>
							<label htmlFor="day">{day}</label>
						</div>
					))}
					{this.state.questions.map((question, idx) => (
						<div key={idx}>
							{question}
							<button onClick={this.removeQuestions}>X</button>
						</div>
					))}
					<form name="addQuestionForm">
						<input
							type="text"
							onChange={this.changeHandler}
							name="singleQuestion"
							placeholder="insert new question"
						/>
						<button onClick={this.questionsHandler}>
							Add Question to Report
						</button>
					</form>
					<input
						type="time"
						onChange={this.changeHandler}
						name="scheduleTime"
					/>
				</form>
				<button onClick={this.addReport}>Create Report</button>
			</div>
		);
	}
}

export default CreateReport;
