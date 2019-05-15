import React, { Component } from 'react';
import DatePicker from '../../DatePicker/DatePicker';
import styled from 'styled-components';
import { Card, Elevation } from '@blueprintjs/core';
import MemberResponseForm from './MemberResponseForm';
import { axiosWithAuth, baseURL } from '../../../config/axiosWithAuth';

class ReportResults extends Component {
	state = {
		responses: []
	};

	render() {
		const options = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		};
		return (
			<MainContainer>
				<Feed>
					{this.state.responses.map(
						batch =>
							batch.responses.length > 0 && (
								<div key={batch.date}>
									<h3>
										{new Date(batch.date)
											.toLocaleDateString('en-US', options)
											.replace(',', '')}
									</h3>

									{
										batch.responses.map(response => (
											<div key={response.userId}>
												<h3>{response.fullName}</h3>
												{
													response.questions.map(({ question, answer, id }) => (
														<div key={id}>
															<h6>{question}</h6>
															<p>{answer}</p>
														</div>
													))
												}
											</div>
										))
									}

								</div>
							)
					)}
				</Feed>
				<Aside>
					<Card interactive={true} elevation={Elevation.TWO}>
						<MemberResponseForm {...this.props} />
						<DatePicker getByDate={this.getByDate} />
					</Card>
				</Aside>
			</MainContainer>
		);
	}

	componentDidMount() {
		axiosWithAuth()
			.get(`${baseURL}/responses/${this.props.match.params.reportId}`)
			.then(res => this.setState({ responses: res.data }))
			.catch(err => console.log(err));
	}

	getByDate = date => {
		axiosWithAuth()
			.post(`${baseURL}/responses/${this.props.match.params.reportId}/day`, {
				date
			})
			.then(res => this.setState({ responses: res.data }))
			.catch(err => {
				console.log(err);
			});
	};
}

const Aside = styled.main`
	@media (min-width: 800px) {
		width: 450px;
	}
`;

const MainContainer = styled.main`
	@media (min-width: 800px) {
		display: flex;
		margin: auto;
		max-width: 1000px;
	}
`;

const Feed = styled.div`
	@media (min-width: 800px) {
		width: 70%;
	}
`;

export default ReportResults;
