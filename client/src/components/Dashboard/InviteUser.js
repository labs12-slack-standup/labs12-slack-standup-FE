import React from 'react';
import TextField from "@material-ui/core/TextField";
import { Button } from '@blueprintjs/core';

const InviteUser = props => {
	return (
		<div className="inviteUserBox">
			<h3>Invite new user to the team</h3>
			<form onSubmit={props.addUser} className="inviteUser">
				<TextField
					id="outlined-email-input"
					label="Email"
					type="email"
					onChange={props.changeHandler}
					name="newMemberEmail"
					autoComplete="email"
					margin="normal"
					variant="outlined"
				/>
				<br />
				<Button type="submit">Invite</Button>
			</form>
		</div>
	);
};

export default InviteUser;
