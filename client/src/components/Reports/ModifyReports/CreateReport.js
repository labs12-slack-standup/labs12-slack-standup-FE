import React, { Component } from 'react';

import { axiosWithAuth, baseURL } from '../../../config/axiosWithAuth';
import moment from 'moment';
// import { format, endOfDay, addDays, addHours, addMinutes } from 'date-fns';
import {Link} from 'react-router-dom'

class CreateReport extends Component {
	state = {
		reportName: '',
		schedule: [],
		scheduleTime: null,
		recurring: '',
		message: '',
		channels: [],
		responseTimeLimit: null,
		singleDay: false,
		responseNum: '',
		responseDistance: 'minute',
		questions: [],
		singleQuestion: '',
		channelSelected: ''
	};

	componentDidMount() {
		const endpoint = `${baseURL}/slack/channels`;
		axiosWithAuth()
			.get(endpoint)
			.then(res => {
				this.setState({
					channels: res.data,
					channelSelected: res.data[0].id || ''
				})
			})
			.catch(err => console.log(err));
	}

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
		// Time limit is a data that restricts how long a member can respond to a report
		// If the manager has set the time limit to the end of the day, use endOfDay from date-fns to format the end of day
		// Otherwise,
		// const formatedTimeLimit = this.state.singleDay
		// 	? endOfDay(new Date(moment().format()))
		// 	: this.state.responseDistance === 'minute'
		// 	? addMinutes(new Date(moment().format()), this.state.responseNum)
		// 	: this.state.responseDistance === 'hour'
		// 	? addHours(new Date(moment().format()))
		// 	: this.state.responseDistance === 'day'
		// 	? addDays(new Date(moment().format()))
		// 	: null;

		let selectedChannelName;
		this.state.channels.forEach(channel => {
			if (channel.id === this.state.channelSelected) {
				selectedChannelName = channel.name
			}
		});

		const report = {
			reportName: this.state.reportName,
			schedule: stringifiedSched,
			questions: stringifiedQs,
			scheduleTime: this.state.scheduleTime,
			recurring: this.state.recurring,
			message: this.state.message,
			created_at: moment().format(),
			slackChannelName: selectedChannelName,
			slackChannelId: this.state.channelSelected
		};
		console.log(report);
		const endpoint = `${baseURL}/reports`;
		axiosWithAuth()
			.post(endpoint, report)
			.then(res => console.log(res))
			.catch(err => console.log(err));
	};

	render() {
		// console.log(this.state.responseDistance);
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
					<select
						name="channelSelected"
						onChange={this.changeHandler}
					>
						{
							this.state.channels.map(channel => (
								<option key={channel.id} value={channel.id}>{channel.name}</option>
							))
						}
					</select>
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
					<br />
					<input
						type="time"
						onChange={this.changeHandler}
						name="scheduleTime"
					/>
					{/* <div>Allow Responses For:</div>
					<div>
						Until the end of the day
						<input
							type="checkbox"
							onChange={() =>
								this.setState({ singleDay: !this.state.singleDay })
							}
						/>
						<div>
							Change Manually:
							<input
								type="number"
								name="responseNum"
								onChange={this.changeHandler}
								max="100"
								min="1"
							/>
							<form>
								<select name="responseDistance" onChange={this.changeHandler}>
									<option value="minute">minute(s)</option>
									<option value="hour">hour(s)</option>
									<option value="day">day(s)</option>
								</select>
							</form>
						</div>
					</div> */}
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
					
				</form>
				<Link to="/dashboard/reports">
					<button onClick={this.addReport}>Create Report</button>
				</Link>
			</div>
		);
	}
}

export default CreateReport;
