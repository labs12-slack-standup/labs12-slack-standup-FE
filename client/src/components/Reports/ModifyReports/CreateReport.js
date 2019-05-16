import React, { Component } from 'react';
import { axiosWithAuth, baseURL } from '../../../config/axiosWithAuth';
import { getHours } from 'date-fns';
import { FormGroup, Button, HTMLSelect, InputGroup } from '@blueprintjs/core';
import './Report.css';

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
			<FormGroup>
				<section>
					<InputGroup
						type="text"
						onChange={this.changeHandler}
						name="reportName"
						placeholder="Report Name"
						value={this.state.reportName}
					/>
					<HTMLSelect name="slackChannelId" onChange={this.changeHandler} label="Slack Channel for Distribution">
          <option>Choose a Slack Channel for distribution...</option>
						{this.state.channels.map(channel => (
							<option key={channel.id} value={channel.id}>
								{channel.name}
							</option>
						))}

					</HTMLSelect>
				</section>
				<section>
					<InputGroup

						type="text"
						onChange={this.changeHandler}
						name="message"
						placeholder="Message to be sent with each report"
						value={this.state.message}
					/>
				</section>
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
				<section>
					<InputGroup
						type="time"
						onChange={this.changeHandler}
						name="scheduleTime"
						step="1800"
						value={this.state.scheduleTime}
					/>
				</section>
				<section>
					{this.state.questions.map(question => (
						<article className="question-flex" key={question}>
							<p className="question">{question}</p>
							<Button
								className="question-button"
								onClick={e => this.removeQuestion(e, question)}
							>
								X
							</Button>
						</article>
					))}
				</section>
				<section>
					<InputGroup
						type="text"
						onChange={e => {
							const { value } = e.target;
							this.setState({
								question: value
							});
						}}
						name="question"
						placeholder="Ask a question..."
						value={this.state.question}
					/>
					<Button onClick={this.questionsHandler}>
						Add Question to Report
					</Button>
				</section>
				<section>
					<Button onClick={this.addReport}>Create Report</Button>
				</section>
			</FormGroup>
		);
	}
}

export default CreateReport;
