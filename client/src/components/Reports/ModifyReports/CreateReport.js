import React, { Component } from 'react';
import { axiosWithAuth, baseURL } from '../../../config/axiosWithAuth';
import { getHours } from 'date-fns';
import { HTMLSelect } from '@blueprintjs/core';
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
import { TimePicker } from 'material-ui-pickers';
import Slack from '../../Slack/Slack';
import { getMinutes } from 'date-fns/esm';
class CreateReport extends Component {
	state = {
		// Main Report State
		reportName: '',
		schedule: [],
		scheduleTime: new Date('2000-01-01T18:00:00'),
		timePickDate: new Date('2000-01-01T18:00:00'),
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

	timeChangeHandler = date => {
		const hours = getHours(date);
		const min = getMinutes(date);
		const militaryTime = `${hours}:${min}`;

		this.setState({
			scheduleTime: militaryTime,
			timePickDate: date
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
			<div className="create-report">
				<Fab onClick={() => this.props.history.goBack()} color="default">
					<Icon>arrow_back</Icon>
				</Fab>
				<form className="create-report">
					<Card raised={true} className="schedule-card">
						<section className="schedule-card-content">
							<h3 className="schedule-title">Report Information</h3>
							<Divider className="divider" variant="fullWidth" />
							{this.state.channels.length < 1 ? (
								<div>
									<h3>Authorize Slack to chose a channel for distribution:</h3>
									<Slack />
								</div>
							) : null}
							<section>
								<FormControl className="report-name report-margin" required>
									<InputLabel htmlFor="report-name">Report Name</InputLabel>
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
								<p>Slack Channel</p>
								<HTMLSelect
									className="slack-dropdown"
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
									<InputLabel htmlFor="report-message">
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
								<TimePicker
									label="Schedule Time"
									name="scheduleTime"
									value={this.state.timePickDate}
									minutesStep={30}
									onChange={this.timeChangeHandler}
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
									<InputLabel htmlFor="report-question">
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
						</section>
						<section className="schedule-card-content">
							<h3 className="schedule-title">Submit Report</h3>
							<Divider className="divider" variant="fullWidth" />
							<FormControl>
								<Button
									style={{ display: 'block', marginTop: '30px' }}
									variant="contained"
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
			</div>
		);
	}
}

export default CreateReport;
