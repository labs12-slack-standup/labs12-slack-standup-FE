import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigation.css';

import { AppBar, Toolbar, Button, Icon, Avatar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	root: {
		flexGrow: 1,
		color: 'white'
	},
	grow: {
		flexGrow: 1,
		color: 'white'
	},
	menuButton: {
		marginLeft: 0,
		marginRight: 20
	},
	logoLink: {
		borderRight: '1px solid #FFF'
	},
	logLink: {},
	navLinks: {
		display: 'flex'
	}
};

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
		const { classes } = this.props;
		return (
			<AppBar position="static">
				<Toolbar>
					<NavLink to="/dashboard" className={classes.logoLink}>
						<Avatar
							className={classes.menuButton}
							src={require('./rocket-small.png')}
						/>
					</NavLink>
					<div className="nav-links">
						<div>
							<NavLink to="/dashboard">
								<Button className={classes.grow}>
									<Icon>home</Icon>
								</Button>
							</NavLink>
							<NavLink to="/dashboard/profile">
								<Button className={classes.grow}>
									<Icon>account_circle</Icon>
								</Button>
							</NavLink>
						</div>
						{!loggedIn ? (
							<NavLink to="/login">
								<Button className={classes.grow}>Login</Button>
							</NavLink>
						) : (
							<NavLink to="/login" onClick={this.handleLogout}>
								<Button className={classes.grow}>Logout</Button>
							</NavLink>
						)}
					</div>
				</Toolbar>
			</AppBar>
		);
	}
}

export default withStyles(styles)(Navigation);
