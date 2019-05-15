import React from 'react';
import { Button, TextArea, Intent } from '@blueprintjs/core';

const InviteUser = props => {
	return (
		<div className="inviteUserBox">
			<h3>Invite a new user to your team:</h3>
			<form onSubmit={props.addUser} className="inviteUser">
				<TextArea placeholder="Email" onChange={props.changeHandler} />
				{/* <input
					type="email"
					placeholder="New user email here"
					onChange={props.changeHandler}
					name="newMemberEmail"
				/> */}
				<Button>Invite</Button>
			</form>
		</div>
	);
};

export default InviteUser;
