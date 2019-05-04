import React, { Component } from 'react';
import { axiosWithAuth, baseURL } from '../../../config/axiosWithAuth';

class EditReport extends Component {
	state = {
		reportName: '',
		schedule: [],
		scheduleTime: '',
		recurring: '',
		message: '',
		responseTimeLimit: null,
		questions: [],
		editedQuestion: '',
		updatedSchedule: [],
		updatedName: '',
		updatedMessage: '',
		newQuestion:''
	};

	componentDidMount() {
		const { id } = this.props.match.params;

		axiosWithAuth()
			.get(`${baseURL}/reports/${id}`)
			.then(res => {
				console.log('report', res.data.report);
				this.setState({
					...res.data.report
				});
			})
			.catch(err => {
				console.log(err);
			});
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	removeQuestion = idx => {
		const updateQuestions = [...this.state.questions].filter(
			(item, idx) => idx !== idx
		);
		this.setState({
			questions: updateQuestions
		});
	};

	updateQuestions = (e, idx) => {
		e.preventDefault();
		let updatedQuestions = [...this.state.questions].filter(
			(question, idx) => idx !== idx
		);
		updatedQuestions.splice(idx, 1);
		updatedQuestions.push(this.state.editedQuestion);
		this.setState({
			questions: updatedQuestions
		});
	};

	addQuestion = e => {
		e.preventDefault();
		let updatedQuestions = [...this.state.questions];
		updatedQuestions.push(this.state.newQuestion);
		this.setState({
			questions: updatedQuestions
		});
	};

	addToNewSched = e => {
		const editedSchedule = [...this.state.updatedSchedule];
		editedSchedule.push(e.target.name);
		this.setState({ updatedSchedule: editedSchedule });
	};

	updateName = e => {
		e.preventDefault();
		const newName = this.state.updatedName;
		this.setState({
			reportName: newName
		});
	};

	updateMessage = e => {
		e.preventDefault();
		const newMessage = this.state.updatedMessage;
		this.setState({
			message: newMessage
		});
	};

	updateSchedule = e => {
		e.preventDefault();
		const newSched = [...this.state.updatedSchedule];
		this.setState({
			schedule: newSched
		});
	};
	updateReport = () => {
		const { id } = this.props.match.params;
		const stringifiedSched = JSON.stringify(this.state.schedule);
		const stringifiedQs = JSON.stringify(this.state.questions);

		const editedReport = {
			reportName: this.state.reportName,
			schedule: stringifiedSched,
			questions: stringifiedQs,
			message: this.state.message,
		}
		
		console.log(editedReport);
		const endpoint = `${baseURL}/reports/${id}`;
		axiosWithAuth()
			.put(endpoint, editedReport)
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
				<h2>Report Name: {this.state.reportName}</h2>
				{/* changehandler goes in here */}
				<form onSubmit={this.updateName}>
					<input
						type="text"
						name="updatedName"
						placeholder="Edit Report Name"
						onChange={this.changeHandler}
					/>
					<button>Change Name</button>
				</form>
				<h3>Message: {this.state.message}</h3>
				{/* changehandler goes in here */}
				<form onSubmit={this.updateMessage}>
					<input
						type="text"
						name="updatedMessage"
						placeholder="Edit Report Message"
						onChange={this.changeHandler}
					/>
					<button>Change Message</button>
				</form>
				<h3>Report Schedule</h3>
				<h4>Current Delivery Schedule:</h4>
				{this.state.schedule.map((day, idx) => (
					<div key={idx}>
						<p>{day}</p>
					</div>
				))}
				<h4>Edit Delivery Schedule:</h4>
				<h5>Choose the days on which you'd like your reports collected</h5>
				<form onSubmit={this.updateSchedule}>
					{days.map((day, idx) => (
						<>
							<input
								key={idx}
								type="checkbox"
								onChange={this.addToNewSched}
								name={day}
								id={day}
							/>
							<label htmlFor="day">{day}</label>
						</>
					))}
					<button>Update Schedule</button>
				</form>

				<h4>Edit Questions:</h4>
				<h5>Change the questions delivered in each report</h5>
				{this.state.questions.map((question, idx) => (
					<>
						<div key={idx}>
							{question}
							<button onClick={this.removeQuestion}>X</button>
						</div>
						<div key={idx + 1}>
							<form onSubmit={this.updateQuestions}>
								<input
									type="text"
									placeholder="edit your question"
									name="editedQuestion"
									onChange={this.changeHandler}
								/>
								<button type="submit">Submit Question Change</button>
							</form>
						</div>
					</>
				))}
				<h5>Or add a new question, if you'd like:</h5>
				<form onSubmit={this.addQuestion}>
					<input
						type="text"
						placeholder="Add your question"
						name="newQuestion"
						onChange={this.changeHandler}
					/>
					<button>Add Question</button>
				</form>
				<br />
				<br />
				<button onClick={this.updateReport}>Press Me</button>
				<h1>
					^^^^^^^^^
					<br />
					PRESS THIS BUTTON TO UPDATE THE DATABASE
				</h1>

			</div>
		);
	}
}

export default EditReport;
