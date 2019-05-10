import React from 'react';
import { Link } from 'react-router-dom';

const JoinTeam = props => {
	return (
		<div className="onboarding">
			Enter Join Code (provided by your manger):
			<form>
				<input
					type="text"
					placeholder="join code"
					onChange={props.changeHandler}
					name="joinCode"
				/>
			</form>
			<div>
				Actually don't have a join code? That's okay, let's create a team:
				<button onClick={props.createToggle}>Create Team</button>
			</div>
			<button onClick={props.submitHandler}>Let's go!</button>
			<button onClick={props.toggleAllOff}>Cancel</button>
		</div>
	);
};

export default JoinTeam;
