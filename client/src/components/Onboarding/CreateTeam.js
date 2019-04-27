import React from "react";
import { Link } from "react-router-dom";

const CreateTeam = props => {
	return (
		<div className="onboarding">
			<h3>Create a team:</h3>
			<h4>Members Added:</h4>
			{props.emails.map((email, idx) => (
				<div key={idx}>
					{email} <button onClick={() => props.removeEmail(idx)}>X</button>
				</div>
			))}
			<div>Add your team members here by email:</div>
			<form onSubmit={props.emailHandler}>
				<input
					type="email"
					// onSubmit={props.emailHandler}
					name="singleEmail"
					onChange={props.changeHandler}
				/>
				<button onClick={props.emailHandler}>Add Team Member</button>
			</form>
			<Link to="dashboard/reports">
				<button>Create Team</button>
			</Link>
			<div>Have a join code?</div>
			<button onClick={props.joinToggle}>Input Join Code</button>
			<button onClick={props.toggleAllOff}>Cancel</button>
		</div>
	);
};

export default CreateTeam;
