import React from 'react';
import { EditableText, TextArea, Intent } from '@blueprintjs/core';

const CreateTeam = props => {
	return (
		<div className="onboarding">
			<h3>Add team member's email</h3>
			<TextArea
				style={{ width: 400 + 'px', height: 100 + 'px' }}
				className="createTeamEmail"
				intent={Intent.PRIMARY}
				placeholder="Emails, separated by commas"
				value={props.emails}
				onChange={props.changeHandler}
				name="emails"
			/>
			<button onClick={props.createTeam} style={{ marginBottom: 100 + 'px' }}>
				Create Team
			</button>

			<div>Have a join code?</div>
			<button onClick={props.joinToggle}>Input Join Code</button>
			<button onClick={props.toggleAllOff}>Cancel</button>
		</div>
	);
};

export default CreateTeam;
