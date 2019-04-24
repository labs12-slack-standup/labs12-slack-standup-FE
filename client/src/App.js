import React from "react";
import { Link, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Reports from "./components/Reports/Reports";
import SingleReport from "./components/Reports/SingleReportMember";
import SingleReportMember from "./components/Reports/SingleReportMember";
import CreateReport from "./components/Reports/ModifyReports/CreateReport";
import SingleReportManager from "./components/Reports/SingleReportManager";

import "./App.css";

function App() {
	return (
		<div>
			<Route path="/signup" component={Signup} />
			<Route path="/login" component={Login} />
			<Route path="/dashboard/reports" component={Reports} />
			<Route path="/dashboard/singlereport" component={SingleReport} />

			<Route path="/dashboard/teammember" component={SingleReportMember} />
			<Route path="/dashboard/manager" component={SingleReportManager} />
			<Route path="/dashboard/createreport" component={CreateReport} />
		</div>
	);
}

export default App;
