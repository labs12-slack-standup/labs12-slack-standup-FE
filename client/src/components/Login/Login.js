import React from "react";
import { Link, Route } from "react-router-dom";

const Login = () => {
	return (
		<div>
			<Link to="/dashboard/reports">
				<button>Login</button>
			</Link>
		</div>
	);
};

export default Login;
