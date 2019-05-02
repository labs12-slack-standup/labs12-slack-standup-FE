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
import ReportResults from './components/Reports/MemberReports/ReportResults';
import Account from './components/Account/Account';
import Onboarding from './components/Onboarding/Onboarding';
import Navigation from './components/Navigation/Navigations';
import Dashboard from './components/Dashboard/Dashboard.js';
import ReportInput from "./components/Reports/MemberReports/ReportInput";

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
			<Route path="/onboarding" component={Onboarding} />
			<Route exact path="/dashboard" component={Dashboard} />
			{/* REPORT ROUTES */}
			<Route
				path="/dashboard/singlereport"
				component={SingleReport}
			/>
			{/* MANAGER REPORT VIEWS AND UPDATING */}
			<Route
				exact
				path="/dashboard/report/manager"
				component={SingleReportManager}
			/>
			<Route
				exact
				path="/dashboard/createreport"
				component={CreateReport}
			/>
			<Route
				exact
				path="/dashboard/editreport"
				component={EditReport}
			/>

			{/* TEAM MEMBER VIEWS AND UPDATING */}

			{/* REPORT ROUTES */}

			{/* Don't delete this group of Routes below they need to be discussed */}

			<Route exact path="/dashboard/reports" component={Reports} />
			<Route path="/dashboard/reports/:reportId" component={SingleReportMember} />
			{/* <Route path="/dashboard/responseform" component={MemberResponseForm} />
			<Route path="/dashboard/reportresults" component={ReportResults} />
			<Route path="/dashboard/report/teammember" component={SingleReportMember} />
			<Route path="/dashboard/reportresults" component={ReportResults} /> */}
			
			{/* Don't delete this group of Routes above they need to be discussed */}

			{/* VIEW FOR SINGLE ACCOUNT */}
			<Route path="/dashboard/account" component={Account} />
		</div>
	);
}

export default App;
