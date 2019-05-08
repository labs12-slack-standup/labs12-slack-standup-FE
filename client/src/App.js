import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Reports from './components/Reports/Reports';
import SingleReport from './components/Reports/SingleReport';
import SingleReportMember from './components/Reports/SingleReportMember';
import SingleReportManager from './components/Reports/MangerReports/SingleReportManager';
import EditReport from './components/Reports/ModifyReports/EditReport';
import Account from './components/Account/Account';
import Onboarding from './components/Onboarding/Onboarding';
import Navigation from './components/Navigation/Navigations';
import ReportsDash from './components/Dashboard/ReportsDash';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Slack from './components/Slack/Slack';
import SlackRedirect from './components/Slack/SlackRedirect';
import Dashboard from './components/Dashboard/Dashboard';

import './App.css';

function App() {
	return (
		<div>
			{/* NAVIGATION ROUTES */}
			<Route path="/" component={Navigation} />
			{/* AUTHENTICATION ROUTES */}
			<Route path="/signup" component={Signup} />
			<Route path="/login" component={Login} />

			{/* ONBOARDING */}
			<Route exact path="/onboarding" component={Onboarding} />
			<PrivateRoute exact path="/dashboard" component={Dashboard} />
			<PrivateRoute path="/dashboard/reports" component={ReportsDash} />

			{/* REPORT ROUTES */}

			{/* <PrivateRoute exact path="/dashboard/reports" component={Reports} /> */}

			{/* MANAGER REPORT VIEWS AND UPDATING */}
			{/* <AdminRoute
				exact
				path="/dashboard/report/manager"
				component={SingleReportManager}
			/> */}

			{/* REPORT ROUTES */}

			{/* VIEW FOR SINGLE ACCOUNT */}
			<PrivateRoute exact path="/dashboard/account" component={Account} />

			{/* CONNECT TO SLACK */}
			<Route exact path="/slack" component={Slack} />
			<Route exact path="/slack/auth" component={SlackRedirect} />
		</div>
	);
}

export default App;
