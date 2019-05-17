import React, { Component } from 'react';
import { axiosWithAuth, baseURL } from '../../../config/axiosWithAuth';
import './Report.css';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';

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
									{day.charAt(0)}
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
									<Button
										style={{
											borderRadius: '50%',
											width: '40px',
											height: '40px',
											minWidth: '40px'
										}}
										color="primary"
										className="question-button"
										onClick={e => this.removeQuestion(e, question)}
									>
										X
									</Button>
								</article>
							))}
						</section>
						<section>
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
						<h3 className="schedule-title">Submit Updated Report</h3>
						<Divider className="divider" variant="fullWidth" />
						<Button
							style={{ display: 'block', marginTop: '30px' }}
							variant="outlined"
							color="primary"
							onClick={this.updateReport}
						>
							Update Report
						</Button>
					</section>
				</Card>
			</form>
		);
	}
}

export default EditReport;
