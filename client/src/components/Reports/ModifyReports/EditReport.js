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
		singleQuestion: ''
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

	//changehandlers for ERRRRRYONE

	render() {
		return (
			<div>
				<h2>{this.state.reportName}</h2>
				<h3>{this.state.message}</h3>
			</div>
		);
	}
}

export default EditReport;
