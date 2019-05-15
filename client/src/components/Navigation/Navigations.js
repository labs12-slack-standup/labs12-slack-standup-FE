import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigation.css';
import {
	Navbar,
	Button,
	Classes,
	NavbarGroup,
	NavbarDivider,
	Alignment
} from '@blueprintjs/core';

class Navigation extends React.Component {
	// Add modal here?
	handleLogout = e => {
		e.preventDefault();
		localStorage.removeItem('firebaseui::rememberedAccounts');
		localStorage.removeItem('token');
		window.location.reload();
	};

	render() {
		const appToken = localStorage.getItem('token');
		const firebaseToken = localStorage.getItem(
			'firebaseui::rememberedAccounts'
		);
		const loggedIn = appToken && firebaseToken;

		return (
			<Navbar>
				<NavbarGroup>
					<NavLink to="/dashboard">
						<Navbar.Heading>Stand-Em-Ups</Navbar.Heading>
					</NavLink>
					<NavbarDivider />
					<NavLink to="/profile">
						<Button className={Classes.MINIMAL} text="Profile" />
					</NavLink>
					<NavLink to="/dashboard">
						<Button className={Classes.MINIMAL} text="Dashboard" />
					</NavLink>
					{loggedIn ? (
						<NavLink to="/login">
							<Button className={Classes.MINIMAL} text="Login" />
						</NavLink>
					) : (
						<NavLink to="/login" onClick={this.handleLogout}>
							<Button className={Classes.MINIMAL} text="Logout" />
						</NavLink>
					)}
				</NavbarGroup>
			</Navbar>
		);
	}
}

export default Navigation;
