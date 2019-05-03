import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import './navigation.css';

class Navigation extends React.Component {
	// Add modal here?
	handleLogout = e => {
		e.preventDefault();
		localStorage.removeItem('firebaseui::rememberedAccounts');
		localStorage.removeItem('token');
		window.location.reload();
	};
	render() {
		return (
			<div className="navigation">
				<NavLink to="/dashboard/account">Account</NavLink>
				<NavLink to="/dashboard/reports">Reports</NavLink>
				<NavLink to="/login">Login</NavLink>
				<NavLink to="/login" onClick={this.handleLogout}>
					Logout
				</NavLink>
			</div>
		);
	}
}

export default Navigation;
