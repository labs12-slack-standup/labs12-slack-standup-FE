import React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import TextField from '@material-ui/core/TextField';

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
				<Button type="submit" onClick={props.addUser}>
					Invite
				</Button>
			</form>
			{props.message.includes('issue') && (
				<div className="errorModal">
					<Card className="errorCard onboardingCard" elevation={Elevation.TWO}>
						<button onClick={props.clearMessage}>x</button>
						<h4>Oops . . .</h4>
						<div>{props.message}</div>
					</Card>
				</div>
			)}
			{props.message.includes('sent') && (
				<div className="errorModal">
					<Card className="errorCard onboardingCard" elevation={Elevation.TWO}>
						<button onClick={props.clearMessage}>x</button>
						<div>{props.message}</div>
					</Card>
				</div>
			)}
		</div>
	);
};

export default InviteUser;
