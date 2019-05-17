import React from 'react';
import { Card, Button, Elevation } from '@blueprintjs/core';

const LandingPage = props => {
	return (
		<Card className="onboarding">
			<h2>Welcome to Stand-Em-Ups!</h2>
			<Card
				interactive={false}
				elevation={Elevation.FOUR}
				className="onboardingCard"
			>
				<h4>Do you have a join code?</h4>
				<div>
					Yes:
					<Button onClick={props.joinToggle}>Input join code</Button>
				</div>
				<div>
					No:
					<Button onClick={props.createToggle}>Create a Team</Button>
				</div>
			</Card>
		</Card>
	);
};

export default LandingPage;
