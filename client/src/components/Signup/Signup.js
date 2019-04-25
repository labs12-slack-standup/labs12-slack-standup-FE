import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

class Signup extends Component {
	render() {
		return (
			<div>
				
			</div>
		);
	}
}

export default Signup;

// // ALSO NEED USER'S ROLE HERE

// const Signup = () => {
// 	let username;
// 	let password;

// 	return (
// 		<Mutation mutation={SIGNUP_USER}>
// 			{(signupUser, { data }) => {
// 				if (data) {
// 					localStorage.setItem("token", data.signupUser.token);
// 					return <Redirect to="/users" />;
// 				}
// 				return (
// 					<div>
// 						<form
// 							onSubmit={e => {
// 								e.preventDefault();
// 								signupUser({
// 									variables: {
// 										username: username.value,
// 										password: password.value
// 									}
// 								});
// 								username.value = "";
// 								password.value = "";
// 							}}
// 						>
// 							<input
// 								name="username"
// 								ref={node => (username = node)}
// 								placeholder="Username"
// 							/>
// 							<input
// 								name="password"
// 								ref={node => (password = node)}
// 								placeholder="Password"
// 							/>
// 							<button type="submit">Signup</button>
// 						</form>
// 					</div>
// 				);
// 			}}
// 		</Mutation>
// 	);
// };


