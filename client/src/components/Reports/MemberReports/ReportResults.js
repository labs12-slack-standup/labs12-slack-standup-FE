import React, { Component } from 'react';
import DatePicker from '../../DatePicker/DatePicker';
import { axiosWithAuth, baseURL } from '../../../config/axiosWithAuth';

class ReportResults extends Component {
	state = {
		responses: []
	};

	render() {
		const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		return (
			<>
				<DatePicker getByDate={this.getByDate} />
				<div>
					{
						this.state.responses.map(batch => (
							batch.responses.length > 0 &&
								<div key={batch.date}>
									<h3>
										{
											new Date(batch.date).toLocaleDateString('en-US', options).replace(',', '')
										}
									</h3>
									{
										batch.responses.map(response => (
											<div key={response.userId}>
												<h3>{response.fullName}</h3>
												{
													response.questions.map(({ question, answer }) => (
														<div key={`${response.userId} ${answer}`}>
															<h6>{question}</h6>
															<p>{answer}</p>
														</div>
													))
												}
											</div>
										))
									}
								</div>
						))
					}
				</div>
			</>
		);
	}

	// render() {
	// 	// console.log(this.state.responses);
	// 	if (!this.state.responses || this.state.responses.length < 1) {
	// 		return <div>No Responses.</div>;
	// 	}
	// 	return (
	// 		<>
	// 			<DatePicker getByDate={this.getByDate} />
	// 			<div>
	// 				{this.state.responses.map(response => (
	// 					<div key={response.userId}>
	// 						<h3>{response.fullName}</h3>
	// 						{response.questions.map(({ question, answer }) => (
	// 							<div key={answer}>
	// 								<p>{question}</p>
	// 								<p>{answer}</p>
	// 							</div>
	// 						))}
	// 					</div>
	// 				))}
	// 			</div>
	// 		</>
	// 	);
	// }

	componentDidMount() {
		axiosWithAuth()
			.get(`${baseURL}/responses/${this.props.match.params.reportId}`)
			.then(res => this.setState({ responses: res.data }))
			.catch(err => console.log(err));
	}

	getByDate = date => {
		axiosWithAuth()
		.post(`${baseURL}/responses/${this.props.match.params.reportId}/day`, { date })
		.then(res => this.setState({ responses: res.data }))
		.catch(err => {
			console.log(err);
		})
	}
}

export default ReportResults;
