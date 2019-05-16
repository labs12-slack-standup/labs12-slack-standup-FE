import React from 'react';
import { Card, Button } from '@blueprintjs/core';

const LandingPage = props => {
	return (
		<Card className="onboarding">
			<h3>Welcome to Stand-Em-Ups!</h3>
			<h4>Do you have a join code?</h4>
			<h4>If not, no worries, you can create a team here too</h4>
			<Button onClick={props.joinToggle}>I have a join code</Button>
			<Button onClick={props.createToggle}>Create a Team</Button>
		</Card>
	);
};

export default LandingPage;
