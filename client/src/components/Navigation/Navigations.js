import React from "react";
import { NavLink } from "react-router-dom";
import "./navigation.css";

const Navigation = () => {
	// Add modal here?
	return (
		<div className="navigation">
			<NavLink to="/dashboard/account">Account</NavLink>
			<NavLink to="/dashboard/reports">Reports</NavLink>
			<NavLink to="/login">Login</NavLink>
			<NavLink to="/logout">Logout</NavLink>
		</div>
	);
};

export default Navigation;
