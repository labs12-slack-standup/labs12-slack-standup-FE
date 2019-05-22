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
			<Navbar className="navBar-container">
				<NavbarGroup align={Alignment.LEFT}>
					<NavLink to="/dashboard">
						<Navbar.Heading>Stand-Em-Ups</Navbar.Heading>
					</NavLink>
					<NavbarDivider />
					<NavLink className="wide-nav" to="/dashboard">
						<Button
							icon="home"
							minimal={
								this.props.history.location.pathname === '/dashboard'
									? false
									: true
							}
							text="Dashboard"
						/>
					</NavLink>
					<NavLink className="wide-nav" to="/dashboard/profile">
						<Button
							icon="user"
							minimal={
								this.props.history.location.pathname === '/dashboard/profile'
									? false
									: true
							}
							text="Profile"
						/>
					</NavLink>
					<NavLink className="narrow-nav" to="/dashboard">
						<Button
							icon="home"
							minimal={
								this.props.history.location.pathname === '/dashboard'
									? false
									: true
							}
							className={Classes.MINIMAL}
						/>
					</NavLink>
					<NavLink className="narrow-nav" to="/dashboard/profile">
						<Button
							icon="user"
							minimal={
								this.props.history.location.pathname === '/dashboard/profile'
									? false
									: true
							}
							className={Classes.MINIMAL}
						/>
					</NavLink>
				</NavbarGroup>

				<NavbarGroup align={Alignment.RIGHT}>
					<>
						<NavLink
							className="wide-nav"
							to="/login"
							onClick={!loggedIn ? null : this.handleLogout}
						>
							<Button
								icon={!loggedIn ? 'log-in' : 'log-out'}
								className={Classes.MINIMAL}
								text={!loggedIn ? 'Login' : 'Logout'}
							/>
						</NavLink>
						<NavLink className="narrow-nav" to="/login">
							<Button icon="log-in" className={Classes.MINIMAL} />
						</NavLink>
					</>
				</NavbarGroup>
			</Navbar>
		);
	}
}

export default Navigation;
