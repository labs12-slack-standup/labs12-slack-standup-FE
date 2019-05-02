import React, { Component } from 'react';
import axiosWithAuth from '../../../config/axiosWithAuth';

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
		console.log(updateQuestion);
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
			sceduleTime: this.state.scheduleTime,
			recurring: this.state.recurring,
			message: this.state.message,
			responseTimeLimit: this.state.responseTimeLimit
		};
		const endpoint =
			'https://master-slack-standup.herokuapp.com/api/report';
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
					{days.map(day => (
						<>
							<input
								type="checkbox"
								onChange={
									this
										.updateSchedule
								}
								name={day}
								id={day}
							/>
							<label htmlfor="day">
								{day}
							</label>
						</>
					))}
					{this.state.questions.map(question => (
						<div>
							{question}
							<button
								onClick={
									this
										.removeQuestions
								}
							>
								X
							</button>
						</div>
					))}
					<form name="addQuestionForm">
						<input
							type="text"
							onChange={
								this
									.changeHandler
							}
							name="singleQuestion"
							placeholder="insert new question"
						/>
						<button
							onClick={
								this
									.questionsHandler
							}
						>
							Add Question to Report
						</button>
					</form>
					<input
						type="time"
						onChange={this.changeHandler}
						name="scheduleTime"
					/>
				</form>
				<button onClick={this.addReport}>
					Create Report
				</button>
				<h3>MANAGER PAGE ONLY</h3>
				<ul>
					<li>
						FEATURE: Manger can create
						report
					</li>
					<li>FEATURE: add team members</li>
				</ul>
				<h3>What this component NEEDS</h3>
				<ul>
					{/* NAME */}
					<li>reportName Str</li>
					{/* TYPE OF REPORT */}
					<li>reportTypeId Str</li>
					{/* TEAM ID */}
					<li>teamId Str</li>
					{/* WHAT DAYS ARE THE REPORTS GOING TO BE SENT OUT */}
					<li>schedule stringified arr</li>
					{/* WHAT TIME ARE THE REPORTS GOING TO BE SENT OUT */}
					<li>scheduleTime num</li>
					{/* HOW OFTEN WILL THIS BE REPEATED */}
					<li>reocurring str</li>
					{/* MESSAGE TO BE SENT WITH EACH REPORT */}
					<li>message Str</li>
					{/* WILL THE TEAM MEMBER BE REMINDED THAT THE REPORT IS SENT? */}
					<li>reminder boolean</li>
					{/* HOW LONG WILL THE USER HAVE TO RESPOND? */}
					<li>responseTimeLimit num</li>
				</ul>
				Inputs for Title Questions Schedule Response
				Broadcast
			</div>
		);
	}
}

export default CreateReport;
