import React from 'react';
import { Route } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Profile from './components/Account/Account';
import Onboarding from './components/Onboarding/Onboarding';
import Navigation from './components/Navigation/Navigations';
import ReportsDash from './components/Dashboard/ReportsDash';
import PrivateRoute from './auth/PrivateRoute';
import Slack from './components/Slack/Slack';
import SlackRedirect from './components/Slack/SlackRedirect';
import User from './components/Dashboard/User';
import MarketingPage from './components/Marketing/MarketingPage';
import DevTeam from './components/Marketing/DevTeam';
import Footer from './components/Navigation/Footer';

import './App.css';
import View from './components/View/View';

function App() {
	return (
		<div>
			{/* NAVIGATION ROUTES */}
			<Route path="/" component={Navigation} />

			{/* MARKETING PAGES */}
			<Route exact path="/" component={MarketingPage} />
			<Route exact path="/team" component={DevTeam} />

			{/* AUTHENTICATION ROUTES */}
			<Route path="/signup" component={Signup} />
			<Route path="/login" component={Login} />

			{/* ONBOARDING */}
			<Route exact path="/onboarding" component={Onboarding} />

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
