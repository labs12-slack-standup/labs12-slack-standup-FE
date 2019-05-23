import React from 'react';
import {
	TextField,
	Button,
	Dialog,
	DialogTitle,
	Slide
} from '@material-ui/core';

import './dashboard.css';

// component to invite user to team (only admin access - BE preventions also)

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

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
			{/* {props.message.includes('issue') && (
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
			)} */}
			<Dialog
				open={props.modal}
				TransitionComponent={Transition}
				keepMounted
				onClose={props.clearMessage}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">{props.message}</DialogTitle>

				<Button onClick={() => props.clearMessage()}>x</Button>
			</Dialog>
		</div>
	);
};

export default InviteUser;
