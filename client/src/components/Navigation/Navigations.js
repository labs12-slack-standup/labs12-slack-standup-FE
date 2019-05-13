import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigation.css';
import {
	Navbar,
	Button,
	Classes,
	NavbarGroup,
	NavbarDivider
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
		return (
			<Navbar>
				<NavbarGroup>
					<Navbar.Heading>Stand-Em-Ups</Navbar.Heading>
					<NavbarDivider />
					<NavLink to="/dashboard/account">
						<Button className={Classes.MINIMAL} text="Account" />
					</NavLink>
					<NavLink to="/dashboard">
						<Button className={Classes.MINIMAL} text="Dashboard" />
					</NavLink>
					<NavLink to="/login">
						<Button className={Classes.MINIMAL} text="Login" />
					</NavLink>
					<NavLink to="/login" onClick={this.handleLogout}>
						<Button className={Classes.MINIMAL} text="Logout" />
					</NavLink>
				</NavbarGroup>
			</Navbar>
			// <nav class="bp3-navbar .modifier">
			// 	<div class="bp3-navbar-group bp3-align-left">
			// 		<div class="bp3-navbar-heading">Blueprint</div>
			// 		<input class="bp3-input" placeholder="Search files..." type="text" />
			// 	</div>
			// 	<div class="bp3-navbar-group bp3-align-right">
			// 		<button class="bp3-button bp3-minimal bp3-icon-home">Home</button>
			// 		<button class="bp3-button bp3-minimal bp3-icon-document">
			// 			Files
			// 		</button>
			// 		<span class="bp3-navbar-divider" />
			// 		<button class="bp3-button bp3-minimal bp3-icon-user" />
			// 		<button class="bp3-button bp3-minimal bp3-icon-notifications" />
			// 		<button class="bp3-button bp3-minimal bp3-icon-cog" />
			// 	</div>
			//</nav>
		);
	}
}

export default Navigation;
