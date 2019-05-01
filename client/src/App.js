<<<<<<< HEAD
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
import MemberResponseForm from './components/Reports/MemberReports/MemberResponseForm';
import ReportResults from './components/Reports/MemberReports/ReportResults';
import Account from './components/Account/Account';
import Onboarding from './components/Onboarding/Onboarding';
import Navigation from './components/Navigation/Navigations';
=======
import React from "react";
import { Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Reports from "./components/Reports/Reports";
import SingleReport from "./components/Reports/SingleReport";
import SingleReportMember from "./components/Reports/SingleReportMember";
import CreateReport from "./components/Reports/ModifyReports/CreateReport";
import SingleReportManager from "./components/Reports/MangerReports/SingleReportManager";
import EditReport from "./components/Reports/ModifyReports/EditReport";
import MemberResponseForm from "./components/Reports/MemberReports/MemberResponseForm";
import ReportResults from "./components/Reports/MemberReports/ReportResults";
import Account from "./components/Account/Account";
import Onboarding from "./components/Onboarding/Onboarding";
import Navigation from "./components/Navigation/Navigations";
import ReportInput from "./components/Reports/MemberReports/ReportInput";
>>>>>>> fa68aaf4afb3ff71f5229e377d7cde3a54c0bc9a

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

			{/* REPORT ROUTES */}
<<<<<<< HEAD
			<Route
				path="/dashboard/singlereport"
				component={SingleReport}
			/>
=======
			<Route exact path="/dashboard/reports" component={Reports} />
			<Route path="/dashboard/reports/:reportId" component={MemberResponseForm} />
	
>>>>>>> fa68aaf4afb3ff71f5229e377d7cde3a54c0bc9a
			{/* MANAGER REPORT VIEWS AND UPDATING */}
			<Route
				path="/dashboard/report/manager"
				component={SingleReportManager}
			/>
			<Route
				path="/dashboard/createreport"
				component={CreateReport}
			/>
			<Route
				path="/dashboard/editreport"
				component={EditReport}
			/>

			{/* TEAM MEMBER VIEWS AND UPDATING */}
			<Route
				path="/dashboard/report/teammember"
				component={SingleReportMember}
			/>
<<<<<<< HEAD
			<Route
				path="/dashboard/responseform"
				component={MemberResponseForm}
			/>
			<Route
				path="/dashboard/reportresults"
				component={ReportResults}
			/>
=======
			
			<Route path="/dashboard/reportresults" component={ReportResults} />
>>>>>>> fa68aaf4afb3ff71f5229e377d7cde3a54c0bc9a

			{/* V IEW FOR SINGLE ACCOUNT */}
			<Route path="/dashboard/account" component={Account} />
			
		</div>
	);
}

export default App;
