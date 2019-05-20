import './view.css';
import React, { Component } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import ReportsDash from '../Dashboard/ReportsDash';
import jwt_decode from 'jwt-decode';
import Slack from '../Slack/Slack';

class View extends Component {
	state = {
		roles: 'member'
	};

	componentDidMount() {
		const roles = jwt_decode(localStorage.getItem('token')).roles;
		this.setState({
			roles: roles
		});
	}
	render() {
		return (
			<div className="view">
			
				<Dashboard className="usersDash" role={this.state.roles} />
				<ReportsDash
					className="reportsDash"
					role={this.state.roles}
					{...this.props}
				/>
			</div>
		);
	}
}

export default View;
