import React from "react";
import { Link, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Reports from "./components/Reports/Reports";
import SingleReport from "./components/Reports/SingleReport";
import SingleReportMember from "./components/Reports/SingleReportMember";
import CreateReport from "./components/Reports/ModifyReports/CreateReport";
import SingleReportManager from "./components/Reports/MangerReports/SingleReportManager";
import EditReport from "./components/Reports/ModifyReports/EditReport";

import "./App.css";

function App() {
	return (
		<div>
			{/* AUTHENTICATION ROUTES */}
			<Route path="/signup" component={Signup} />
			<Route path="/login" component={Login} />

			<Route path="/dashboard/reports" component={Reports} />
			{/* SINGLE REPORT NOT NEEDED - ABSTRACT AWAY WITH A REROUTE */}
			{/* REPORT ROUTES */}
			<Route path="/dashboard/singlereport" component={SingleReport} />
			<Route
				path="/dashboard/report/teammember"
				component={SingleReportMember}
			/>
			{/* MANAGER REPORT VIEWS AND UPDATING */}
			<Route path="/dashboard/report/manager" component={SingleReportManager} />
			<Route path="/dashboard/createreport" component={CreateReport} />
			<Route path="/dashboard/editreport" component={EditReport} />
		</div>
	);
}

export default App;
