import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Elevation, Button } from '@blueprintjs/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import blue from '@material-ui/core/colors/blue';

const JoinTeam = props => {
	return (
		<div className="onboarding">
			<Card
				interactive={false}
				elevation={Elevation.TWO}
				className="onboardingCard"
			>
				<h3> Enter Join Code (provided by your manger):</h3>
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
						Join Code
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
						name="joinCode"
						onChange={props.changeHandler}
					/>
				</FormControl>
				<Button onClick={props.submitHandler}>Join Team</Button>
			</Card>
			<Card
				interactive={false}
				elevation={Elevation.TWO}
				className="onboardingCard"
			>
				<p>
					Actually don't have a join code? That's okay, let's create a team:
				</p>
				<Button onClick={props.createToggle}>Create Team</Button>
				<Button onClick={props.toggleAllOff}>Cancel</Button>
			</Card>
		</div>
	);
};

export default JoinTeam;
