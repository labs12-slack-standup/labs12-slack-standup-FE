import React, { Component } from 'react';
import { axiosWithAuth, baseURL } from '../../../config/axiosWithAuth';

class EditReport extends Component {
	state = {
		//haven't thought this out much but needs somehwere to store edits to questions
		question1: '',
		question2: '',
		question3: '',
		reportName: ''
	};

	componentDidMount() {
		const {id} = this.props.match.params;

		axiosWithAuth()
			.get(`${baseURL}/reports/${id}`)
			.then(res => {
				console.log(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}

	//changehandlers for ERRRRRYONE

	render() {
		return (
			<div>
				<ul>
					Component Needs:
					<li>Report name</li>
					<li>Questions</li>
					<li>Parameterics for report</li>
				</ul>
			</div>
		);
	}
}

export default EditReport;
