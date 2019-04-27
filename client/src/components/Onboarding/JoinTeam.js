import React from "react";
import { Link } from "react-router-dom";

const JoinTeam = props => {
	return (
		<div className="onboarding">
			Enter Join Code (provided by your manger):
			<form>
				<input
					type="text"
					placeholder="join code"
					onChange={props.changeHandler}
					name="joincode"
					// onSubmit={props.submitHandler}
				/>
			</form>
			<div>
				Actually don't have a join code? That's okay, let's create a team:
				<button onClick={props.createToggle}>Create Team</button>
			</div>
			<Link to="dashboard/reports">
				<button>Let's go!</button>
			</Link>
			<button onClick={props.toggleAllOff}>Cancel</button>
		</div>
	);
};

export default JoinTeam;
