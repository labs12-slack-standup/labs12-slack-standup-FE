import React, { Component} from "react";
import axiosWithAuth from '../../../config/axiosWithAuth';

class ReportResults extends Component {
	state = {
		responses: []
	}

	render() {
		return (
			<div>
				{
					this.state.responses.map(response => (
						<div>
							<p>{response.name || 'placeholderName'}</p>
							<p>{response.question}</p>
							<p>{response.answer}</p>
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
				this.setState({ responses: res.data.responses })
			)
			.catch(err => console.log(err));
	}
}

export default ReportResults;
