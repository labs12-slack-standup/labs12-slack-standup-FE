import React from 'react';
import { Route } from 'react-router-dom';

// Firebase Login
import Login from './components/Login/Login';

import Onboarding from './components/Onboarding/Onboarding';
import ReportsDash from './components/Dashboard/ReportsDash';
import User from './components/Dashboard/User';

// Marketing Page
import MarketingPage from './components/Marketing/MarketingPage';
import DevTeam from './components/Marketing/DevTeam';

// Nav and Footer
import Navigation from './components/Navigation/Navigations';
import Footer from './components/Navigation/Footer';

import Profile from './components/Account/Account';
import View from './components/View/View';

// Slack Routes
import Slack from './components/Slack/Slack';
import SlackRedirect from './components/Slack/SlackRedirect';

// CSS
import './App.css';

//Protected Routes
import PrivateRoute from './auth/PrivateRoute';
import NewUserRoute from './auth/NewUserRoute';

function App() {
	return (
		<div>
			{/* NAVIGATION ROUTES */}
			<Route path="/" component={Navigation} />

			{/* MARKETING PAGES */}
			<Route exact path="/" component={MarketingPage} />
			<Route exact path="/team" component={DevTeam} />

			{/* AUTHENTICATION ROUTES */}
			<Route path="/login" component={Login} />

			{/* ONBOARDING */}
			<NewUserRoute exact path="/onboarding" component={Onboarding} />

			{/* DASHBOARD */}
			<PrivateRoute exact path="/dashboard" component={View} />

			{/* REPORT ROUTES */}

			<PrivateRoute path="/dashboard/reports" component={ReportsDash} />

			{/* VIEW FOR SINGLE ACCOUNT */}
			<PrivateRoute exact path="/dashboard/profile" component={Profile} />
			<PrivateRoute path="/dashboard/team/:userId" component={User} />

			{/* CONNECT TO SLACK */}
			<Route exact path="/slack" component={Slack} />
			<Route exact path="/slack/auth" component={SlackRedirect} />

			{/* FOOTER ROUTES */}
			<Route path="/" component={Footer} />
		</div>
	);
}

export default App;
