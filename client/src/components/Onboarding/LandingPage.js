import React from 'react';
import { Card } from '@blueprintjs/core';

const LandingPage = props => {
	return (
		<Card className="onboarding">
			<h3>Welcome to Stand-Em-Ups!</h3>
			<h4>Do you have a join code?</h4>
			<h4>If not, no worries, you can create a team here too</h4>
			<button onClick={props.joinToggle}>I have a join code</button>
			<button onClick={props.createToggle}>Create a Team</button>
		</Card>
	);
};

export default LandingPage;
