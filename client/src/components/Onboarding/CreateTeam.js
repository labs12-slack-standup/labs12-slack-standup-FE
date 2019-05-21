import React from 'react';
import {
	Button,
	Card,
	Elevation,
	TagInput
} from '@blueprintjs/core';

const CreateTeam = props => {
	return (
		<div className="onboarding">
			<Card
				interactive={false}
				elevation={Elevation.THREE}
				className="onboardingCard"
			>
				<h4>Add team member's email</h4>
				{/* <ChipInput
						value={props.emails}
						onRequestAdd={chip => props.changeEmail(chip)}
						onRequestDelete={(chip, index) =>
							props.changeEmail(chip, index)
						}
					/> */}
				<TagInput
					values={props.emails}
					onChange={values => props.changeEmail(values)}
					fill={true}
				/>
				<Button onClick={props.createTeam}>Create Team</Button>
			</Card>
			{props.error.length > 0 && (
				<div className="errorModal">
					<Card className="errorCard onboardingCard" elevation={Elevation.TWO}>
						<button onClick={props.clearError}>x</button>
						<h4>Oops . . .</h4>
						<div>{props.error}</div>
					</Card>
				</div>
			)}

			<Button onClick={props.joinToggle}>Join an Existing Team</Button>
			<Button onClick={props.toggleAllOff}>Cancel</Button>
		</div>
	);
};

export default CreateTeam;
