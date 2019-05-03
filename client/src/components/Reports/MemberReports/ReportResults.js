import React, { Component} from "react";
import { axiosWithAuth } from '../../../config/axiosWithAuth';

class ReportResults extends Component {
	state = {
		responses: []
	}

	render() {
		return (
			<div>
				{
					this.state.responses.map(response => (
						<div key={response.userId}>
							<h3>{response.fullName}</h3>
							{
								response.questions.map(({question, answer}) => (
									<div>
										<p>{question}</p>
										<p>{answer}</p>
									</div>
								))
							}
						</div>
					))
				}
			</div>
		)
	}

	componentDidMount() {
		axiosWithAuth()
			.get(`http://localhost:5000/api/responses/${this.props.match.params.reportId}`)
			.then(res =>
				this.setState({ responses: res.data.membersArray })
			)
			.catch(err => console.log(err));
	}
}

export default ReportResults;
