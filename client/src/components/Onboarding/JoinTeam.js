import React from 'react';
import { Link } from 'react-router-dom';
import {
	Card,
	Button,
	Input,
	InputLabel,
	FormControl,
	Fab,
	Icon
} from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';

import './onboarding.css';

const JoinTeam = props => {
	return (
		<div className="onboarding">
			<Card raised={true} className="onboardingCard">
				<div className="onboarding-card-content">
					<h3> Enter Join Code (provided by your manger):</h3>
					<FormControl id="input-label">
						<InputLabel htmlFor="custom-css-standard-input">
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
					<Button
						color="primary"
						variant="contained"
						onClick={props.submitHandler}
					>
						Join Team
					</Button>
				</div>
			</Card>
			<div className="create-team-buttons">
				<Fab
					onClick={props.toggleAllOff}
					color="default"
					className="onboarding-back"
				>
					<Icon>arrow_back</Icon>
				</Fab>
				<Button variant="outlined" onClick={props.createToggle}>
					Create Team
				</Button>
			</div>
			{props.error.length > 0 && (
				<div className="errorModal">
					<Card raised={true} className="errorJoinCard onboardingCard">
						<button onClick={props.clearError}>X</button>
						<h3>Oops...</h3>
						<div>{props.error}</div>
					</Card>
				</div>
			)}
		</div>
	);
};

export default JoinTeam;
