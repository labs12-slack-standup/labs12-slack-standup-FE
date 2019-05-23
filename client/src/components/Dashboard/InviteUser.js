import React from 'react';
import { TextField, Button, Card, Icon } from '@material-ui/core';

import './dashboard.css';

// component to invite user to team (only admin access - BE preventions also)

const InviteUser = props => {
	return (
		<div className="inviteUserBox">
			<h3>Invite a new user to your team:</h3>
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
				<Button variant="outlined" type="submit" onClick={props.addUser}>
					Invite
				</Button>
			</form>
			{props.message.includes('issue') && (
				<div className="errorModal">
					<Card raised={true} className="errorCard onboardingCard">
						<div className="errorCard-content">
							<div className="email-failure">
								<h4>Oops . . .</h4>
								<Button onClick={props.clearMessage}>
									<Icon>cancel</Icon>
								</Button>
							</div>
							<h6>{props.message}</h6>
						</div>
					</Card>
				</div>
			)}
			{props.message.includes('sent') && (
				<div className="errorModal">
					<Card raised={true} className="errorCard onboardingCard">
						<div className="errorCard-content email-success">
							<h3>{props.message}</h3>
							<Button onClick={props.clearMessage}>
								<Icon>cancel</Icon>
							</Button>
						</div>
					</Card>
				</div>
			)}
		</div>
	);
};

export default InviteUser;
