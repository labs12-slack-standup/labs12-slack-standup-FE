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
		console.log(appToken);
		const loggedIn = appToken && firebaseToken;

		return (
			<Navbar>
				<NavbarGroup align={Alignment.LEFT}>
					<NavLink to="/dashboard">
						<Navbar.Heading>Stand-Em-Ups</Navbar.Heading>
					</NavLink>
					<NavbarDivider />
					<NavLink to="/dashboard">
						<Button icon="home" className={Classes.MINIMAL} text="Dashboard" />
					</NavLink>
					<NavLink to="/dashboard/profile">
						<Button icon="user" className={Classes.MINIMAL} text="Profile" />
					</NavLink>
				</NavbarGroup>

				<NavbarGroup align={Alignment.RIGHT}>
					{!loggedIn ? (
						<NavLink to="/login">
							<Button icon="log-in" className={Classes.MINIMAL} text="Login" />
						</NavLink>
					) : (
						<NavLink to="/login" onClick={this.handleLogout}>
							<Button
								icon="log-out"
								className={Classes.MINIMAL}
								text="Logout"
							/>
						</NavLink>
					)}
				</NavbarGroup>
			</Navbar>
		);
	}
}

export default Navigation;
