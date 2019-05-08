import React from 'react';
import { Route } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Reports from './components/Reports/Reports';
import SingleReport from './components/Reports/SingleReport';
import SingleReportMember from './components/Reports/SingleReportMember';
import CreateReport from './components/Reports/ModifyReports/CreateReport';
import SingleReportManager from './components/Reports/MangerReports/SingleReportManager';
import EditReport from './components/Reports/ModifyReports/EditReport';
import Account from './components/Account/Account';
import Onboarding from './components/Onboarding/Onboarding';
import Navigation from './components/Navigation/Navigations';
import Dashboard from './components/Dashboard/Dashboard.js';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Slack from './components/Slack/Slack';
import SlackRedirect from './components/Slack/SlackRedirect';

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

			{/* REPORT ROUTES */}

			<PrivateRoute exact path="/dashboard/reports" component={Reports} />
			<PrivateRoute
				exact
				path="/dashboard/singlereport"
				component={SingleReport}
			/>

			{/* MANAGER REPORT VIEWS AND UPDATING */}
			<AdminRoute
				exact
				path="/dashboard/report/manager"
				component={SingleReportManager}
			/>

			<AdminRoute
				exact
				path="/dashboard/createreport"
				component={CreateReport}
			/>
			<AdminRoute
				exact
				path="/dashboard/editreport/:reportId"
				component={EditReport}
			/>

			{/* REPORT ROUTES */}
			<PrivateRoute
				path="/dashboard/reports/:reportId"
				component={SingleReportMember}
			/>

			{/* VIEW FOR SINGLE ACCOUNT */}
			<PrivateRoute path="/dashboard/account" component={Account} />


			{/* CONNECT TO SLACK */}
			<Route exact path="/slack" component={Slack} />
			<Route exact path="/slack/auth" component={SlackRedirect} />
		</div>
	);
}

export default App;
