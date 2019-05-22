import './view.css';
import React, { Component } from 'react';
import Dashboard from '../Dashboard/Dashboard';
import ReportsDash from '../Dashboard/ReportsDash';
import jwt_decode from 'jwt-decode';
import { Card } from '@blueprintjs/core';

import { axiosWithAuth, baseURL } from '../../config/axiosWithAuth';

class View extends Component {
	state = {
		roles: 'member',
		active: true
	};

	componentDidMount() {
		const roles = jwt_decode(localStorage.getItem('token')).roles;
		const endpoint = `${baseURL}/users/byuser`;
		axiosWithAuth()
			.get(endpoint)
			.then(res =>
				this.setState({
					active: res.data.user.active,
					roles: roles
				})
			)
			.catch(err => {
				console.log(err.response.data);
			});
	}
	render() {
		return this.state.active ? (
			<div className="view">
				<Dashboard className="usersDash" role={this.state.roles} />
				<ReportsDash
					className="reportsDash"
					role={this.state.roles}
					{...this.props}
				/>
			</div>
		) : (
			<Card style={{ textAlign: 'center' }}>
				Looks like your account has been deactivated. If you believe this this
				is an error, please contact your manager.
			</Card>
		);
	}
}

export default View;
