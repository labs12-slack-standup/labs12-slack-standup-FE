import React from 'react';
import {
	EditableText,
	TextArea,
	Intent,
	Button,
	Card,
	Elevation,
	TagInput
} from '@blueprintjs/core';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
// import blue from '@material-ui/core/colors/blue';

const CreateTeam = props => {
	return (
		<div className="onboarding">
			{/* <Card
				interactive={false}
				elevation={Elevation.TWO}
				className="onboardingCard"
			>
				<h3>Add Members to Your Team</h3>
				<FormControl>
					<InputLabel
						htmlFor="custom-css-standard-input"
						style={{
							color: blue[500],
							root: {
								'&$cssFocused': {
									color: blue[500]
								}
							},
							focused: {}
						}}
					>
						Emails, separated by commas
					</InputLabel>
					<Input
						id="custom-css-standard-input"
						style={{
							width: '200px',
							margin: '10px 0',
							color: blue[500],
							underline: {
								'&:after': {
									borderBottomColor: blue[500]
								}
							}
						}}
						type="text"
						name="emails"
						onChange={props.changeHandler}
					/>
				</FormControl>
				<Button onClick={props.submitHandler}>Create Team</Button>
			</Card> */}
			<Card
				interactive={false}
				elevation={Elevation.TWO}
				className="onboardingCard"
			>
				<h3>Add team member's email</h3>
				<TextArea
					style={{ width: '400px', height: '100px' }}
					className="createTeamEmail"
					intent={Intent.PRIMARY}
					placeholder="Emails, separated by commas"
					value={props.singleEmails}
					onChange={props.changeHandler}
					name="singleEmail"
				/>
				{/* <TagInput /> */}
				<Button onClick={props.createTeam} style={{ marginBottom: '100px' }}>
					Create Team
				</Button>
			</Card>
			{props.error.length > 0 && (
				<div className="errorModal">
					<Card className="errorCard onboardingCard" elevation={Elevation.TWO}>
						<button onClick={props.clearError}>X</button>
						<h3>Oops . . .</h3>
						<div>{props.error}</div>
					</Card>
				</div>
			)}

			<div>Have a join code?</div>
			<Button onClick={props.joinToggle}>Join an Existing Team</Button>
			<Button onClick={props.toggleAllOff}>Cancel</Button>
		</div>
	);
};

export default CreateTeam;
