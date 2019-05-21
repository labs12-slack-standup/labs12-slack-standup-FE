import React, { Component } from 'react';
import { axiosWithAuth, baseURL } from '../../../config/axiosWithAuth';
import './Report.css';

import {
	Card,
	Button,
	Divider,
	Input,
	InputLabel,
	FormControl,
	Fab,
	Icon
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import blue from '@material-ui/core/colors/blue';

class EditReport extends Component {
	state = {
		// Main Report State
		reportName: '',
		schedule: [],
		scheduleTime: '',
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
		const endpoint = `${baseURL}/reports/${this.props.match.params.reportId}`;
		axiosWithAuth()
			.get(endpoint)
			.then(res => {
				const {
					reportName,
					schedule,
					scheduleTime,
					message,
					questions,
					slackChannelId
				} = res.data.report;
				this.setState({
					reportName,
					schedule,
					scheduleTime,
					message,
					questions,
					slackChannelId
				});
			})
			.catch(err => {
				console.log(err);
			});
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
					channels: res.data
				});
			})
			.catch(err => console.log(err));
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

	updateReport = e => {
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
			slackChannelName
		};
		const endpoint = `${baseURL}/reports/${this.props.match.params.reportId}`;
		axiosWithAuth()
			.put(endpoint, report)
			.then(res => {
				this.props.setResponseAsState(res.data);
				this.props.history.push('/dashboard');
			})
			.catch(err => console.log(err));
	};

	render() {
		return (
			<div className="create-report">
				<Fab onClick={() => this.props.history.goBack()} color="default">
					<Icon>arrow_back</Icon>
				</Fab>
				<form className="edit-report">
					<Card raised={true} className="schedule-card">
						<section className="schedule-card-content">
							<h3 className="schedule-title">Report Information</h3>
							<Divider className="divider" variant="fullWidth" />
							<FormControl className="report-name report-margin" required>
								<InputLabel
									htmlFor="edit-report-name"
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
									id="edit-report-name"
									className="input-field top-input"
									required
									type="text"
									onChange={this.changeHandler}
									name="reportName"
									placeholder="Report Name"
									value={this.state.reportName}
								/>
							</FormControl>
							{this.state.slackChannelId ? (
								<div>
									<p>Slack Channel</p>
									<select
										className="slack-dropdown"
										name="slackChannelId"
										onChange={this.changeHandler}
										value={this.state.slackChannelId}
									>
										{this.state.channels.map(channel => (
											<option key={channel.id} value={channel.id}>
												{channel.name}
											</option>
										))}
									</select>
								</div>
							) : null}
						</section>
						<section className="schedule-card-content">
							<FormControl className="input-field" required>
								<InputLabel
									htmlFor="edit-report-message"
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
									className="input-field margin-fix"
									id="edit-report-message"
									type="textarea"
									onChange={this.changeHandler}
									name="message"
									placeholder="Message to be sent with each report"
									value={this.state.message}
								/>
							</FormControl>
						</section>
					</Card>
					<Card raised={true} className="schedule-card">
						<section className="schedule-card-content">
							<h3 className="schedule-title">Schedule</h3>
							<Divider className="divider" variant="fullWidth" />
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
										{day.charAt(0) + day.charAt(1)}
									</div>
								))}
							</section>
							<p>Time each day for report delivery</p>
							<section>
								<Input
									type="time"
									className="margin-fix"
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
							<Divider className="divider" variant="fullWidth" />
							<p>Questions to be sent out for this report</p>
							<section>
								{this.state.questions.map(question => (
									<article className="question-flex" key={question}>
										<p className="question">{question}</p>
										<Fab
											size="small"
											color="secondary"
											onClick={e => this.removeQuestion(e, question)}
										>
											<Icon>delete_icon</Icon>
										</Fab>
									</article>
								))}
							</section>
							<section className="enter-question">
								<FormControl className="input-field" required>
									<InputLabel
										htmlFor="edit-report-question"
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
										id="edit-report-question"
										required
										className="input-field"
										type="text"
										name="question"
										placeholder="Ask a question..."
										value={this.state.question}
										onChange={this.enterQuestionsHandler}
									/>
								</FormControl>
								<Fab
									size="small"
									style={{ display: 'block', margin: '10px 0' }}
									color="primary"
									onClick={this.questionsHandler}
									disabled={this.state.question.length === 0 ? true : false}
									type="submit"
								>
									<AddIcon />
								</Fab>
							</section>
							<section>
								<h3 className="schedule-title">Submit Updated Report</h3>
								<Divider className="divider" variant="fullWidth" />
								<Button
									style={{ display: 'block', marginTop: '30px' }}
									variant="contained"
									color="primary"
									onClick={this.updateReport}
								>
									Update Report
								</Button>
							</section>
						</section>
					</Card>
				</form>
			</div>
		);
	}
}

export default EditReport;
