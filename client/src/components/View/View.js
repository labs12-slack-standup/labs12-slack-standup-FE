import './view.css';
import React, { Component } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import ReportsDash from '../Dashboard/ReportsDash';
import jwt_decode from 'jwt-decode';

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
				<ReportsDash role={this.state.roles} {...this.props} />
				<Dashboard role={this.state.roles} />
			</div>
		);
	}
}

export default View;
