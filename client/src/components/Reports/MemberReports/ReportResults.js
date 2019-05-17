import React, { Component } from 'react';
import DatePicker from '../../DatePicker/DatePicker';
import styled from 'styled-components';
import { Card, Elevation } from '@blueprintjs/core';
import MemberResponseForm from './MemberResponseForm';
import { axiosWithAuth, baseURL } from '../../../config/axiosWithAuth';
import jwt_decode from 'jwt-decode';
import './ReportResults.css';

class ReportResults extends Component {
	state = {
		responses: [],
		clickedDate: null,
		filteredResponse: []
	};

	render() {
		const options = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		};

		return (
			<main className="report-results-container">
				<section className="report-results-aside">
					{this.state.filteredResponse.length > 0 ? (
						<Card
							interactive={false}
							elevation={Elevation.TWO}
							className="completed-report"
						>
							<h3>Thank you for filling out this report!</h3>
						</Card>
					) : (
						<Card interactive={false} elevation={Elevation.TWO}>
							<MemberResponseForm
								{...this.props}
								updateWithUserResponse={this.updateWithUserResponse}
							/>
						</Card>
					)}

					<Card
						interactive={false}
						elevation={Elevation.TWO}
						style={{ marginTop: '30px' }}
					>
						<h1 className="report-results-filter">Filter by day</h1>
						<DatePicker
							getByDate={this.getByDate}
							clickedDate={this.state.clickedDate}
						/>
					</Card>
				</section>
				<section className="report-results-feed">
					{this.state.responses.map(
						batch =>
							batch.responses.length > 0 && (
								<div key={batch.date}>
									<h3 className="report-results-feed-date">
										{new Date(batch.date)
											.toLocaleDateString('en-US', options)
											.replace(',', '')}
									</h3>
									{batch.responses.map(response => (
										<div key={response.userId} className="response-container">
											<img
												className="response-container-image"
												src={response.profilePic}
												alt={response.fullName}
											/>
											<div className="response-container-main">
												<h3 className="response-container-main-name">
													{response.fullName}
												</h3>
												{response.questions.map(({ question, answer, id }) => (
													<div key={id}>
														<h6 className="response-container-main-question">
															{question}
														</h6>
														<p className="response-container-main-answer">
															{answer}
														</p>
													</div>
												))}
											</div>
										</div>
									))}
								</div>
							)
					)}
				</section>
			</main>
		);
	}

	componentDidMount() {
		const userId = jwt_decode(localStorage.getItem('token')).subject;
		console.log('userid', userId);
		axiosWithAuth()
			.get(`${baseURL}/responses/${this.props.match.params.reportId}`)
			.then(res => {
				const filtered = res.data[0].responses.filter(
					response => response.userId === userId
				);
				console.log('filtered', filtered);
				this.setState({ responses: res.data, filteredResponse: filtered });
			})
			.catch(err => console.log(err));
	}

	getByDate = date => {
		axiosWithAuth()
			.post(`${baseURL}/responses/${this.props.match.params.reportId}/day`, {
				date
			})
			.then(res => this.setState({ responses: res.data, clickedDate: date }))
			.catch(err => {
				console.log(err);
			});
	};

	updateWithUserResponse = res => {
		this.setState({ responses: res.data });
	};
}

export default ReportResults;
