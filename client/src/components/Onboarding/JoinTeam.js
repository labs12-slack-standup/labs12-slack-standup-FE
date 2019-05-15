import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@blueprintjs/core';

const JoinTeam = props => {
	return (
		<div className="onboarding">
			<Card>
				Enter Join Code (provided by your manger):
				<form>
					<input
						type="text"
						placeholder="join code"
						onChange={props.changeHandler}
						name="joinCode"
					/>
				</form>
				<button
					onClick={props.submitHandler}
					style={{ marginBottom: 100 + 'px' }}
				>
					Join Team
				</button>
			</Card>
			<Card>
				<p>
					Actually don't have a join code? That's okay, let's create a team:
				</p>
				<button onClick={props.createToggle}>Create Team</button>
				<button onClick={props.toggleAllOff}>Cancel</button>
			</Card>
		</div>
	);
};

export default JoinTeam;
