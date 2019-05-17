import React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';

const InviteUser = props => {
	return (
		<div className="inviteUserBox">
			<h3>Invite a new user to your team:</h3>
			<form onSubmit={props.addUser} className="inviteUser">
				<input
					className="bp3-input"
					type="email"
					placeholder="Email..."
					onChange={props.changeHandler}
					name="newMemberEmail"
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
