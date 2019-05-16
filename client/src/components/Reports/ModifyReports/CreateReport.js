import React, { Component } from 'react';
import { axiosWithAuth, baseURL } from '../../../config/axiosWithAuth';
import { getHours } from 'date-fns';
import { FormGroup, HTMLSelect, InputGroup } from '@blueprintjs/core';
import './Report.css';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';

class CreateReport extends Component {
	state = {
		// Main Report State
		reportName: '',
		schedule: [],
		scheduleTime: `${getHours(new Date()) + 1}:00`,
		message: '',
		questions: [],
		slackChannelId: null,
		// Temporary State
		channels: [],
		question: '',
		week: [
			'Monday',
			'Tueday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
			'Sunday'
		]
	};

	componentDidMount() {
		this.fetchSlackChannels();
	}

	changeHandler = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	fetchSlackChannels = () => {
		const endpoint = `${baseURL}/slack/channels`;
		axiosWithAuth()
			.get(endpoint)
			.then(res => {
				this.setState({
					channels: res.data,
					slackChannelId: res.data[0].id || ''
				});
			})
			.catch(err => {
				console.log(err.response.data);
			});
	};

	enterQuestionsHandler = e => {
		e.preventDefault();
		const code = e.keyCode || e.which;
		if (code === 13) {
			this.setState(prevState => ({
				questions: [...prevState.questions, this.state.question],
				question: ''
			}));
		} else {
			this.setState({
				[e.target.name]: e.target.value
			});
		}
	};

	questionsHandler = e => {
		e.preventDefault();
		this.setState(prevState => ({
			questions: [...prevState.questions, this.state.question],
			question: ''
		}));
	};

	removeQuestion = (e, question) => {
		e.preventDefault();
		this.setState(prevState => ({
			questions: prevState.questions.filter(q => q !== question)
		}));
	};

	updateSchedule = day => {
		const { schedule } = this.state;
		const includes = schedule.includes(day);
		this.setState({
			schedule: includes ? schedule.filter(d => d !== day) : [...schedule, day]
		});
	};

	addReport = e => {
		e.preventDefault();
		let slackChannelName;
		this.state.channels.forEach(channel => {
			if (channel.id === this.state.slackChannelId)
				slackChannelName = channel.name;
		});
		const {
			reportName,
			schedule,
			scheduleTime,
			message,
			questions,
			slackChannelId
		} = this.state;
		const report = {
			reportName,
			schedule: JSON.stringify(schedule),
			scheduleTime,
			message,
			questions: JSON.stringify(questions),
			slackChannelId,
			slackChannelName,
			created_at: new Date()
		};
		const endpoint = `${baseURL}/reports`;
		axiosWithAuth()
			.post(endpoint, report)
			.then(res => {
				this.props.setResponseAsState(res.data);

				this.props.history.push('/dashboard');
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<form className="create-report">
				<Card raised={true} className="schedule-card">
					<section className="schedule-card-content">
						<h3 className="schedule-title">Report Information</h3>
						<section>
							<FormControl className="report-name" required>
								<InputLabel
									htmlFor="report-name"
									style={{
										color: blue[500],
										root: {
											'&$cssFocused': {
												color: blue[500]
											}
										},
										focused: {}
									}}
								>
									Report Name
								</InputLabel>
								<Input
									id="report-name"
									className="input-field"
									required
									type="text"
									onChange={this.changeHandler}
									name="reportName"
									placeholder="Report Name"
									value={this.state.reportName}
								/>
							</FormControl>
							<HTMLSelect
								name="slackChannelId"
								onChange={this.changeHandler}
								label="Slack Channel for Distribution"
							>
								<option>Choose a Slack Channel for distribution...</option>
								{this.state.channels.map(channel => (
									<option key={channel.id} value={channel.id}>
										{channel.name}
									</option>
								))}
							</HTMLSelect>
						</section>
						<section>
							<FormControl className="input-field" required>
								<InputLabel
									htmlFor="report-message"
									style={{
										color: blue[500],
										root: {
											'&$cssFocused': {
												color: blue[500]
											}
										},
										focused: {}
									}}
								>
									Report Message
								</InputLabel>
								<Input
									required
									className="input-field"
									id="report-message"
									type="textarea"
									onChange={this.changeHandler}
									name="message"
									placeholder="Message to be sent with each report"
									value={this.state.message}
								/>
							</FormControl>
						</section>
					</section>
				</Card>
				<Card raised={true} className="schedule-card">
					<section className="schedule-card-content">
						<h3 className="schedule-title">Schedule</h3>
						<p>Days of the week for report delivery</p>
						<section className="days-flex">
							{this.state.week.map(day => (
								<div
									key={day}
									onClick={e => this.updateSchedule(day)}
									className={`day ${
										this.state.schedule.includes(day) ? 'selected' : ''
									}`}
								>
									{day.charAt(0)}
								</div>
							))}
						</section>
						<p>Time each day for report delivery</p>
						<section>
							<Input
								type="time"
								className="report-time"
								onChange={this.changeHandler}
								name="scheduleTime"
								step="1800"
								value={this.state.scheduleTime}
							/>
						</section>
					</section>
				</Card>
				<Card raised={true} className="schedule-card">
					<section className="schedule-card-content">
						<h3 className="schedule-title">Questions</h3>
						<p>Questions to be sent out for this report</p>
						<section>
							{this.state.questions.map(question => (
								<article className="question-flex" key={question}>
									<p className="question">{question}</p>
									<Button
										style={{
											borderRadius: '50%',
											width: '40px',
											height: '40px',
											minWidth: '40px'
										}}
										className="question-button"
										onClick={e => this.removeQuestion(e, question)}
									>
										X
									</Button>
								</article>
							))}
						</section>
						<section>
							<FormControl className="" required>
								<InputLabel
									htmlFor="report-question"
									style={{
										color: blue[500],
										root: {
											'&$cssFocused': {
												color: blue[500]
											}
										},
										focused: {}
									}}
								>
									Enter a question...
								</InputLabel>
								<Input
									id="report-question"
									required
									className="input-field"
									type="text"
									name="question"
									placeholder="Ask a question..."
									value={this.state.question}
									onChange={this.enterQuestionsHandler}
									required
								/>
							</FormControl>
							<Button
								className="button-block"
								style={{ display: 'block', margin: '10px 0' }}
								variant="outlined"
								color="primary"
								onClick={this.questionsHandler}
								disabled={this.state.question.length === 0 ? true : false}
								type="submit"
							>
								Add Question to Report
							</Button>
						</section>
					</section>
				</Card>
				<Card raised={true} className="schedule-card">
					<section className="schedule-card-content">
						<h3 className="schedule-title">Submit Report</h3>
						<FormControl>
							<Button
								variant="outlined"
								color="primary"
								onClick={this.addReport}
								disabled={this.state.questions.length === 0 ? true : false}
							>
								Create Report
							</Button>
						</FormControl>
					</section>
				</Card>
			</form>
		);
	}
}

export default CreateReport;
