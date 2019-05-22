import React from 'react';

import { Card, Button, Fab, Icon } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

import './onboarding.css';

const CreateTeam = props => {
	return (
		<div className="onboarding">
			<Card raised={true} className="onboardingCard">
				<div className="onboarding-card-content">
					<h3>Add Team Members by Email</h3>
					<ChipInput
						label="Email"
						variant="outlined"
						defaultValue={[]}
						onChange={chips => props.handleChipChange(chips)}
					/>
					<Button
						color="primary"
						variant="contained"
						onClick={props.createTeam}
					>
						Create Team
					</Button>
				</div>
			</Card>
			{props.error.length > 0 && (
				<div className="errorModal">
					<Card className="errorCard onboardingCard" raised={true}>
						<button onClick={props.clearError}>x</button>
						<h4>Oops . . .</h4>
						<div>{props.error}</div>
					</Card>
				</div>
			)}
			<div className="create-team-buttons">
				<Fab
					onClick={props.toggleAllOff}
					color="default"
					className="onboarding-back"
				>
					<Icon>arrow_back</Icon>
				</Fab>
				<Button variant="outlined" onClick={props.joinToggle}>
					Join an Existing Team
				</Button>
			</div>
		</div>
	);
};

export default CreateTeam;
